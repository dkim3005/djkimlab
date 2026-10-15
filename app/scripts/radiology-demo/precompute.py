"""Precompute a static Radiology AI demo: triage scores, CAM overlays, FHIR-style context.

Images: NIH ChestX-ray14 (NIH Clinical Center). Model: torchxrayvision densenet121-res224-nih.
Output: <out>/studies.json and <out>/img/*.jpg
"""
import gzip, io, json, os, sys, tarfile
import numpy as np, pandas as pd
import torch, torch.nn.functional as F, torchvision
import torchxrayvision as xrv
from PIL import Image
import matplotlib.cm as cm

ARCHIVE, OUT = sys.argv[1], sys.argv[2]
os.makedirs(f"{OUT}/img", exist_ok=True)
DATA = os.path.join(os.path.dirname(xrv.__file__), "data")

entries = pd.read_csv(f"{DATA}/Data_Entry_2017_v2020.csv.gz")
bbox = pd.read_csv(f"{DATA}/BBox_List_2017.csv.gz")
with tarfile.open(ARCHIVE) as t:
    names = {os.path.basename(n) for n in t.getnames() if n.endswith(".png")}
e = entries[entries["Image Index"].isin(names) & (entries["View Position"] == "PA")].copy()
e["labels"] = e["Finding Labels"].str.split("|")
e["has_box"] = e["Image Index"].isin(bbox["Image Index"])

# Pick a varied worklist: boxed cases first, then one or two per finding, plus normals.
want = ["Cardiomegaly", "Effusion", "Pneumothorax", "Mass", "Nodule", "Atelectasis",
        "Consolidation", "Edema", "Emphysema", "Infiltration", "Fibrosis", "Pleural_Thickening"]
picked, seen_pat = [], set()
def take(row):
    if row["Patient ID"] in seen_pat: return False
    picked.append(row); seen_pat.add(row["Patient ID"]); return True
for _, r in e[e.has_box].sort_values("Image Index").iterrows():
    if len(picked) >= 8: break
    take(r)
for lab in want:
    for _, r in e[e.labels.apply(lambda l: l == [lab])].sort_values("Image Index").iterrows():
        if take(r): break
for _, r in e[e["Finding Labels"] == "No Finding"].sort_values("Image Index").iterrows():
    if sum(1 for p in picked if p["Finding Labels"] == "No Finding") >= 4: break
    take(r)
print("picked", len(picked))

model = xrv.models.DenseNet(weights="densenet121-res224-nih").eval()
LABELS = [p for p in model.pathologies if p]
xform = torchvision.transforms.Compose([xrv.datasets.XRayCenterCrop(), xrv.datasets.XRayResizer(224)])

def load_png(name):
    with tarfile.open(ARCHIVE) as t:
        return Image.open(io.BytesIO(t.extractfile(f"images/{name}").read())).convert("L")

studies = []
for i, r in enumerate(picked):
    name = r["Image Index"]; pil = load_png(name)
    arr = xrv.datasets.normalize(np.array(pil).astype(np.float32), 255)[None, ...]
    x = torch.from_numpy(xform(arr))[None]
    with torch.no_grad():
        feats = F.relu(model.features(x))                      # 1x1024x7x7
        probs = model(x)[0].numpy()
    W = model.classifier.weight.detach()                      # 18x1024
    scores = {p: float(probs[j]) for j, p in enumerate(model.pathologies) if p}
    top = sorted(scores, key=scores.get, reverse=True)[:3]

    sid = f"S{i+1:02d}"; size = 512
    base = pil.resize((size, size), Image.BILINEAR)
    base.convert("RGB").save(f"{OUT}/img/{sid}.jpg", quality=86)
    overlays = {}
    for lab in top:
        j = model.pathologies.index(lab)
        cam = torch.einsum("c,chw->hw", W[j], feats[0]).clamp(min=0)
        cam = (cam - cam.min()) / (cam.max() - cam.min() + 1e-6)
        cam = F.interpolate(cam[None, None], size=(size, size), mode="bilinear", align_corners=False)[0, 0].numpy()
        heat = (cm.inferno(cam)[..., :3] * 255).astype(np.uint8)
        g = np.array(base.convert("RGB")).astype(np.float32)
        a = (cam[..., None] * 0.55)
        blend = (g * (1 - a) + heat * a).astype(np.uint8)
        fn = f"{sid}_{lab.replace(' ', '_')}.jpg"
        Image.fromarray(blend).save(f"{OUT}/img/{fn}", quality=86); overlays[lab] = fn

    boxes = []
    for _, b in bbox[bbox["Image Index"] == name].iterrows():
        w0, h0 = pil.size
        boxes.append({"label": b["Finding Label"], "x": b.iloc[2] / w0, "y": b.iloc[3] / h0, "w": b.iloc[4] / w0, "h": b.iloc[5] / h0})

    age, sex = int(r["Patient Age"]), r["Patient Gender"]
    studies.append({
        "id": sid, "image": f"{sid}.jpg", "source": name,
        "truth": r["labels"], "boxes": boxes,
        "scores": dict(sorted(scores.items(), key=lambda kv: -kv[1])),
        "top": top, "overlays": overlays,
        "priority": max(scores.values()),
        "patient": {"age": age, "sex": sex, "view": r["View Position"], "followUp": int(r["Follow-up #"])},
        "fhir": {
            "Patient": {"resourceType": "Patient", "id": f"pat-{sid}", "gender": {"M": "male", "F": "female"}[sex],
                        "extension": [{"url": "age-at-study", "valueInteger": age}]},
            "ImagingStudy": {"resourceType": "ImagingStudy", "id": f"img-{sid}", "status": "available",
                             "subject": {"reference": f"Patient/pat-{sid}"}, "modality": [{"code": "DX"}],
                             "series": [{"bodySite": {"display": "Chest"}, "description": f"{r['View Position']} view"}]},
            "Observation": [{"resourceType": "Observation", "status": "preliminary",
                             "code": {"text": lab}, "valueQuantity": {"value": round(scores[lab], 3)},
                             "note": [{"text": "AI-generated, research use only"}]} for lab in top],
        },
    })
    print(sid, name, r["Finding Labels"], "->", [(t, round(scores[t], 2)) for t in top])

studies.sort(key=lambda s: -s["priority"])
json.dump({"labels": LABELS, "studies": studies}, open(f"{OUT}/studies.json", "w"), indent=1)
print("done", len(studies))
