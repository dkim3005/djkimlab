"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
  label: 1 | -1;
}

const CHART = {
  width: 640,
  height: 400,
  left: 40,
  right: 24,
  top: 24,
  bottom: 32,
};

const X_RANGE = { min: -5, max: 5 };
const Y_RANGE = { min: -5, max: 5 };
const X_TICKS = [-5, -3, -1, 1, 3, 5];
const Y_TICKS = [-5, -3, -1, 1, 3, 5];

// A linearly-separable starter set so the demo looks meaningful on first load.
const INITIAL_POINTS: Point[] = [
  { x: -3.5, y: 2.0, label: 1 },
  { x: -2.8, y: 3.2, label: 1 },
  { x: -1.5, y: 1.5, label: 1 },
  { x: -3.0, y: -0.5, label: 1 },
  { x: -2.0, y: 0.8, label: 1 },
  { x: -4.0, y: 1.2, label: 1 },
  { x: 2.5, y: -1.0, label: -1 },
  { x: 3.5, y: -2.5, label: -1 },
  { x: 1.5, y: -2.0, label: -1 },
  { x: 4.0, y: 1.0, label: -1 },
  { x: 2.8, y: 2.0, label: -1 },
  { x: 3.2, y: -0.5, label: -1 },
];

interface WeightState {
  // hyperplane is w · x + b = 0, with w = (w1, w2)
  w1: number;
  w2: number;
  b: number;
}

const INITIAL_W: WeightState = { w1: 1.0, w2: -1.0, b: 0.5 };

function predict(w: WeightState, p: { x: number; y: number }) {
  return w.w1 * p.x + w.w2 * p.y + w.b >= 0 ? 1 : -1;
}

function scaleX(x: number) {
  const usable = CHART.width - CHART.left - CHART.right;
  return CHART.left + ((x - X_RANGE.min) / (X_RANGE.max - X_RANGE.min)) * usable;
}
function scaleY(y: number) {
  const usable = CHART.height - CHART.top - CHART.bottom;
  return CHART.top + (1 - (y - Y_RANGE.min) / (Y_RANGE.max - Y_RANGE.min)) * usable;
}
function invX(px: number) {
  const usable = CHART.width - CHART.left - CHART.right;
  return X_RANGE.min + ((px - CHART.left) / usable) * (X_RANGE.max - X_RANGE.min);
}
function invY(py: number) {
  const usable = CHART.height - CHART.top - CHART.bottom;
  return Y_RANGE.min + (1 - (py - CHART.top) / usable) * (Y_RANGE.max - Y_RANGE.min);
}

// Compute two endpoints to draw w · x + b = 0 across the visible chart.
function decisionLineEndpoints(w: WeightState) {
  // If |w2| is non-trivial, parameterise by x.
  if (Math.abs(w.w2) > 1e-6) {
    const yAt = (x: number) => -(w.w1 * x + w.b) / w.w2;
    return {
      x1: X_RANGE.min,
      y1: yAt(X_RANGE.min),
      x2: X_RANGE.max,
      y2: yAt(X_RANGE.max),
    };
  }
  // Otherwise the line is vertical (w2 ≈ 0): x = -b / w1.
  const xV = -w.b / w.w1;
  return { x1: xV, y1: Y_RANGE.min, x2: xV, y2: Y_RANGE.max };
}

export default function PerceptronDemo() {
  const timerRef = useRef<number | null>(null);
  const [points, setPoints] = useState<Point[]>(INITIAL_POINTS);
  const [w, setW] = useState<WeightState>(INITIAL_W);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<number>(() =>
    INITIAL_POINTS.filter((p) => predict(INITIAL_W, p) !== p.label).length,
  );
  const [isRunning, setIsRunning] = useState(false);
  const [addLabel, setAddLabel] = useState<1 | -1>(1);
  const [learningRate, setLearningRate] = useState(0.5);

  function stop() {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  }

  function reset() {
    stop();
    setW(INITIAL_W);
    setStep(0);
    setErrors(points.filter((p) => predict(INITIAL_W, p) !== p.label).length);
  }

  // One epoch = one pass through all points. Each misclassified point
  // triggers a perceptron update: w ← w + η · y · x.
  function takeOneEpoch(state: WeightState): { next: WeightState; updates: number } {
    let next = { ...state };
    let updates = 0;
    for (const p of points) {
      if (predict(next, p) !== p.label) {
        next = {
          w1: next.w1 + learningRate * p.label * p.x,
          w2: next.w2 + learningRate * p.label * p.y,
          b: next.b + learningRate * p.label,
        };
        updates += 1;
      }
    }
    return { next, updates };
  }

  function train() {
    stop();
    setIsRunning(true);
    let current = w;
    let i = 0;
    const MAX_EPOCHS = 80;
    timerRef.current = window.setInterval(() => {
      const { next, updates } = takeOneEpoch(current);
      current = next;
      i += 1;
      setW(current);
      setStep(i);
      const newErrors = points.filter((p) => predict(current, p) !== p.label).length;
      setErrors(newErrors);
      if (updates === 0 || i >= MAX_EPOCHS) stop();
    }, 250);
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
    const next = [...points, { x, y, label: addLabel }];
    setPoints(next);
    setErrors(next.filter((p) => predict(w, p) !== p.label).length);
  }

  function clearPoints() {
    if (isRunning) return;
    setPoints([]);
    setErrors(0);
  }

  function loadStarter() {
    if (isRunning) return;
    setPoints(INITIAL_POINTS);
    setErrors(INITIAL_POINTS.filter((p) => predict(w, p) !== p.label).length);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, []);

  const line = decisionLineEndpoints(w);
  const accuracy = points.length === 0 ? 1 : 1 - errors / points.length;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-card-border bg-card-bg/70 p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Perceptron Demo</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
              Click in the chart to drop a point of the selected class. Then
              run the perceptron — each pass updates the weights only for the
              points it gets wrong. The line below is{" "}
              <code className="font-mono text-foreground">w · x + b = 0</code>.
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
              aria-label="Perceptron decision boundary"
            >
              {X_TICKS.map((t) => (
                <line
                  key={`gx${t}`}
                  x1={scaleX(t)}
                  y1={CHART.top}
                  x2={scaleX(t)}
                  y2={CHART.height - CHART.bottom}
                  stroke="rgba(148,163,184,0.12)"
                />
              ))}
              {Y_TICKS.map((t) => (
                <line
                  key={`gy${t}`}
                  x1={CHART.left}
                  y1={scaleY(t)}
                  x2={CHART.width - CHART.right}
                  y2={scaleY(t)}
                  stroke="rgba(148,163,184,0.12)"
                />
              ))}

              {/* Origin axes */}
              <line
                x1={scaleX(0)}
                y1={CHART.top}
                x2={scaleX(0)}
                y2={CHART.height - CHART.bottom}
                stroke="rgba(237,237,237,0.30)"
              />
              <line
                x1={CHART.left}
                y1={scaleY(0)}
                x2={CHART.width - CHART.right}
                y2={scaleY(0)}
                stroke="rgba(237,237,237,0.30)"
              />

              {/* Decision line */}
              <line
                x1={scaleX(line.x1)}
                y1={scaleY(line.y1)}
                x2={scaleX(line.x2)}
                y2={scaleY(line.y2)}
                stroke="rgba(59,130,246,0.95)"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Points */}
              {points.map((p, i) => {
                const correct = predict(w, p) === p.label;
                const fill = p.label === 1 ? "rgba(16,185,129,0.95)" : "rgba(244,114,182,0.95)";
                const stroke = correct ? "rgba(237,237,237,0.4)" : "rgba(250,204,21,1)";
                return (
                  <circle
                    key={i}
                    cx={scaleX(p.x)}
                    cy={scaleY(p.y)}
                    r="6"
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={correct ? 1 : 2.5}
                  />
                );
              })}

              {/* Tick labels */}
              {X_TICKS.map((t) => (
                <text
                  key={`tx${t}`}
                  x={scaleX(t)}
                  y={CHART.height - CHART.bottom + 16}
                  fill="rgba(156,163,175,0.95)"
                  fontSize="10"
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                >
                  {t}
                </text>
              ))}
              {Y_TICKS.map((t) => (
                <text
                  key={`ty${t}`}
                  x={CHART.left - 6}
                  y={scaleY(t) + 4}
                  fill="rgba(156,163,175,0.95)"
                  fontSize="10"
                  textAnchor="end"
                  fontFamily="var(--font-mono)"
                >
                  {t}
                </text>
              ))}
            </svg>
            <p className="mt-2 text-center font-mono text-xs text-muted">
              click chart to add a {addLabel === 1 ? "+" : "−"} point ·
              misclassified points have a yellow ring
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-card-border bg-background/60 p-5">
              <div className="text-sm font-medium">Current hyperplane</div>
              <p className="mt-2 font-mono text-sm text-accent">
                {w.w1.toFixed(2)}·x₁ {w.w2 >= 0 ? "+" : "−"} {Math.abs(w.w2).toFixed(2)}·x₂{" "}
                {w.b >= 0 ? "+" : "−"} {Math.abs(w.b).toFixed(2)} = 0
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                <div className="rounded-xl border border-card-border bg-card-bg/70 p-3 text-center">
                  <div className="text-xs text-muted">Epoch</div>
                  <div className="mt-1 text-lg font-semibold">{step}</div>
                </div>
                <div className="rounded-xl border border-card-border bg-card-bg/70 p-3 text-center">
                  <div className="text-xs text-muted">Errors</div>
                  <div className="mt-1 text-lg font-semibold">{errors}</div>
                </div>
                <div className="rounded-xl border border-card-border bg-card-bg/70 p-3 text-center">
                  <div className="text-xs text-muted">Acc</div>
                  <div className="mt-1 text-lg font-semibold text-accent">
                    {(accuracy * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-card-border bg-background/60 p-5">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent">
                Add a point with this label
              </span>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAddLabel(1)}
                  disabled={isRunning}
                  className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                    addLabel === 1
                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                      : "border-card-border text-muted hover:text-foreground"
                  }`}
                >
                  + class (green)
                </button>
                <button
                  type="button"
                  onClick={() => setAddLabel(-1)}
                  disabled={isRunning}
                  className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                    addLabel === -1
                      ? "border-rose-500/50 bg-rose-500/10 text-rose-300"
                      : "border-card-border text-muted hover:text-foreground"
                  }`}
                >
                  − class (pink)
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-card-border bg-background/60 p-5">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent">
                Train
              </span>
              <label className="mt-3 block text-sm font-medium">Learning rate</label>
              <div className="mt-1 flex items-center justify-between text-xs font-mono text-muted">
                <span>0.1</span>
                <span>{learningRate.toFixed(2)}</span>
                <span>1.5</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.5"
                step="0.05"
                value={learningRate}
                onChange={(e) => setLearningRate(Number(e.target.value))}
                disabled={isRunning}
                className="mt-2 w-full accent-accent"
              />

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={train}
                  disabled={isRunning || points.length === 0}
                  className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Run perceptron
                </button>
                <button
                  type="button"
                  onClick={reset}
                  disabled={isRunning}
                  className="rounded-md border border-card-border px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  Reset w
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <button
                  type="button"
                  onClick={clearPoints}
                  disabled={isRunning}
                  className="rounded border border-card-border px-2.5 py-1 font-mono text-muted hover:text-foreground"
                >
                  clear points
                </button>
                <button
                  type="button"
                  onClick={loadStarter}
                  disabled={isRunning}
                  className="rounded border border-card-border px-2.5 py-1 font-mono text-muted hover:text-foreground"
                >
                  reload starter set
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-card-border bg-card-bg/70 p-5">
          <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent">
            The update rule
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            For each misclassified point, push the weight vector{" "}
            <span className="text-foreground">in the direction of its true class</span>:
            <br />
            <code className="font-mono">w ← w + η · y · x</code>,&nbsp;
            <code className="font-mono">b ← b + η · y</code>.
            Correctly classified points are skipped — they pull no force.
          </p>
        </div>
        <div className="rounded-2xl border border-card-border bg-card-bg/70 p-5">
          <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent">
            Why it converges
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            If the classes are linearly separable, the perceptron is
            guaranteed to find a separating hyperplane in finite steps
            (Novikoff, 1962). Try a non-separable cloud — it will oscillate
            without settling.
          </p>
        </div>
        <div className="rounded-2xl border border-card-border bg-card-bg/70 p-5">
          <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent">
            Read more
          </h3>
          <div className="mt-3 space-y-2 text-sm">
            <Link
              href="/wiki/topics/ai-ml/deep-learning/fundamentals/perceptron"
              className="block text-accent underline-offset-2 hover:underline"
            >
              Perceptron
            </Link>
            <Link
              href="/wiki/topics/ai-ml/supervised/regression/linear-regression"
              className="block text-accent underline-offset-2 hover:underline"
            >
              Linear Regression
            </Link>
            <Link
              href="/projects/mlviz/linear-regression"
              className="block text-accent underline-offset-2 hover:underline"
            >
              Demo: Linear Regression
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
