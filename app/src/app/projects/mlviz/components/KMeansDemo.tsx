"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Pt {
  x: number;
  y: number;
}

const CHART = {
  width: 640,
  height: 400,
  left: 32,
  right: 24,
  top: 24,
  bottom: 32,
};

const X_RANGE = { min: 0, max: 10 };
const Y_RANGE = { min: 0, max: 10 };

// Three Gaussian-ish blobs so the algorithm has something interesting to find.
function makeBlobs(): Pt[] {
  const centers: Pt[] = [
    { x: 2.3, y: 2.7 },
    { x: 7.5, y: 3.0 },
    { x: 5.0, y: 7.6 },
  ];
  const points: Pt[] = [];
  let seed = 1;
  const rand = () => {
    // Mulberry32 — deterministic so the demo looks the same each load.
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const gaussian = () => {
    const u1 = Math.max(rand(), 1e-6);
    const u2 = rand();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  };
  for (const c of centers) {
    for (let i = 0; i < 26; i++) {
      points.push({
        x: Math.min(Math.max(c.x + gaussian() * 0.8, X_RANGE.min), X_RANGE.max),
        y: Math.min(Math.max(c.y + gaussian() * 0.8, Y_RANGE.min), Y_RANGE.max),
      });
    }
  }
  return points;
}

const CLUSTER_COLORS = [
  "rgba(59,130,246,0.95)", // blue
  "rgba(16,185,129,0.95)", // emerald
  "rgba(244,114,182,0.95)", // pink
  "rgba(245,158,11,0.95)", // amber
  "rgba(168,85,247,0.95)", // purple
];

function scaleX(x: number) {
  const u = CHART.width - CHART.left - CHART.right;
  return CHART.left + ((x - X_RANGE.min) / (X_RANGE.max - X_RANGE.min)) * u;
}
function scaleY(y: number) {
  const u = CHART.height - CHART.top - CHART.bottom;
  return CHART.top + (1 - (y - Y_RANGE.min) / (Y_RANGE.max - Y_RANGE.min)) * u;
}
function invX(px: number) {
  const u = CHART.width - CHART.left - CHART.right;
  return X_RANGE.min + ((px - CHART.left) / u) * (X_RANGE.max - X_RANGE.min);
}
function invY(py: number) {
  const u = CHART.height - CHART.top - CHART.bottom;
  return Y_RANGE.min + (1 - (py - CHART.top) / u) * (Y_RANGE.max - Y_RANGE.min);
}

function initialCentroids(points: Pt[], k: number): Pt[] {
  // Spread the initial guesses around so the demo's first move is visible
  // — pure random init sometimes lands all 3 in one blob and looks broken.
  const result: Pt[] = [];
  if (points.length === 0) {
    for (let i = 0; i < k; i++) {
      result.push({
        x: X_RANGE.min + ((i + 1) / (k + 1)) * (X_RANGE.max - X_RANGE.min),
        y: Y_RANGE.min + 0.2 * (Y_RANGE.max - Y_RANGE.min),
      });
    }
    return result;
  }
  // k-means++ flavoured: first centroid random, the rest pick the
  // farthest-from-existing point.
  result.push(points[Math.floor(points.length / 3)]);
  while (result.length < k) {
    let bestIdx = 0;
    let bestDist = -1;
    for (let i = 0; i < points.length; i++) {
      const d = Math.min(
        ...result.map((c) => (c.x - points[i].x) ** 2 + (c.y - points[i].y) ** 2),
      );
      if (d > bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }
    result.push(points[bestIdx]);
  }
  return result;
}

function assign(points: Pt[], centroids: Pt[]): number[] {
  return points.map((p) => {
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < centroids.length; i++) {
      const d = (centroids[i].x - p.x) ** 2 + (centroids[i].y - p.y) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    return best;
  });
}

function recompute(points: Pt[], assignments: number[], k: number): Pt[] {
  const next: Pt[] = [];
  for (let i = 0; i < k; i++) {
    let sx = 0;
    let sy = 0;
    let n = 0;
    for (let j = 0; j < points.length; j++) {
      if (assignments[j] === i) {
        sx += points[j].x;
        sy += points[j].y;
        n++;
      }
    }
    next.push({ x: n ? sx / n : 0, y: n ? sy / n : 0 });
  }
  return next;
}

function inertia(points: Pt[], centroids: Pt[], assignments: number[]): number {
  let total = 0;
  for (let i = 0; i < points.length; i++) {
    const c = centroids[assignments[i]];
    total += (c.x - points[i].x) ** 2 + (c.y - points[i].y) ** 2;
  }
  return total;
}

export default function KMeansDemo() {
  const timerRef = useRef<number | null>(null);
  const [k, setK] = useState(3);
  const [points, setPoints] = useState<Pt[]>(() => makeBlobs());
  const [centroids, setCentroids] = useState<Pt[]>(() => initialCentroids(makeBlobs(), 3));
  const [assignments, setAssignments] = useState<number[]>([]);
  const [iter, setIter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<"assign" | "update">("assign");

  function stop() {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);
  }

  function reset() {
    stop();
    const newCent = initialCentroids(points, k);
    setCentroids(newCent);
    setAssignments([]);
    setIter(0);
    setPhase("assign");
  }

  function reseed() {
    stop();
    const pts = makeBlobs();
    setPoints(pts);
    setCentroids(initialCentroids(pts, k));
    setAssignments([]);
    setIter(0);
    setPhase("assign");
  }

  function changeK(nextK: number) {
    if (isRunning) return;
    setK(nextK);
    setCentroids(initialCentroids(points, nextK));
    setAssignments([]);
    setIter(0);
    setPhase("assign");
  }

  function singleStep(currentPhase: "assign" | "update", currentCentroids: Pt[], currentAssignments: number[]) {
    if (currentPhase === "assign") {
      const newAssign = assign(points, currentCentroids);
      setAssignments(newAssign);
      setPhase("update");
      return { phase: "update" as const, centroids: currentCentroids, assignments: newAssign };
    }
    const newCent = recompute(points, currentAssignments, k);
    setCentroids(newCent);
    setIter((i) => i + 1);
    setPhase("assign");
    return { phase: "assign" as const, centroids: newCent, assignments: currentAssignments };
  }

  function run() {
    stop();
    setIsRunning(true);
    let currentPhase: "assign" | "update" = phase;
    let currentCent = centroids;
    let currentAssign = assignments;
    let stepsTaken = 0;
    timerRef.current = window.setInterval(() => {
      const out = singleStep(currentPhase, currentCent, currentAssign);
      currentPhase = out.phase;
      currentCent = out.centroids;
      currentAssign = out.assignments;
      stepsTaken += 1;
      // After we run enough that centroids stop moving, stop. Stop also
      // after a hard step budget so a bad initialization doesn't loop.
      if (stepsTaken > 30) stop();
    }, 350);
  }

  function step() {
    if (isRunning) return;
    singleStep(phase, centroids, assignments);
  }

  function handleSvgClick(e: React.MouseEvent<SVGSVGElement>) {
    if (isRunning) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * CHART.width;
    const py = ((e.clientY - rect.top) / rect.height) * CHART.height;
    const x = invX(px);
    const y = invY(py);
    if (x < X_RANGE.min || x > X_RANGE.max || y < Y_RANGE.min || y > Y_RANGE.max) return;
    const next = [...points, { x, y }];
    setPoints(next);
    setAssignments([]);
    setIter(0);
    setPhase("assign");
  }

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, []);

  const energy =
    assignments.length === points.length && assignments.length > 0
      ? inertia(points, centroids, assignments)
      : null;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-card-border bg-card-bg/70 p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">k-Means Demo</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
              Two alternating moves: <span className="text-foreground">assign</span> every
              point to its nearest centroid, then{" "}
              <span className="text-foreground">update</span> each centroid
              to the average of its assigned points. Click the chart to add
              a point. Step manually to feel the rhythm, then run.
            </p>
          </div>
          <div className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-mono text-accent">
            live demo
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr),minmax(280px,1fr)]">
          <div className="rounded-2xl border border-card-border bg-background/60 p-4">
            <svg
              viewBox={`0 0 ${CHART.width} ${CHART.height}`}
              className="w-full cursor-crosshair"
              onClick={handleSvgClick}
              aria-label="k-Means clustering canvas"
            >
              {/* faint grid */}
              {[0, 2, 4, 6, 8, 10].map((t) => (
                <g key={`g${t}`}>
                  <line
                    x1={scaleX(t)}
                    y1={CHART.top}
                    x2={scaleX(t)}
                    y2={CHART.height - CHART.bottom}
                    stroke="rgba(148,163,184,0.10)"
                  />
                  <line
                    x1={CHART.left}
                    y1={scaleY(t)}
                    x2={CHART.width - CHART.right}
                    y2={scaleY(t)}
                    stroke="rgba(148,163,184,0.10)"
                  />
                </g>
              ))}

              {/* assignment lines (only when an assignment exists) */}
              {assignments.length === points.length &&
                points.map((p, i) => {
                  const c = centroids[assignments[i]];
                  if (!c) return null;
                  return (
                    <line
                      key={`a${i}`}
                      x1={scaleX(p.x)}
                      y1={scaleY(p.y)}
                      x2={scaleX(c.x)}
                      y2={scaleY(c.y)}
                      stroke={CLUSTER_COLORS[assignments[i] % CLUSTER_COLORS.length]}
                      strokeOpacity="0.16"
                      strokeWidth="1"
                    />
                  );
                })}

              {/* points */}
              {points.map((p, i) => {
                const cluster = assignments[i];
                const colored = typeof cluster === "number";
                return (
                  <circle
                    key={`p${i}`}
                    cx={scaleX(p.x)}
                    cy={scaleY(p.y)}
                    r="4"
                    fill={
                      colored
                        ? CLUSTER_COLORS[cluster % CLUSTER_COLORS.length]
                        : "rgba(237,237,237,0.7)"
                    }
                    stroke="rgba(10,10,10,0.6)"
                    strokeWidth="0.5"
                  />
                );
              })}

              {/* centroids */}
              {centroids.map((c, i) => (
                <g key={`c${i}`}>
                  <circle
                    cx={scaleX(c.x)}
                    cy={scaleY(c.y)}
                    r="10"
                    fill="none"
                    stroke={CLUSTER_COLORS[i % CLUSTER_COLORS.length]}
                    strokeWidth="3"
                  />
                  <line
                    x1={scaleX(c.x) - 8}
                    y1={scaleY(c.y)}
                    x2={scaleX(c.x) + 8}
                    y2={scaleY(c.y)}
                    stroke={CLUSTER_COLORS[i % CLUSTER_COLORS.length]}
                    strokeWidth="2"
                  />
                  <line
                    x1={scaleX(c.x)}
                    y1={scaleY(c.y) - 8}
                    x2={scaleX(c.x)}
                    y2={scaleY(c.y) + 8}
                    stroke={CLUSTER_COLORS[i % CLUSTER_COLORS.length]}
                    strokeWidth="2"
                  />
                </g>
              ))}
            </svg>
            <p className="mt-2 text-center font-mono text-xs text-muted">
              click chart to add a point · next move:{" "}
              <span className="text-accent">{phase}</span>
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-card-border bg-background/60 p-5">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="rounded-xl border border-card-border bg-card-bg/70 p-3 text-center">
                  <div className="text-xs text-muted">k</div>
                  <div className="mt-1 text-lg font-semibold">{k}</div>
                </div>
                <div className="rounded-xl border border-card-border bg-card-bg/70 p-3 text-center">
                  <div className="text-xs text-muted">Iter</div>
                  <div className="mt-1 text-lg font-semibold">{iter}</div>
                </div>
                <div className="rounded-xl border border-card-border bg-card-bg/70 p-3 text-center">
                  <div className="text-xs text-muted">Inertia</div>
                  <div className="mt-1 text-lg font-semibold text-accent">
                    {energy === null ? "—" : energy.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-card-border bg-background/60 p-5">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent">
                Number of clusters (k)
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {[2, 3, 4, 5].map((kk) => (
                  <button
                    key={kk}
                    type="button"
                    onClick={() => changeK(kk)}
                    disabled={isRunning}
                    className={`rounded-md border px-3 py-1.5 text-sm font-mono transition-colors ${
                      kk === k
                        ? "border-accent/50 bg-accent/10 text-accent"
                        : "border-card-border text-muted hover:text-foreground"
                    }`}
                  >
                    k={kk}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-card-border bg-background/60 p-5">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent">
                Run
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={run}
                  disabled={isRunning || points.length === 0}
                  className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Run to convergence
                </button>
                <button
                  type="button"
                  onClick={step}
                  disabled={isRunning || points.length === 0}
                  className="rounded-md border border-card-border px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  Step ({phase})
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <button
                  type="button"
                  onClick={reset}
                  disabled={isRunning}
                  className="rounded border border-card-border px-2.5 py-1 font-mono text-muted hover:text-foreground"
                >
                  reseed centroids
                </button>
                <button
                  type="button"
                  onClick={reseed}
                  disabled={isRunning}
                  className="rounded border border-card-border px-2.5 py-1 font-mono text-muted hover:text-foreground"
                >
                  reseed points
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-card-border bg-card-bg/70 p-5">
          <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent">
            The two moves
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            <span className="text-foreground">assign</span>: each point picks the closest
            centroid.
            <br />
            <span className="text-foreground">update</span>: each centroid moves to the
            average of its assigned points.
            <br />
            Repeat. Both moves can only decrease (or hold) inertia — so the
            algorithm always converges.
          </p>
        </div>
        <div className="rounded-2xl border border-card-border bg-card-bg/70 p-5">
          <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent">
            Why initialization matters
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Bad initial centroids can land in a local minimum and look
            stuck. This demo uses a k-means++ flavoured pick (first centroid
            random, the rest farthest-from-existing) so the first run looks
            sensible.
          </p>
        </div>
        <div className="rounded-2xl border border-card-border bg-card-bg/70 p-5">
          <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent">
            Read more
          </h3>
          <div className="mt-3 space-y-2 text-sm">
            <Link
              href="/wiki/topics/ai-ml/unsupervised/clustering/k-means"
              className="block text-accent underline-offset-2 hover:underline"
            >
              k-Means
            </Link>
            <Link
              href="/projects/mlviz"
              className="block text-accent underline-offset-2 hover:underline"
            >
              Back to mlviz timeline
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
