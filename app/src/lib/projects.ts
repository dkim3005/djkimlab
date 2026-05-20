// Per-project deep-dive content. Each entry powers /projects/<slug>.
// Numbers and quoted facts come from the project codebases on the
// host machine (READMEs, FastAPI routes); generic prose is paraphrased
// from the landing page card. Where a value would be invented, the
// field is omitted instead of guessed.

export type ProjectCategory =
  | "Investment Ops"
  | "Medical AI"
  | "Reinforcement Learning"
  | "Agentic AI"
  | "NLP & Speech"
  | "Vision & HCI"
  | "Quant Finance"
  | "LLM & RAG"
  | "Coursework";

export interface ProjectDetail {
  slug: string;
  title: string;
  category: ProjectCategory;
  tagline: string;
  metric?: string;
  href?: string;
  problem: string;
  audience: string;
  architecture: { component: string; role: string }[];
  flow: string[];
  decisions: { decision: string; why: string }[];
  stack: string[];
  rebuild?: string[];
  resources?: { label: string; href: string }[];
}

export const PROJECT_DETAILS: ProjectDetail[] = [
  // ───────────────────────────────────────────────────────────────────
  {
    slug: "ops",
    title: "Investment Operations Suite",
    category: "Investment Ops",
    tagline:
      "Live back-office platform — five operations modules over one continuously evolving market simulation.",
    metric: "5 ops modules · 1 live market sim · FRED-anchored",
    href: "https://ops.djkimlab.com",
    problem:
      "Investment back-office tooling is usually demoed against a one-off CSV. That hides the actual problem: the same trades flow through reconciliation, NAV, data-quality monitoring, document extraction, and the ledger — and they have to agree. The suite is a single market simulator with five operations modules wired on top, so every module sees the same evolving book and the same breaks.",
    audience:
      "Fund operations / middle-office engineers, anyone interviewing for a back-office or fintech-platform role who wants to see infra-style ML thinking applied to ops.",
    architecture: [
      {
        component: "Market simulator",
        role: "Continuously evolving prices anchored to real FRED macro series; drives every module.",
      },
      {
        component: "Recon module",
        role: "GET /api/recon — pulls internal vs custodian positions, surfaces breaks and aging.",
      },
      {
        component: "Reporting module",
        role: "GET /api/reporting/mandates → /report/{mandate_id} — NAV, performance, attribution per mandate.",
      },
      {
        component: "Data quality module",
        role: "GET /api/dataquality — multi-source consistency monitoring (price, holdings, FX).",
      },
      {
        component: "Documents module",
        role: "POST /api/documents/extract + /ask — trade-confirmation extraction with an SOP-grounded assistant.",
      },
      {
        component: "Ledger module",
        role: "GET /api/ledger — double-entry accounting over executed trades and cash flows.",
      },
    ],
    flow: [
      "Simulator ticks → prices and holdings update.",
      "Recon snapshots both books, flags breaks above tolerance.",
      "Reporting recomputes NAV / performance from the latest holdings + prices.",
      "Data quality watches the same feeds for inconsistencies before they reach a downstream module.",
      "Documents accepts uploaded trade confirmations, extracts structured fields, and answers SOP questions grounded in policy docs.",
      "Ledger posts double-entry journals from executed trades and aged cash.",
    ],
    decisions: [
      {
        decision: "One simulator instead of fixtures per module.",
        why: "Reconciliation and NAV that disagree on the same trade is the whole interesting failure mode. Per-module fixtures would mask it.",
      },
      {
        decision: "FastAPI single backend, modules as routes (not microservices).",
        why: "The modules share data and one-shot deployment matters more than independent scaling at portfolio scale.",
      },
      {
        decision: "Anchor to FRED instead of synthetic-only data.",
        why: "Real macro context makes the simulator behave plausibly under regime changes; pure random walks look fake in a demo.",
      },
    ],
    stack: ["Python", "FastAPI", "Investment Operations", "Live Simulation", "FRED", "Next.js"],
    rebuild: [
      "Persist a real ledger DB instead of in-memory; expose a trial-balance endpoint.",
      "Surface a single combined event log so a break can be traced from market tick → recon → ledger.",
    ],
  },

  // ───────────────────────────────────────────────────────────────────
  {
    slug: "radiology",
    title: "Radiology AI",
    category: "Medical AI",
    tagline:
      "Chest X-ray triage, explainability and semantic search — one shared model across three workflows.",
    metric: "14 conditions · 112k X-rays · 3 workflows on 1 model",
    href: "https://radiology.djkimlab.com",
    problem:
      "Three different things a radiology team wants from an X-ray model — triage, region explanation, and similar-case retrieval — are usually built as three different systems. They don't have to be. This platform runs one DenseNet for triage and explainability, plus CLIP for retrieval, on the NIH ChestX-ray14 corpus (112,120 frontal images, 14 disease labels).",
    audience:
      "Medical AI engineers, clinical informatics teams, anyone evaluating how a multi-label classifier should be wired into a real workflow.",
    architecture: [
      {
        component: "DenseNet121 (torchxrayvision)",
        role: "Multi-label classifier loaded once at boot, shared between triage and explainability.",
      },
      {
        component: "Class Activation Maps",
        role: "Computed from the DenseNet's final feature maps + classification weights — no extra model.",
      },
      {
        component: "CLIP ViT-B/32 (open_clip)",
        role: "Zero-shot text→image and image→image retrieval, plus auto-generated tags.",
      },
      {
        component: "FHIR-style context",
        role: "Patient + imaging metadata wrapped in a FHIR shape so the demo speaks the same vocabulary clinical systems do.",
      },
      {
        component: "FastAPI + Next.js",
        role: "Backend on port 10001, frontend on 10000; tunnel routes radiology.djkimlab.com to the frontend.",
      },
    ],
    flow: [
      "Image uploaded → DenseNet runs once → 14 per-condition probabilities.",
      "User clicks a condition → CAM derived from that class's weighted feature map → heatmap overlay.",
      "User flips to search → CLIP embeds the query (text or image) → cosine over pre-computed library embeddings → ranked hits.",
    ],
    decisions: [
      {
        decision: "Use torchxrayvision DenseNet121 rather than training from scratch.",
        why: "ChestX-ray14 is a known benchmark; the value here is the workflow integration, not yet-another model card.",
      },
      {
        decision: "Three workflows on one shared model.",
        why: "Triage and explainability are literally the same forward pass; splitting them was a code smell.",
      },
      {
        decision: "FHIR context, not raw fields.",
        why: "Anyone working in a hospital IT environment immediately knows what a Patient + Imaging Study looks like; that's the integration story.",
      },
    ],
    stack: ["PyTorch", "DenseNet121", "CLIP", "Grad-CAM", "FHIR", "Next.js"],
    rebuild: [
      "Bring up image-level uncertainty (calibration / temperature scaling) so triage shows confidence bands.",
      "Cache CLIP embeddings on disk per dataset version, not in memory at process start.",
    ],
  },

  // ───────────────────────────────────────────────────────────────────
  {
    slug: "rl",
    title: "Reinforcement Learning Lab",
    category: "Reinforcement Learning",
    tagline: "A DQN agent and a Connect-4 game-AI arena in one workbench.",
    metric: "3 search algorithms · play live in browser",
    href: "https://rl.djkimlab.com",
    problem:
      "Two strands of RL teaching usually live in different repos: value-based control on Gym environments, and search-based game AI. This single workbench puts them side by side — a DQN trainer that streams reward and loss live, and a Connect-4 arena where you can play alpha-beta minimax, MCTS, and an AlphaZero-style self-play network from the same UI.",
    audience:
      "Anyone interviewing for an RL / game-AI role, students wiring up their first agent and wanting to see one that already streams metrics.",
    architecture: [
      {
        component: "Gymnasium training loop",
        role: "DQN on CartPole / Acrobot; reward and loss pushed live over WebSocket as the run progresses.",
      },
      {
        component: "Train session manager",
        role: "POST /api/train/start → session id; status + WS feed per session; stop endpoint.",
      },
      {
        component: "Connect-4 arena",
        role: "Same UI plays you against alpha-beta minimax, MCTS, or an AlphaZero-style self-play network.",
      },
      {
        component: "Next.js front-end",
        role: "Live charts for reward / loss, plus the board for the arena.",
      },
    ],
    flow: [
      "User selects env + hyperparams → POST /api/train/start opens a session.",
      "Background trainer steps the env, updates the replay buffer, pushes reward / loss / epsilon to the WS each episode.",
      "User can stop a session mid-run; the model is checkpointed.",
      "Arena uses pure search (minimax / MCTS) or runs inference against the trained Connect-4 network.",
    ],
    decisions: [
      {
        decision: "WebSocket for training telemetry, not polling.",
        why: "Watching loss climb out of a flat region is the whole pedagogical point; polling buries the dynamics.",
      },
      {
        decision: "Three Connect-4 agents in one arena.",
        why: "You can feel the difference between brute search, sample-based search, and a trained policy by playing the same board against each.",
      },
      {
        decision: "Sessions instead of one global training run.",
        why: "Lets several runs proceed in parallel from different starting hyperparams without contaminating each other.",
      },
    ],
    stack: ["PyTorch", "DQN", "MCTS", "AlphaZero", "Gymnasium", "WebSocket", "Next.js"],
    rebuild: [
      "Add PPO alongside DQN so the comparison covers on-policy vs off-policy.",
      "Persist past sessions to disk so a recruiter can browse a run they didn't start themselves.",
    ],
  },

  // ───────────────────────────────────────────────────────────────────
  {
    slug: "agent",
    title: "Autonomous AI Agent",
    category: "Agentic AI",
    tagline: "A tool-using agent that plans, acts, observes and self-corrects.",
    metric: "AST-sandboxed Python · self-corrects · streamed trace",
    href: "https://agent.djkimlab.com",
    problem:
      "Most demo agents either crash on the first tool error or hide their reasoning. This one runs an explicit plan → act → observe loop, streams every reasoning step and tool call to the browser, reads tool errors as new context, and tries again — with a real-world hardening story around the Python sandbox.",
    audience:
      "Anyone building or evaluating LLM agents, especially around tool-use safety and observability.",
    architecture: [
      {
        component: "Plan-act-observe loop",
        role: "Each iteration the LLM emits a short rationale + one tool call; the tool's output becomes the next observation.",
      },
      {
        component: "Calculator tool",
        role: "AST-parsed arithmetic — operators + math.* functions + constants only. No name lookups, no calls outside the whitelist.",
      },
      {
        component: "run_python tool",
        role: "Restricted Python sandbox. Defence in depth — AST validation rejects non-whitelisted imports, dunder access, exec / eval / open before any code runs; execution itself uses restricted builtins.",
      },
      {
        component: "Streaming UI",
        role: "Every reasoning step, tool call, and observation pushed to the browser as it happens. The agent's failures are visible.",
      },
    ],
    flow: [
      "User gives a task → LLM receives task + tool schemas.",
      "LLM emits reasoning + tool call → tool runs.",
      "Output (or error) is fed back as an observation.",
      "Loop continues up to a step budget; when the LLM responds without a tool call, that response is final.",
      "If a tool returned an error, the agent reads it on the next step and adjusts (e.g. code that printed nothing or threw).",
    ],
    decisions: [
      {
        decision: "AST validation before execution, not just at runtime.",
        why: "Catching imports / dunder access at parse time is much harder to bypass than runtime checks alone.",
      },
      {
        decision: "Stream the entire reasoning trace.",
        why: "Agents fail in interesting ways. Hiding the trace turns every failure into mystery; streaming it turns failures into debuggable evidence.",
      },
      {
        decision: "Errors are first-class context, not crashes.",
        why: "The agent's ability to recover from a wrong tool call is the actual capability worth demonstrating.",
      },
    ],
    stack: ["LLM", "Agentic AI", "Tool Use", "Sandbox", "FastAPI", "Next.js"],
    rebuild: [
      "Add a planner step that emits a multi-step plan first, then executes — useful comparison against the current single-step loop.",
      "Move the sandbox into a separate process with seccomp + cgroup limits instead of in-process restricted builtins.",
    ],
  },

  // ───────────────────────────────────────────────────────────────────
  {
    slug: "audio",
    title: "Audio Intelligence",
    category: "NLP & Speech",
    tagline: "Speech → transcription, sentiment, keywords — a full NLP pipeline.",
    metric: "Speech → 4 structured outputs in one pass",
    href: "https://audio.djkimlab.com",
    problem:
      "Upload an audio clip and you usually get just a transcript. Adding sentiment, keywords, and speaking-rate to the same upload is mechanically easy but rarely shipped together. This is the one-pass version.",
    audience:
      "Anyone evaluating NLP pipeline glue, candidates for a voice-product role wanting a small but complete example.",
    architecture: [
      {
        component: "faster-whisper (tiny)",
        role: "Transcription with word-level timestamps. POST /api/transcribe.",
      },
      {
        component: "DistilBERT sentiment",
        role: "Sentence-level positive / negative scoring over the transcript.",
      },
      {
        component: "Keyword extractor",
        role: "Salient terms surfaced from the transcript for skim-friendly summaries.",
      },
      {
        component: "Speaking-rate calculator",
        role: "Tokens / second derived from word timestamps.",
      },
      {
        component: "FastAPI + Next.js",
        role: "POST /api/analyze runs the full pipeline; UI shows transcript and the three analyses side by side.",
      },
    ],
    flow: [
      "Audio uploaded → Whisper produces transcript + word timestamps.",
      "Transcript chunked by sentence → DistilBERT scores each.",
      "Keyword extractor pulls salient terms; speaking rate computed from timestamps.",
      "Structured response with all four blocks returned in one shot.",
    ],
    decisions: [
      {
        decision: "Whisper tiny instead of larger variants.",
        why: "Latency on a homelab CPU matters more than the last point of WER for a demo; tiny still produces usable transcripts for sentiment.",
      },
      {
        decision: "One analyze endpoint that returns everything.",
        why: "Multiple round-trips would make the UI more complex without changing what the user sees.",
      },
    ],
    stack: ["faster-whisper", "DistilBERT", "NLP", "Sentiment", "FastAPI", "Next.js"],
    rebuild: [
      "Add speaker diarization so sentiment per speaker is meaningful in multi-voice clips.",
      "Stream the transcript word-by-word as Whisper emits it instead of waiting for full completion.",
    ],
  },

  // ───────────────────────────────────────────────────────────────────
  {
    slug: "lamp",
    title: "Responsive Lamp",
    category: "Vision & HCI",
    tagline: "A gaze-tracked virtual desk lamp with object detection and memory.",
    metric: "6-DOF lamp · real-time gaze + object memory",
    href: "https://lamp.djkimlab.com",
    problem:
      "Most CV demos show you bounding boxes and stop. This one closes the loop — gaze tells the lamp where you're looking, object detection tells it what's there, and a small store remembers what was on the desk so the lamp (and an LLM behind it) can answer questions about it later.",
    audience:
      "Anyone interviewing for HCI / spatial-computing / multimodal-agent roles, or curious how MediaPipe + YOLO + an LLM stitch together.",
    architecture: [
      {
        component: "MediaPipe iris landmarks",
        role: "Real-time gaze direction from the webcam; drives where the virtual lamp points.",
      },
      {
        component: "YOLOv8 detector",
        role: "Object detection on the same camera frame; populates the spatial memory.",
      },
      {
        component: "Spatial memory store",
        role: "Detected objects with timestamps + last-seen positions; queryable by the LLM.",
      },
      {
        component: "GPT-4o-mini answerer",
        role: "Grounds spatial-memory queries (\"where did I last see my keys?\") against the local store instead of hallucinating.",
      },
      {
        component: "Three.js lamp",
        role: "6-DOF lamp model in the browser; its target follows gaze via WebSocket.",
      },
      {
        component: "WebSocket bridge",
        role: "Backend (FastAPI) pushes gaze and detection events to the browser without polling.",
      },
    ],
    flow: [
      "Webcam frame → MediaPipe extracts iris landmarks → gaze vector.",
      "Same frame → YOLO produces detections → memory store updated.",
      "Gaze vector pushed over WS → Three.js lamp re-aims.",
      "User asks \"what's near my mug?\" → LLM reads memory store, answers with last-seen objects + positions.",
    ],
    decisions: [
      {
        decision: "Memory store, not raw frame logs.",
        why: "The LLM should reason over typed events (object, time, position), not over thousands of frames.",
      },
      {
        decision: "WebSocket end-to-end.",
        why: "Gaze at 30+ Hz over HTTP polling would either stutter or hammer the server.",
      },
      {
        decision: "GPT-4o-mini for query answering, not a larger model.",
        why: "Memory queries are short and bounded; latency matters more than reasoning depth.",
      },
    ],
    stack: ["MediaPipe", "YOLOv8", "Three.js", "GPT-4o-mini", "WebSocket", "FastAPI"],
    rebuild: [
      "Persist memory beyond process lifetime so \"yesterday\" queries work.",
      "Switch detection to a smaller-but-faster YOLO variant; the demo doesn't need 80-class COCO.",
    ],
  },

  // ───────────────────────────────────────────────────────────────────
  {
    slug: "quant",
    title: "Quant Trading Platform",
    category: "Quant Finance",
    tagline: "Regime-aware swing trading with multifactor ranking and paper execution.",
    metric: "Multifactor + HMM regime · 15-min paper-trade cycle",
    href: "https://quant.djkimlab.com",
    problem:
      "Quant tutorials usually stop at a backtest. This one runs the full loop: watchlist ingestion, multifactor ranking, regime detection, sentiment overlay, paper execution with sizing and stops, and a scheduled cycle that runs on the clock.",
    audience:
      "Quant / systematic-trading engineers, candidates for a research-engineer role wanting to see infra-quality plumbing under a strategy.",
    architecture: [
      {
        component: "Yahoo Finance ingestion",
        role: "Daily history for the watchlist (SPY, QQQ, IWM, TLT, GLD, XLK, SMH, AAPL, MSFT, NVDA, META, ...).",
      },
      {
        component: "Multifactor ranking model",
        role: "Trend, momentum, relative strength, accumulation / volume combined into a per-name score.",
      },
      {
        component: "HMM regime detector",
        role: "Market regime classification used as a sizing / on-off overlay on the ranking signal.",
      },
      {
        component: "FinBERT sentiment",
        role: "News sentiment as an additional input on top of price signals.",
      },
      {
        component: "FRED macro inputs",
        role: "Macro context (rates, breadth) feeds into the regime detector.",
      },
      {
        component: "Paper execution engine",
        role: "Entry sizing, stop, take-profit, trailing-stop; orders posted to the IBKR paper account.",
      },
      {
        component: "Scheduled cycle",
        role: "15-min cron-style loop that re-ranks, rechecks regime, and fires orders.",
      },
      {
        component: "Streamlit dashboard + FastAPI API",
        role: "UI for the daily view; API for programmatic access.",
      },
    ],
    flow: [
      "Cron triggers cycle → ingest fresh prices.",
      "Multifactor model re-ranks watchlist.",
      "HMM updates regime → sizing scale chosen.",
      "FinBERT sentiment overlays the ranking.",
      "Engine compares against the live paper book → emits buy / sell / stop adjustments.",
      "Dashboard reflects the new positions and P&L.",
    ],
    decisions: [
      {
        decision: "Regime detector via HMM, not just a trend filter.",
        why: "Trend filters lag at regime turning points; HMM captures the latent state and de-risks earlier.",
      },
      {
        decision: "Paper, not live.",
        why: "Strategy is for learning and demo; risking real capital changes the project from \"build the loop\" to \"prove the edge\".",
      },
      {
        decision: "Streamlit + FastAPI both, not Streamlit alone.",
        why: "Streamlit is great for the dashboard but bad as an API. The split keeps a clean machine-callable interface.",
      },
    ],
    stack: ["Python", "FastAPI", "HMM", "FinBERT", "FRED", "IBKR", "TimescaleDB", "Streamlit"],
    rebuild: [
      "Persist cycle results into TimescaleDB so you can audit any past decision against the inputs it saw.",
      "Add a Sharpe / max-drawdown comparison vs SPY surfaced in the dashboard.",
    ],
  },

  // ───────────────────────────────────────────────────────────────────
  {
    slug: "chatbot",
    title: "Consulate Chatbot",
    category: "LLM & RAG",
    tagline: "A grounded RAG chatbot for the Korean Consulate in Toronto.",
    metric: "216 official posts · BM25 + embeddings hybrid",
    href: "https://chatbot.djkimlab.com",
    problem:
      "Consulate visitors and Korean nationals in Toronto repeatedly ask the same procedural questions (passport, visa, notarization, military service, family registration). The official bulletin has the answers but is hard to search. This chatbot grounds answers strictly in 216 official posts using hybrid retrieval and refuses to invent anything outside that corpus.",
    audience:
      "Civic-tech and government-AI teams, anyone shipping a public-facing RAG chatbot where hallucinations cause real harm.",
    architecture: [
      {
        component: "Query normalizer",
        role: "Strips colloquial Korean endings and detects topic (passport / visa / notarization / military service / family registration).",
      },
      {
        component: "BM25 sub-indexes per topic",
        role: "When topic is detected, search a topic-specific BM25 index for precision.",
      },
      {
        component: "Full BM25 + embedding hybrid (RRF)",
        role: "When no topic is detected, run full BM25 plus OpenAI embedding search and merge with Reciprocal Rank Fusion.",
      },
      {
        component: "Context assembler",
        role: "Top 5 posts assembled into a context window up to 16,000 characters.",
      },
      {
        component: "GPT-4o generator",
        role: "Temperature 0.05, instructed to answer strictly from the provided posts, with source links and disclaimer.",
      },
      {
        component: "Streaming SSE",
        role: "Token-by-token response streamed to the browser; marked.js renders markdown live.",
      },
    ],
    flow: [
      "User asks a question (Korean) → query normalized + topic detected.",
      "If topic detected → BM25 sub-index search. Else → full BM25 + embeddings → RRF merge.",
      "Top 5 posts assembled into a ≤16,000-character context.",
      "GPT-4o streams the answer grounded in that context, with source links + disclaimer.",
    ],
    decisions: [
      {
        decision: "Hybrid BM25 + embeddings, not pure vector.",
        why: "Government terminology is rare and exact-match-heavy (form numbers, statute names). Pure embeddings drift on those; BM25 nails them.",
      },
      {
        decision: "Per-topic sub-indexes when topic is detected.",
        why: "Passport answers should never come from the military-service section, even if vector cosine says they're \"close\".",
      },
      {
        decision: "Strict grounding + disclaimer + source links.",
        why: "Wrong civic-service information has real consequences. Better to say \"I don't know\" than to invent.",
      },
      {
        decision: "Temperature 0.05.",
        why: "Determinism matters more than fluency variety for a public-facing reference bot.",
      },
    ],
    stack: ["Python", "FastAPI", "OpenAI", "RAG", "BM25", "SSE"],
    rebuild: [
      "Auto-resync the bulletin scrape on a schedule and version the embedding index so old answers can be traced to old content.",
      "Surface confidence (best-hit rank / score) alongside answers so the user knows when retrieval was weak.",
    ],
  },

  // ───────────────────────────────────────────────────────────────────
  {
    slug: "deep-learning-cs7643",
    title: "Deep Learning — CS 7643",
    category: "Coursework",
    tagline:
      "CNNs, RNNs and attention implemented from scratch in PyTorch.",
    problem:
      "Georgia Tech's CS 7643 implements the deep-learning curriculum hands-on rather than as a survey. Each homework rebuilds a foundational architecture from scratch in PyTorch, then benchmarks the from-scratch version against the pretrained baseline.",
    audience:
      "GT prospective students, anyone deciding whether the OMSCS deep-learning track is worth taking.",
    architecture: [
      { component: "CNNs", role: "Built from conv / pool / batchnorm primitives for image classification." },
      { component: "RNNs", role: "Vanilla RNN → LSTM for sequence modelling." },
      { component: "Attention", role: "Scaled dot-product attention from scratch, then transfer-learning on top." },
    ],
    flow: [
      "Read the paper.",
      "Implement the primitive in raw PyTorch.",
      "Train on the assigned dataset.",
      "Compare against the pretrained baseline — explain the gap.",
    ],
    decisions: [],
    stack: ["PyTorch", "CNN", "RNN", "Attention", "Transfer Learning"],
  },

  // ───────────────────────────────────────────────────────────────────
  {
    slug: "ml-trading-cs7646",
    title: "ML for Trading — CS 7646",
    category: "Coursework",
    tagline: "A market simulation framework with Q-learning strategy learners.",
    problem:
      "CS 7646 wires reinforcement learning and supervised learners into a market simulator. The deliverable is a full simulation framework — not a notebook — with reproducible Sharpe, cumulative return, and drawdown comparisons against buy-and-hold.",
    audience:
      "Prospective OMSCS students, people considering applying ML to trading and wanting to see the academic version first.",
    architecture: [
      { component: "Market sim", role: "Order execution, fills, holdings, cash over historical prices." },
      { component: "Q-learning strategy learner", role: "Discretized state space; reward shaped from return." },
      { component: "Random Forest strategy learner", role: "Supervised baseline; same features, different fit." },
      { component: "Evaluator", role: "Sharpe, cumulative return, max drawdown vs buy-and-hold." },
    ],
    flow: [
      "Build feature set from price history.",
      "Train Q-learner / RF on training period.",
      "Walk forward over test period through the sim.",
      "Compare to buy-and-hold baseline.",
    ],
    decisions: [],
    stack: ["Python", "Q-Learning", "Random Forest", "Sharpe Ratio", "RL"],
  },
];

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return PROJECT_DETAILS.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECT_DETAILS.map((p) => p.slug);
}
