import Link from "next/link";
import { getSiteLastUpdated } from "@/lib/site-meta";
import { PROJECT_DETAILS } from "@/lib/projects";

const PROJECT_SLUGS = new Set(PROJECT_DETAILS.map((p) => p.slug));

// Each landing-page card maps to a project-detail slug. Add `slug` here
// once and the card becomes clickable to /projects/<slug>.
const SLUG_BY_TITLE: Record<string, string> = {
  "Investment Operations Suite": "ops",
  "Radiology AI": "radiology",
  "Reinforcement Learning Lab": "rl",
  "Autonomous AI Agent": "agent",
  "Audio Intelligence": "audio",
  "Responsive Lamp": "lamp",
  "Quant Trading Platform": "quant",
  "Consulate Chatbot": "chatbot",
  "Deep Learning — CS 7643": "deep-learning-cs7643",
  "ML for Trading — CS 7646": "ml-trading-cs7646",
};

const PROJECTS = [
  {
    title: "Investment Operations Suite",
    category: "Investment Ops",
    tagline: "Live back-office platform — five operations modules, one market simulation.",
    description:
      "A live back-office platform — five operations modules over one continuously evolving market simulation: custodian reconciliation and break detection, NAV and performance reporting, multi-source data quality monitoring, trade-confirmation extraction with an SOP assistant, and trade-to-ledger double-entry accounting. Anchored to real FRED market data.",
    tags: ["Python", "FastAPI", "Investment Operations", "Live Simulation", "FRED", "Next.js"],
    status: "",
    href: "https://ops.djkimlab.com",
    metric: "5 ops modules · 1 live market sim",
  },
  {
    title: "Radiology AI",
    category: "Medical AI",
    tagline: "Chest X-ray triage, explainability and semantic search — one shared model.",
    description:
      "A chest X-ray analysis platform over the NIH ChestX-ray14 corpus — DenseNet121 multi-label triage with FHIR patient context, Class Activation Map explainability showing which regions drove each prediction, and CLIP ViT-B/32 semantic image search. One shared model, three workflows.",
    tags: ["PyTorch", "DenseNet121", "CLIP", "Grad-CAM", "FHIR", "Next.js"],
    status: "",
    href: "https://radiology.djkimlab.com",
    metric: "14 conditions · 112k X-rays · 3 workflows on 1 model",
  },
  {
    title: "Reinforcement Learning Lab",
    category: "Reinforcement Learning",
    tagline: "A DQN agent and a Connect-4 game-AI arena in one workbench.",
    description:
      "Two reinforcement-learning workbenches in one — a DQN agent learning Gymnasium control tasks (CartPole, Acrobot) with reward and loss streamed live over WebSocket, and a Connect-4 arena pitting alpha-beta minimax, Monte Carlo Tree Search, and an AlphaZero-style self-play network against you.",
    tags: ["PyTorch", "DQN", "MCTS", "AlphaZero", "Gymnasium", "Next.js"],
    status: "",
    href: "https://rl.djkimlab.com",
    metric: "3 search algorithms · play live in browser",
  },
  {
    title: "Autonomous AI Agent",
    category: "Agentic AI",
    tagline: "A tool-using agent that plans, acts, observes and self-corrects.",
    description:
      "A tool-using reasoning agent that runs a plan → act → observe loop — calling tools, reading results, and self-correcting until it solves the task. Tools include a safe calculator and a restricted Python sandbox (AST-validated, no file or network access). The full reasoning trace is streamed live.",
    tags: ["LLM", "Agentic AI", "Tool Use", "Sandbox", "FastAPI", "Next.js"],
    status: "",
    href: "https://agent.djkimlab.com",
    metric: "AST-sandboxed Python · self-corrects · streamed trace",
  },
  {
    title: "Audio Intelligence",
    category: "NLP & Speech",
    tagline: "Speech → transcription, sentiment, keywords — a full NLP pipeline.",
    description:
      "Upload audio → Whisper tiny transcription with timestamps, sentence-level sentiment via DistilBERT, keyword extraction, and speaking rate. Full NLP pipeline from raw speech to structured analysis report.",
    tags: ["faster-whisper", "DistilBERT", "NLP", "Sentiment", "FastAPI", "Next.js"],
    status: "",
    href: "https://audio.djkimlab.com",
    metric: "Speech → 4 structured outputs in one pass",
  },
  {
    title: "Responsive Lamp",
    category: "Vision & HCI",
    tagline: "A gaze-tracked virtual desk lamp with object detection and memory.",
    description:
      "6-DOF virtual desk lamp with real-time gaze tracking via MediaPipe iris landmarks, YOLOv8 object detection, and spatial memory queries answered by GPT-4o-mini grounded in a local visual store.",
    tags: ["MediaPipe", "YOLOv8", "Three.js", "GPT-4o-mini", "WebSocket", "FastAPI"],
    status: "",
    href: "https://lamp.djkimlab.com",
    metric: "6-DOF lamp · real-time gaze + object memory",
  },
  {
    title: "Quant Trading Platform",
    category: "Quant Finance",
    tagline: "Regime-aware swing trading with multifactor ranking and paper execution.",
    description:
      "Regime-aware swing trading platform for US equities and ETFs. Multifactor ranking model (trend, momentum, relative strength, accumulation/volume) layered with HMM-based market regime detection, FinBERT sentiment analysis, and FRED macro inputs. Paper trading engine with entry sizing, stop/TP/trailing-stop, and a 15-min scheduled cycle.",
    tags: ["Python", "FastAPI", "HMM", "FinBERT", "FRED", "IBKR", "TimescaleDB", "Streamlit"],
    status: "",
    href: "https://quant.djkimlab.com",
    metric: "Multifactor + HMM regime · 15-min paper-trade cycle",
  },
  {
    title: "Consulate Chatbot",
    category: "LLM & RAG",
    tagline: "A grounded RAG chatbot for the Korean Consulate in Toronto.",
    description:
      "RAG-based civil service chatbot for the Consulate General of Korea in Toronto. Hybrid BM25 + OpenAI embedding search over 216 official bulletin posts (passport, visa, notarization, military service, and more), answered by GPT-4o grounded strictly in official content — with source links and disclaimer.",
    tags: ["Python", "FastAPI", "OpenAI", "RAG", "BM25", "SSE"],
    status: "Korean only",
    href: "https://chatbot.djkimlab.com",
    metric: "216 official posts · BM25 + embeddings hybrid",
  },
  {
    title: "Deep Learning — CS 7643",
    category: "Coursework",
    tagline: "CNNs, RNNs and attention implemented from scratch in PyTorch.",
    description:
      "Implemented CNNs, RNNs, and attention mechanisms from scratch in PyTorch for image classification, sequence modelling, and transfer learning. Reproduced foundational architectures and benchmarked against pretrained baselines.",
    tags: ["PyTorch", "CNN", "RNN", "Attention", "Transfer Learning"],
    status: "Georgia Tech",
    href: "#",
    metric: "",
  },
  {
    title: "ML for Trading — CS 7646",
    category: "Coursework",
    tagline: "A market simulation framework with Q-learning strategy learners.",
    description:
      "Built a full market simulation framework implementing Q-learning and random forest strategy learners. Evaluated portfolio performance using Sharpe ratio, cumulative return, and drawdown against buy-and-hold baselines.",
    tags: ["Python", "Q-Learning", "Random Forest", "Sharpe Ratio", "RL"],
    status: "Georgia Tech",
    href: "#",
    metric: "",
  },
];

// Five-color semantic system instead of one-color-per-category:
//   blue   — production business systems (ops, finance)
//   cyan   — perception (medical, vision)
//   violet — learning / agents / reasoning
//   emerald — language and retrieval (NLP, LLM, RAG)
//   slate  — coursework
const BLUE = { chip: "text-blue-300 bg-blue-500/10 border-blue-500/25", bar: "bg-blue-500", watermark: "text-blue-300/35" };
const CYAN = { chip: "text-cyan-300 bg-cyan-500/10 border-cyan-500/25", bar: "bg-cyan-500", watermark: "text-cyan-300/35" };
const VIOLET = { chip: "text-violet-300 bg-violet-500/10 border-violet-500/25", bar: "bg-violet-500", watermark: "text-violet-300/35" };
const EMERALD = { chip: "text-emerald-300 bg-emerald-500/10 border-emerald-500/25", bar: "bg-emerald-500", watermark: "text-emerald-300/35" };
const SLATE = { chip: "text-slate-300 bg-slate-500/10 border-slate-500/25", bar: "bg-slate-600", watermark: "text-slate-300/35" };

const CATEGORY: Record<string, { chip: string; bar: string; watermark: string }> = {
  "Investment Ops": BLUE,
  "Quant Finance": BLUE,
  "Medical AI": CYAN,
  "Vision & HCI": CYAN,
  "Reinforcement Learning": VIOLET,
  "Agentic AI": VIOLET,
  "NLP & Speech": EMERALD,
  "LLM & RAG": EMERALD,
  "Coursework": SLATE,
};

const EXPERIENCE = [
  {
    role: "Administrative Officer — Technical Systems",
    org: "Consulate General of the Republic of Korea",
    sub: "Political and Economic Affairs",
    location: "Toronto, ON",
    period: "Dec 2025 — Present",
    tags: ["Python", "LLM APIs", "NLP", "FastAPI", "Telegram Bot", "Cloudflare Zero Trust"],
    highlights: [
      "Designed and deployed a Python backend pipeline ingesting ~15 live government/media sources, classifying articles by NLP topic, and generating structured summaries via LLM APIs — runs up to 5×/day with automated monitoring, error logging, and retry logic.",
      "Built a searchable internal web dashboard consolidating stakeholder profiles, company activity, and archived briefings into a single queryable store.",
      "Replaced a 2.5-hour manual briefing process with a 20-minute review workflow; automated daily digest distribution via Telegram bot; secured access with Cloudflare Zero Trust.",
    ],
  },
  {
    role: "DevOps Engineer",
    org: "Luxoft",
    sub: "Hyundai Motors — Infotainment Platform",
    location: "Seongnam, South Korea",
    period: "Feb 2022 — Dec 2022",
    tags: ["Kubernetes", "Jenkins", "Docker", "Grafana", "Prometheus", "Azure", "Bash"],
    highlights: [
      "Owned the CI/CD pipeline for a large-scale vehicle infotainment platform: Jenkins builds, Maven dependency resolution, Docker image builds, and deployments to Kubernetes clusters spanning 20+ physical and cloud nodes.",
      "Designed 10+ Grafana dashboards for build and deployment monitoring; implemented Bash-based alerting integrated with Azure Power Automate.",
      "Made an architecture decision that averted a critical misconfiguration on a 128 GB production server.",
    ],
  },
  {
    role: "Software Application Engineer",
    org: "CSI Vision",
    sub: "",
    location: "Suwon, South Korea",
    period: "Mar 2021 — Jul 2021",
    tags: ["MATLAB", "HDF5", "3D Reconstruction", "Signal Processing", "Interpolation"],
    highlights: [
      "Designed a MATLAB algorithm to reconstruct 3D molecular structures from 2D cross-sectional HDF5 measurement data for the Korea Institute of Materials Science ($20K contract).",
      "Developed interpolation and gap-filling tools to handle missing measurements; validated reconstruction fidelity against reference models and presented progress weekly to client stakeholders.",
    ],
  },
];

const SKILLS: Record<string, string[]> = {
  Languages: ["Python", "C++", "JavaScript", "Bash", "MATLAB"],
  "ML & Perception": [
    "PyTorch",
    "TensorFlow",
    "scikit-learn",
    "OpenCV",
    "YOLOv8",
    "MediaPipe",
    "faster-whisper",
  ],
  "Systems & Backend": [
    "FastAPI",
    "WebSocket",
    "asyncio",
    "SQLite",
    "Docker",
    "Kubernetes (CKA)",
    "Jenkins",
    "Git",
  ],
  "AI & APIs": [
    "OpenAI API",
    "Claude API",
    "LLM Tool-use",
    "NLP Pipelines",
    "Data Visualization",
  ],
  "Cloud & Infra": [
    "Azure",
    "Grafana",
    "Prometheus",
    "InfluxDB",
    "Cloudflare Zero Trust",
  ],
};

const CERTIFICATIONS = [
  { name: "Certified Kubernetes Administrator (CKA)", issuer: "CNCF", year: "2023" },
  { name: "TensorFlow Developer Certificate", issuer: "Google", year: "2021" },
];

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Wiki", href: "/wiki" },
  { label: "Contact", href: "#contact" },
];

// Same 5-color semantic system used by the project categories.
const SKILL_COLORS: Record<string, string> = {
  Languages: "text-slate-300",
  "ML & Perception": "text-cyan-300",
  "Systems & Backend": "text-blue-300",
  "AI & APIs": "text-emerald-300",
  "Cloud & Infra": "text-violet-300",
};

export default function Home() {
  const lastUpdated = getSiteLastUpdated();
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
            djkimlab<span className="text-accent">.com</span>
          </Link>
          <div className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-3 py-1.5 rounded-md border border-card-border text-muted hover:text-foreground hover:border-accent/50 transition-all"
            >
              Resume ↗
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-start">
            <div className="max-w-2xl">
              <p className="text-accent font-mono text-sm mb-4">$ whoami</p>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                Dongjin Kim
              </h1>
              <p className="text-xl leading-relaxed mb-6 text-muted">
                AI & ML Engineer.{" "}
                <span className="text-foreground">
                  Eight small AI systems running on a single laptop in my
                  apartment, fronted by a Cloudflare Tunnel
                </span>
                {" "}— investment ops, medical imaging, agents, RL, NLP.
                <br />
                <span className="text-base">
                  M.S. Computer Science (AI), Georgia Tech ·
                  CKA-certified DevOps background · Toronto, ON.
                </span>
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  "CKA Certified",
                  "TF Developer Cert",
                  "M.S. CS — Georgia Tech",
                  "Toronto, ON · PR",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="text-xs font-mono px-2.5 py-1 rounded-full border border-card-border text-muted"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#projects"
                  className="text-sm px-5 py-2.5 rounded-md bg-accent text-white hover:bg-accent-hover transition-colors font-medium"
                >
                  View Projects
                </Link>
                <a
                  href="https://github.com/dkim3005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-5 py-2.5 rounded-md border border-card-border text-muted hover:text-foreground hover:border-accent/50 transition-all font-medium"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/dongjink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-5 py-2.5 rounded-md border border-card-border text-muted hover:text-foreground hover:border-accent/50 transition-all font-medium"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Terminal card */}
            <div className="hidden lg:block font-mono text-xs bg-card-bg border border-card-border rounded-lg p-5 w-72 shrink-0">
              <div className="flex gap-1.5 mb-4">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <pre className="text-muted leading-relaxed whitespace-pre">
{`{
  `}<span className="text-violet-400">&quot;name&quot;</span>{`: `}<span className="text-emerald-400">&quot;Dongjin Kim&quot;</span>{`,
  `}<span className="text-violet-400">&quot;focus&quot;</span>{`: [
    `}<span className="text-emerald-400">&quot;ML / AI&quot;</span>{`,
    `}<span className="text-emerald-400">&quot;MLOps&quot;</span>{`,
    `}<span className="text-emerald-400">&quot;LLM Pipelines&quot;</span>{`
  ],
  `}<span className="text-violet-400">&quot;location&quot;</span>{`: `}<span className="text-emerald-400">&quot;Toronto, ON&quot;</span>{`,
  `}<span className="text-violet-400">&quot;education&quot;</span>{`: `}<span className="text-emerald-400">&quot;M.S. CS · GT&quot;</span>{`,
  `}<span className="text-violet-400">&quot;certs&quot;</span>{`: [
    `}<span className="text-amber-400">&quot;CKA&quot;</span>{`,
    `}<span className="text-amber-400">&quot;TF Developer&quot;</span>{`
  ],
  `}<span className="text-violet-400">&quot;open_to&quot;</span>{`: `}<span className="text-accent">true</span>{`
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 px-6 border-t border-card-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-mono text-muted uppercase tracking-widest mb-8">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {Object.entries(SKILLS).map(([category, items]) => (
              <div key={category}>
                <h3 className={`text-xs font-mono font-semibold mb-3 ${SKILL_COLORS[category]}`}>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-0.5 rounded bg-card-bg text-muted border border-card-border font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <h3 className="text-xs font-mono font-semibold mb-3 text-rose-300">
                Certifications
              </h3>
              <div className="space-y-1.5">
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.name} className="flex items-center gap-2">
                    <span className="text-accent text-xs">✓</span>
                    <span className="text-xs text-muted font-mono">{cert.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6 border-t border-card-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-2 mb-2">
            <h2 className="text-2xl font-bold">Projects</h2>
            <p className="text-xs font-mono text-muted">
              8 live applications · 2 coursework
            </p>
          </div>
          <p className="text-muted text-sm mb-10">
            End-to-end systems across investment operations, medical AI, agents,
            and reinforcement learning — every live project runs in production.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROJECTS.map((project) => {
              const cat = CATEGORY[project.category] ?? CATEGORY["Coursework"];
              const isLive = project.href !== "#";
              const detailSlug = SLUG_BY_TITLE[project.title];
              const hasDetail = detailSlug && PROJECT_SLUGS.has(detailSlug);
              const cardClass = `group relative flex flex-col rounded-xl border border-card-border bg-card-bg overflow-hidden transition-all duration-200 ${
                hasDetail
                  ? "cursor-pointer hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-black/30"
                  : isLive
                  ? "cursor-pointer hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-black/30"
                  : "opacity-80"
              }`;
              const cardContent = (
                <>
                  {/* Browser-window thumbnail — visual proof without a screenshot */}
                  <div className="relative h-28 overflow-hidden border-b border-card-border">
                    <div className={`absolute inset-0 ${cat.bar} opacity-[0.08]`} />
                    <div
                      className="absolute inset-0 opacity-70"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, rgba(148,163,184,0.09) 1px, transparent 1px)",
                        backgroundSize: "14px 14px",
                      }}
                    />
                    <div className="relative flex items-center gap-1.5 border-b border-card-border/60 bg-background/40 px-3 py-2 backdrop-blur-sm">
                      <span className="h-2 w-2 rounded-full bg-red-500/40" />
                      <span className="h-2 w-2 rounded-full bg-yellow-500/40" />
                      <span className="h-2 w-2 rounded-full bg-green-500/40" />
                      <span className="ml-2 truncate font-mono text-[10px] text-muted">
                        {isLive ? project.href.replace("https://", "") : `coursework · ${project.status}`}
                      </span>
                    </div>
                    <div className="relative flex h-[calc(100%-2rem)] items-center justify-center px-4">
                      <span className={`text-center font-mono text-sm font-bold uppercase tracking-[0.2em] ${cat.watermark}`}>
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded border ${cat.chip}`}
                      >
                        {project.category}
                      </span>
                      {isLive ? (
                        <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Live
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-violet-400">
                          {project.status}
                        </span>
                      )}
                    </div>
                    <h3
                      className={`text-lg font-semibold mb-1.5 transition-colors ${
                        isLive ? "group-hover:text-accent" : ""
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-3">
                      {project.tagline}
                    </p>
                    {project.metric && (
                      <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-accent">
                        {project.metric}
                      </p>
                    )}
                    <p className="text-[13px] text-muted leading-relaxed mb-4 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-background text-muted border border-card-border/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {(hasDetail || isLive) && (
                      <div className="mt-4 pt-3 border-t border-card-border/60 flex items-center justify-between text-xs font-mono">
                        <span className="text-muted">
                          {isLive ? project.href.replace("https://", "") : "case study"}
                        </span>
                        <span className="text-muted group-hover:text-accent transition-colors">
                          {hasDetail ? "Read more →" : "Open ↗"}
                        </span>
                      </div>
                    )}
                  </div>
                </>
              );
              if (hasDetail) {
                return (
                  <Link
                    key={project.title}
                    href={`/projects/${detailSlug}`}
                    className={cardClass}
                  >
                    {cardContent}
                  </Link>
                );
              }
              return isLive ? (
                <a
                  key={project.title}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  {cardContent}
                </a>
              ) : (
                <article key={project.title} className={cardClass}>
                  {cardContent}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20 px-6 border-t border-card-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-10">Experience</h2>
          <div className="divide-y divide-card-border">
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 py-10 first:pt-0">
                <div className="shrink-0">
                  <p className="text-sm font-mono text-accent">{exp.period}</p>
                  <p className="text-xs text-muted mt-1">{exp.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-0.5">{exp.role}</h3>
                  <p className="text-sm text-muted mb-0.5">{exp.org}</p>
                  {exp.sub && (
                    <p className="text-xs text-muted/70 mb-3">{exp.sub}</p>
                  )}
                  {!exp.sub && <div className="mb-3" />}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-0.5 rounded bg-background text-muted border border-card-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ul className="space-y-2">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-muted leading-relaxed flex gap-2">
                        <span className="text-accent shrink-0 mt-0.5">›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-20 px-6 border-t border-card-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-10">Education</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
              <p className="text-sm font-mono text-accent">May 2026</p>
              <div>
                <h3 className="font-semibold">Georgia Institute of Technology</h3>
                <p className="text-sm text-muted">
                  M.S. in Computer Science — Artificial Intelligence specialization
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
              <p className="text-sm font-mono text-accent">2022</p>
              <div>
                <h3 className="font-semibold">Korea National Open University</h3>
                <p className="text-sm text-muted">B.S. in Computer Science</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
              <p className="text-sm font-mono text-accent">2017</p>
              <div>
                <h3 className="font-semibold">Kyung Hee University</h3>
                <p className="text-sm text-muted">B.B.A. in Business Administration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hire CTA */}
      <section id="contact" className="py-20 px-6 border-t border-card-border">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-accent/30 bg-card-bg/60 p-8 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
                  $ status --open-to-work
                </p>
                <h2 className="text-2xl font-bold mb-3">Currently open to</h2>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex gap-2">
                    <span className="text-accent shrink-0 mt-0.5">›</span>
                    <span>
                      <span className="text-foreground">ML / AI Engineer</span> roles —
                      production systems, LLM pipelines, applied research engineering.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent shrink-0 mt-0.5">›</span>
                    <span>
                      <span className="text-foreground">MLOps / AI Infrastructure</span> roles —
                      CKA-certified, comfortable owning the path from train run to serving.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent shrink-0 mt-0.5">›</span>
                    <span>
                      Consulting on shipping working AI systems on a small-team budget.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent shrink-0 mt-0.5">›</span>
                    <span>
                      Based in Toronto, ON (PR) — remote · hybrid · relocation all on the table.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-3 md:items-end md:min-w-[200px]">
                <a
                  href="mailto:djkim3005@gmail.com"
                  className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover text-center"
                >
                  djkim3005@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/dongjink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-card-border px-5 py-2.5 text-sm text-muted hover:text-foreground hover:border-accent/50 transition-all text-center"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="/resume.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-card-border px-5 py-2.5 text-sm text-muted hover:text-foreground hover:border-accent/50 transition-all text-center"
                >
                  Resume ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-card-border mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted font-mono">
            © 2026 Dongjin Kim · Built with Next.js & Tailwind · Last updated {lastUpdated}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/now"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              Now
            </Link>
            <Link
              href="/colophon"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              Colophon
            </Link>
            <a
              href="https://github.com/dkim3005"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/dongjink"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:djkim3005@gmail.com"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
