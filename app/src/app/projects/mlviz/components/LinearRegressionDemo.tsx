"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}

interface ModelState {
  slope: number;
  intercept: number;
  loss: number;
}

const DATASET: Point[] = [
  { x: 0.8, y: 2.1 },
  { x: 1.4, y: 2.7 },
  { x: 2.1, y: 3.1 },
  { x: 2.8, y: 3.7 },
  { x: 3.4, y: 4.0 },
  { x: 4.1, y: 4.8 },
  { x: 4.9, y: 5.5 },
  { x: 5.8, y: 6.1 },
  { x: 6.2, y: 6.8 },
  { x: 7.1, y: 7.0 },
  { x: 7.7, y: 7.8 },
  { x: 8.6, y: 8.2 },
];

const CHART = {
  width: 640,
  height: 360,
  left: 44,
  right: 24,
  top: 24,
  bottom: 36,
};

const LOSS_CHART = {
  width: 640,
  height: 180,
  left: 38,
  right: 20,
  top: 18,
  bottom: 28,
};

const X_RANGE = { min: 0, max: 10 };
const Y_RANGE = { min: 0, max: 10 };
const INITIAL_SLOPE = -0.7;
const INITIAL_INTERCEPT = 7.8;

function predict(slope: number, intercept: number, x: number) {
  return slope * x + intercept;
}

function computeLoss(slope: number, intercept: number) {
  const total = DATASET.reduce((sum, point) => {
    const error = predict(slope, intercept, point.x) - point.y;
    return sum + error * error;
  }, 0);

  return total / DATASET.length;
}

function createModelState(slope: number, intercept: number): ModelState {
  return {
    slope,
    intercept,
    loss: computeLoss(slope, intercept),
  };
}

function takeGradientStep(state: ModelState, learningRate: number): ModelState {
  let slopeGradient = 0;
  let interceptGradient = 0;

  for (const point of DATASET) {
    const error = predict(state.slope, state.intercept, point.x) - point.y;
    slopeGradient += error * point.x;
    interceptGradient += error;
  }

  const scale = 2 / DATASET.length;
  const nextSlope = state.slope - learningRate * scale * slopeGradient;
  const nextIntercept = state.intercept - learningRate * scale * interceptGradient;

  return createModelState(nextSlope, nextIntercept);
}

function scaleX(x: number) {
  const usableWidth = CHART.width - CHART.left - CHART.right;
  return CHART.left + ((x - X_RANGE.min) / (X_RANGE.max - X_RANGE.min)) * usableWidth;
}

function scaleY(y: number) {
  const usableHeight = CHART.height - CHART.top - CHART.bottom;
  return CHART.top + (1 - (y - Y_RANGE.min) / (Y_RANGE.max - Y_RANGE.min)) * usableHeight;
}

function buildLossPath(lossHistory: number[]) {
  if (lossHistory.length === 0) return "";

  const minLoss = Math.min(...lossHistory);
  const maxLoss = Math.max(...lossHistory);
  const spread = maxLoss - minLoss || 1;
  const usableWidth = LOSS_CHART.width - LOSS_CHART.left - LOSS_CHART.right;
  const usableHeight = LOSS_CHART.height - LOSS_CHART.top - LOSS_CHART.bottom;

  return lossHistory
    .map((loss, index) => {
      const x =
        LOSS_CHART.left +
        (lossHistory.length === 1 ? 0 : (index / (lossHistory.length - 1)) * usableWidth);
      const y =
        LOSS_CHART.top + ((maxLoss - loss) / spread) * usableHeight;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function formatEquation(slope: number, intercept: number) {
  const sign = intercept >= 0 ? "+" : "-";
  return `y = ${slope.toFixed(2)}x ${sign} ${Math.abs(intercept).toFixed(2)}`;
}

export default function LinearRegressionDemo() {
  const timerRef = useRef<number | null>(null);
  const [learningRate, setLearningRate] = useState(0.03);
  const [iterations, setIterations] = useState(80);
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [model, setModel] = useState<ModelState>(() =>
    createModelState(INITIAL_SLOPE, INITIAL_INTERCEPT),
  );
  const [lossHistory, setLossHistory] = useState<number[]>(() => [
    computeLoss(INITIAL_SLOPE, INITIAL_INTERCEPT),
  ]);

  function stopRun() {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  }

  function resetRun() {
    stopRun();
    const initialState = createModelState(INITIAL_SLOPE, INITIAL_INTERCEPT);
    setModel(initialState);
    setLossHistory([initialState.loss]);
    setStep(0);
  }

  function runDemo() {
    stopRun();

    const initialState = createModelState(INITIAL_SLOPE, INITIAL_INTERCEPT);
    let currentState = initialState;
    let currentStep = 0;
    const nextLossHistory = [initialState.loss];

    setModel(initialState);
    setLossHistory([initialState.loss]);
    setStep(0);
    setIsRunning(true);

    timerRef.current = window.setInterval(() => {
      currentState = takeGradientStep(currentState, learningRate);
      currentStep += 1;
      nextLossHistory.push(currentState.loss);

      setModel(currentState);
      setLossHistory([...nextLossHistory]);
      setStep(currentStep);

      if (currentStep >= iterations) {
        stopRun();
      }
    }, 60);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  const lineStartY = predict(model.slope, model.intercept, X_RANGE.min);
  const lineEndY = predict(model.slope, model.intercept, X_RANGE.max);
  const lineEquation = formatEquation(model.slope, model.intercept);
  const lossPath = buildLossPath(lossHistory);
  const lossDrop = lossHistory[0] - lossHistory[lossHistory.length - 1];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-card-border bg-card-bg/70 p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Linear Regression Demo</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
              Start with a clearly wrong line. Then follow the gradient downhill
              until the average squared error shrinks.
            </p>
          </div>
          <div className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-mono text-accent">
            live demo
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr),minmax(320px,1fr)]">
          <div className="rounded-2xl border border-card-border bg-background/60 p-4">
            <svg
              viewBox={`0 0 ${CHART.width} ${CHART.height}`}
              className="w-full"
              aria-label="Linear regression scatter plot"
            >
              {[0, 2, 4, 6, 8, 10].map((tick) => (
                <g key={tick}>
                  <line
                    x1={scaleX(tick)}
                    y1={CHART.top}
                    x2={scaleX(tick)}
                    y2={CHART.height - CHART.bottom}
                    stroke="rgba(115,115,115,0.18)"
                  />
                  <line
                    x1={CHART.left}
                    y1={scaleY(tick)}
                    x2={CHART.width - CHART.right}
                    y2={scaleY(tick)}
                    stroke="rgba(115,115,115,0.18)"
                  />
                </g>
              ))}

              <line
                x1={CHART.left}
                y1={CHART.height - CHART.bottom}
                x2={CHART.width - CHART.right}
                y2={CHART.height - CHART.bottom}
                stroke="rgba(237,237,237,0.45)"
              />
              <line
                x1={CHART.left}
                y1={CHART.top}
                x2={CHART.left}
                y2={CHART.height - CHART.bottom}
                stroke="rgba(237,237,237,0.45)"
              />

              <line
                x1={scaleX(X_RANGE.min)}
                y1={scaleY(lineStartY)}
                x2={scaleX(X_RANGE.max)}
                y2={scaleY(lineEndY)}
                stroke="rgba(59,130,246,0.95)"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {DATASET.map((point) => {
                const predictedY = predict(model.slope, model.intercept, point.x);
                return (
                  <g key={`${point.x}-${point.y}`}>
                    <line
                      x1={scaleX(point.x)}
                      y1={scaleY(point.y)}
                      x2={scaleX(point.x)}
                      y2={scaleY(predictedY)}
                      stroke="rgba(96,165,250,0.28)"
                      strokeDasharray="4 4"
                    />
                    <circle
                      cx={scaleX(point.x)}
                      cy={scaleY(point.y)}
                      r="5.5"
                      fill="rgba(237,237,237,0.96)"
                    />
                  </g>
                );
              })}

              <text
                x={CHART.left}
                y={CHART.top - 8}
                fill="rgba(237,237,237,0.88)"
                fontSize="14"
              >
                scatter + fitted line
              </text>
              <text
                x={CHART.width - CHART.right}
                y={CHART.height - 8}
                fill="rgba(115,115,115,0.95)"
                fontSize="12"
                textAnchor="end"
              >
                x
              </text>
              <text
                x={12}
                y={CHART.top}
                fill="rgba(115,115,115,0.95)"
                fontSize="12"
              >
                y
              </text>
            </svg>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-card-border bg-background/60 p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium">Current line</span>
                <span className="text-xs font-mono text-muted">
                  step {step}/{iterations}
                </span>
              </div>
              <p className="mt-3 text-lg font-semibold">{lineEquation}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-card-border bg-card-bg/70 p-3">
                  <div className="text-muted">Loss</div>
                  <div className="mt-1 text-lg font-semibold">
                    {model.loss.toFixed(3)}
                  </div>
                </div>
                <div className="rounded-xl border border-card-border bg-card-bg/70 p-3">
                  <div className="text-muted">Loss drop</div>
                  <div className="mt-1 text-lg font-semibold text-accent">
                    {lossDrop.toFixed(3)}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-card-border bg-background/60 p-5">
              <label className="block text-sm font-medium">
                Learning rate
              </label>
              <div className="mt-2 flex items-center justify-between text-xs font-mono text-muted">
                <span>smaller = safer</span>
                <span>{learningRate.toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="0.005"
                max="0.08"
                step="0.005"
                value={learningRate}
                onChange={(event) => setLearningRate(Number(event.target.value))}
                className="mt-3 w-full accent-accent"
                disabled={isRunning}
              />

              <label className="mt-5 block text-sm font-medium">
                Iterations
              </label>
              <div className="mt-2 flex items-center justify-between text-xs font-mono text-muted">
                <span>more steps = closer fit</span>
                <span>{iterations}</span>
              </div>
              <input
                type="range"
                min="20"
                max="180"
                step="10"
                value={iterations}
                onChange={(event) => setIterations(Number(event.target.value))}
                className="mt-3 w-full accent-accent"
                disabled={isRunning}
              />

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={runDemo}
                  className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isRunning}
                >
                  Run Gradient Descent
                </button>
                <button
                  type="button"
                  onClick={resetRun}
                  className="rounded-md border border-card-border px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-card-border bg-card-bg/70 p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold">Loss curve</h3>
          <span className="text-xs font-mono text-muted">
            MSE over time
          </span>
        </div>
        <svg
          viewBox={`0 0 ${LOSS_CHART.width} ${LOSS_CHART.height}`}
          className="w-full"
          aria-label="Loss curve"
        >
          <line
            x1={LOSS_CHART.left}
            y1={LOSS_CHART.height - LOSS_CHART.bottom}
            x2={LOSS_CHART.width - LOSS_CHART.right}
            y2={LOSS_CHART.height - LOSS_CHART.bottom}
            stroke="rgba(237,237,237,0.35)"
          />
          <line
            x1={LOSS_CHART.left}
            y1={LOSS_CHART.top}
            x2={LOSS_CHART.left}
            y2={LOSS_CHART.height - LOSS_CHART.bottom}
            stroke="rgba(237,237,237,0.35)"
          />
          {lossPath ? (
            <path
              d={lossPath}
              fill="none"
              stroke="rgba(16,185,129,0.95)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
          <text
            x={LOSS_CHART.left}
            y={LOSS_CHART.top - 4}
            fill="rgba(237,237,237,0.88)"
            fontSize="13"
          >
            lower is better
          </text>
        </svg>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-card-border bg-card-bg/70 p-5">
          <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent">
            Why the line moves
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Each parameter has a slope. If increasing that parameter makes loss
            go up, the derivative is positive, so gradient descent moves in the
            negative direction instead.
          </p>
        </div>
        <div className="rounded-2xl border border-card-border bg-card-bg/70 p-5">
          <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent">
            Why MSE
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Squaring the miss makes large residuals matter more and keeps the
            surface smooth enough for calculus-based optimization.
          </p>
        </div>
        <div className="rounded-2xl border border-card-border bg-card-bg/70 p-5">
          <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent">
            Ask deeper
          </h3>
          <div className="mt-3 space-y-2 text-sm">
            <Link
              href="/wiki/topics/ai-ml/supervised/regression/linear-regression"
              className="block text-accent underline-offset-2 hover:underline"
            >
              Linear Regression
            </Link>
            <Link
              href="/wiki/topics/math/optimization/gradient-descent"
              className="block text-accent underline-offset-2 hover:underline"
            >
              Gradient Descent
            </Link>
            <Link
              href="/wiki/topics/math/calculus/derivatives-gradient"
              className="block text-accent underline-offset-2 hover:underline"
            >
              Derivatives and Gradients
            </Link>
            <Link
              href="/wiki/topics/ai-ml/foundations/loss-functions"
              className="block text-accent underline-offset-2 hover:underline"
            >
              Loss Functions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
