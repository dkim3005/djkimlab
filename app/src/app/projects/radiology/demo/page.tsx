import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import RadiologyDemo, { type DemoData } from "./RadiologyDemo";

export const metadata: Metadata = {
  title: "Radiology AI — interactive demo",
  description:
    "Chest X-ray triage worklist with class activation maps and FHIR-style context, precomputed on NIH ChestX-ray14 images. Research demo, not for clinical use.",
};

export default function Page() {
  const file = path.join(process.cwd(), "public", "radiology-demo", "studies.json");
  const data = JSON.parse(fs.readFileSync(file, "utf-8")) as DemoData;
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <p className="text-sm">
        <Link href="/projects/radiology" className="text-accent hover:underline">← Radiology AI case study</Link>
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Radiology AI — triage &amp; explainability demo</h1>
      <p className="mt-2 max-w-3xl text-muted">
        A worklist of 24 chest X-rays ranked by the model&apos;s highest finding score. Select a study to see per-finding scores,
        the dataset&apos;s labels, class activation maps for the top findings and the FHIR-style resources the backend emits.
      </p>
      <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Research demo only — not a medical device and not for clinical use. Results are precomputed so the page runs without a server.
      </div>
      <RadiologyDemo data={data} />
      <p className="mt-10 text-xs text-muted">
        Images: NIH ChestX-ray14, NIH Clinical Center (Wang et al., CVPR 2017). Model: TorchXRayVision DenseNet121
        (densenet121-res224-nih; Cohen et al., 2022). Labels are NLP-mined from reports and are themselves imperfect; boxes are
        the dataset&apos;s radiologist-drawn bounding boxes where available.
      </p>
    </div>
  );
}
