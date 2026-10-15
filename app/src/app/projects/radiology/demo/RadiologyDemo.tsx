"use client";

import { useMemo, useState } from "react";

type Box = { label: string; x: number; y: number; w: number; h: number };
export type Study = {
  id: string;
  image: string;
  source: string;
  truth: string[];
  boxes: Box[];
  scores: Record<string, number>;
  top: string[];
  overlays: Record<string, string>;
  priority: number;
  patient: { age: number; sex: string; view: string; followUp: number };
  fhir: unknown;
};
export type DemoData = { labels: string[]; studies: Study[] };

const BASE = "/radiology-demo/img/";
const pretty = (s: string) => s.replace(/_/g, " ");

function priorityTag(p: number) {
  if (p >= 0.7) return { text: "High", cls: "bg-rose-100 text-rose-800" };
  if (p >= 0.6) return { text: "Review", cls: "bg-amber-100 text-amber-800" };
  return { text: "Routine", cls: "bg-slate-100 text-slate-700" };
}

export default function RadiologyDemo({ data }: { data: DemoData }) {
  const [sel, setSel] = useState(data.studies[0].id);
  const [overlay, setOverlay] = useState<string | null>(null);
  const [showBoxes, setShowBoxes] = useState(true);
  const [showFhir, setShowFhir] = useState(false);
  const s = data.studies.find((x) => x.id === sel)!;

  const stats = useMemo(() => {
    const abn = data.studies.filter((x) => !(x.truth.length === 1 && x.truth[0] === "No Finding"));
    const hit = abn.filter((x) => x.truth.some((t) => x.top.includes(t))).length;
    return { abn: abn.length, hit };
  }, [data]);

  const img = overlay && s.overlays[overlay] ? BASE + s.overlays[overlay] : BASE + s.image;
  const truthSet = new Set(s.truth);

  return (
    <div className="mt-8">
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-card-border bg-card-bg p-4">
          <p className="text-2xl font-semibold text-accent">{data.studies.length}</p>
          <p className="text-sm text-muted">studies in the worklist</p>
        </div>
        <div className="rounded-lg border border-card-border bg-card-bg p-4">
          <p className="text-2xl font-semibold text-accent">
            {stats.hit}/{stats.abn}
          </p>
          <p className="text-sm text-muted">abnormal studies where a labelled finding is in the model&apos;s top 3</p>
        </div>
        <div className="rounded-lg border border-card-border bg-card-bg p-4">
          <p className="text-2xl font-semibold text-accent">0.5</p>
          <p className="text-sm text-muted">calibrated operating threshold per finding</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr_300px]">
        {/* Worklist */}
        <div className="rounded-lg border border-card-border bg-card-bg">
          <p className="border-b border-card-border px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted">Worklist</p>
          <ul className="max-h-[560px] overflow-y-auto">
            {data.studies.map((x) => {
              const tag = priorityTag(x.priority);
              return (
                <li key={x.id}>
                  <button
                    onClick={() => {
                      setSel(x.id);
                      setOverlay(null);
                    }}
                    className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm hover:bg-background ${
                      x.id === sel ? "bg-background font-medium" : ""
                    }`}
                  >
                    <span>
                      {x.id} · {x.patient.age}
                      {x.patient.sex}
                      <span className="block text-xs text-muted">{pretty(x.top[0])}</span>
                    </span>
                    <span className={`rounded px-1.5 py-0.5 text-xs ${tag.cls}`}>{tag.text}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Viewer */}
        <div>
          <div className="relative overflow-hidden rounded-lg bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt={`Chest X-ray ${s.id}`} className="block w-full" />
            {showBoxes &&
              s.boxes.map((b, i) => (
                <div
                  key={i}
                  className="absolute border-2 border-sky-400"
                  style={{ left: `${b.x * 100}%`, top: `${b.y * 100}%`, width: `${b.w * 100}%`, height: `${b.h * 100}%` }}
                >
                  <span className="absolute -top-5 left-0 rounded bg-sky-500 px-1 text-[10px] text-white">{pretty(b.label)}</span>
                </div>
              ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted">Activation map:</span>
            <button
              onClick={() => setOverlay(null)}
              className={`rounded-md border px-2.5 py-1 ${overlay === null ? "border-accent bg-accent text-white" : "border-card-border"}`}
            >
              Off
            </button>
            {s.top.map((t) => (
              <button
                key={t}
                onClick={() => setOverlay(t)}
                className={`rounded-md border px-2.5 py-1 ${overlay === t ? "border-accent bg-accent text-white" : "border-card-border"}`}
              >
                {pretty(t)}
              </button>
            ))}
            {s.boxes.length > 0 && (
              <label className="ml-auto flex items-center gap-1.5 text-muted">
                <input type="checkbox" checked={showBoxes} onChange={(e) => setShowBoxes(e.target.checked)} />
                Radiologist boxes
              </label>
            )}
          </div>
        </div>

        {/* Findings */}
        <div className="space-y-4">
          <div className="rounded-lg border border-card-border bg-card-bg p-4 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Study context</p>
            <p className="mt-2">
              {s.patient.age} y · {s.patient.sex === "M" ? "male" : "female"} · {s.patient.view} view · follow-up #{s.patient.followUp}
            </p>
            <p className="mt-2 text-xs text-muted">Dataset labels</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {s.truth.map((t) => (
                <span key={t} className="rounded bg-sky-100 px-1.5 py-0.5 text-xs text-sky-900">
                  {pretty(t)}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-card-border bg-card-bg p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Model scores</p>
            <ul className="mt-3 space-y-1.5">
              {Object.entries(s.scores).map(([k, v]) => (
                <li key={k} className="text-xs">
                  <div className="flex justify-between">
                    <span className={truthSet.has(k) ? "font-semibold text-sky-800" : ""}>{pretty(k)}</span>
                    <span className="tabular-nums text-muted">{v.toFixed(2)}</span>
                  </div>
                  <div className="relative mt-0.5 h-1.5 rounded bg-slate-100">
                    <div className={`h-1.5 rounded ${v > 0.5 ? "bg-accent" : "bg-slate-300"}`} style={{ width: `${Math.min(v, 1) * 100}%` }} />
                    <div className="absolute top-[-2px] h-2.5 w-px bg-slate-500" style={{ left: "50%" }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-card-border bg-card-bg p-4">
            <button onClick={() => setShowFhir((v) => !v)} className="text-sm font-medium text-accent">
              {showFhir ? "Hide" : "Show"} FHIR-style resources
            </button>
            {showFhir && (
              <pre className="mt-3 max-h-72 overflow-auto rounded bg-background p-3 text-[11px] leading-relaxed">
                {JSON.stringify(s.fhir, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
