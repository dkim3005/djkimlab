import Link from "next/link";

const PROJECTS = [
  {
    title: "RL Agent Playground",
    description:
      "Watch a DQN agent learn CartPole and Acrobot in real time — reward curves, epsilon decay, and loss streamed live via WebSocket. Configurable hidden size, learning rate, and episode budget with a target-network DQN and replay buffer.",
    tags: ["PyTorch", "Gymnasium", "DQN", "WebSocket", "FastAPI", "Next.js"],
    status: "",
    href: "https://rl.djkimlab.com",
  },
  {
    title: "CLIP Visual Search",
    description:
      "Zero-shot semantic search over a chest X-ray corpus using OpenAI CLIP ViT-B/32. Query by free-text ('cardiomegaly', 'pleural effusion') or upload an image to find visually and semantically similar studies. Cosine similarity ranked results with auto-generated semantic tags.",
    tags: ["CLIP", "ViT-B/32", "FAISS", "Zero-shot", "FastAPI", "Next.js"],
    status: "",
    href: "https://search.djkimlab.com",
  },
  {
    title: "Audio Intelligence",
    description:
      "Upload audio → Whisper tiny transcription with timestamps, sentence-level sentiment via DistilBERT, keyword extraction, and speaking rate. Full NLP pipeline from raw speech to structured analysis report.",
    tags: ["faster-whisper", "DistilBERT", "NLP", "Sentiment", "FastAPI", "Next.js"],
    status: "",
    href: "https://audio.djkimlab.com",
  },
  {
    title: "Explainable AI",
    description:
      "Grad-CAM activation maps and per-class attribution for the DenseNet121 chest X-ray classifier. Shows which image regions drove each pathology prediction — overlaid heatmap, top-5 predictions with confidence bars, and natural-language attention summary.",
    tags: ["Grad-CAM", "Captum", "DenseNet121", "XAI", "PyTorch", "Next.js"],
    status: "",
    href: "https://xai.djkimlab.com",
  },
  {
    title: "Medical AI",
    description:
      "Chest X-ray multi-label classification using DenseNet121 with FHIR-oriented patient and imaging templates. Radiology worklist with AI-assisted triage, confidence band visualization, and FHIR data summaries — no raw JSON exposed.",
    tags: ["PyTorch", "FHIR", "DenseNet121", "Computer Vision", "FastAPI", "Next.js"],
    status: "",
    href: "https://fhir.djkimlab.com",
  },
  {
    title: "Responsive Lamp",
    description:
      "6-DOF virtual desk lamp with real-time gaze tracking via MediaPipe iris landmarks, YOLOv8 object detection, and spatial memory queries answered by GPT-4o-mini grounded in a local visual store.",
    tags: ["MediaPipe", "YOLOv8", "Three.js", "GPT-4o-mini", "WebSocket", "FastAPI"],
    status: "",
    href: "https://lamp.djkimlab.com",
  },
  {
    title: "Quant Trading Platform",
    description:
      "Regime-aware swing trading platform for US equities and ETFs. Multifactor ranking model (trend, momentum, relative strength, accumulation/volume) layered with HMM-based market regime detection, FinBERT sentiment analysis, and FRED macro inputs. Paper trading engine with entry sizing, stop/TP/trailing-stop, and a 15-min scheduled cycle.",
    tags: ["Python", "FastAPI", "HMM", "FinBERT", "FRED", "IBKR", "TimescaleDB", "Streamlit"],
    status: "",
    href: "https://quant.djkimlab.com",
  },
  {
    title: "Consulate Chatbot",
    description:
      "RAG-based civil service chatbot for the Consulate General of Korea in Toronto. Hybrid BM25 + OpenAI embedding search over 216 official bulletin posts (passport, visa, notarization, military service, and more), answered by GPT-4o grounded strictly in official content — with source links and disclaimer.",
    tags: ["Python", "FastAPI", "OpenAI", "RAG", "BM25", "SSE"],
    status: "Korean only",
    href: "https://chatbot.djkimlab.com",
  },
  {
    title: "Deep Learning — CS 7643",
    description:
      "Implemented CNNs, RNNs, and attention mechanisms from scratch in PyTorch for image classification, sequence modelling, and transfer learning. Reproduced foundational architectures and benchmarked against pretrained baselines.",
    tags: ["PyTorch", "CNN", "RNN", "Attention", "Transfer Learning"],
    status: "Georgia Tech",
    href: "#",
  },
  {
    title: "ML for Trading — CS 7646",
    description:
      "Built a full market simulation framework implementing Q-learning and random forest strategy learners. Evaluated portfolio performance using Sharpe ratio, cumulative return, and drawdown against buy-and-hold baselines.",
    tags: ["Python", "Q-Learning", "Random Forest", "Sharpe Ratio", "RL"],
    status: "Georgia Tech",
    href: "#",
  },
];

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
];

const SKILL_COLORS: Record<string, string> = {
  Languages: "text-violet-400",
  "ML & Perception": "text-blue-400",
  "Systems & Backend": "text-emerald-400",
  "AI & APIs": "text-amber-400",
  "Cloud & Infra": "text-rose-400",
};

export default function Home() {
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
              <p className="text-xl text-muted leading-relaxed mb-6">
                AI & ML Engineer building systems that work at production scale.
                <br />
                M.S. Computer Science (AI), Georgia Tech.
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
          <h2 className="text-2xl font-bold mb-2">Projects</h2>
          <p className="text-muted text-sm mb-10">
            Applied ML, CV, and systems work — production and coursework.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROJECTS.map((project) => (
              <a
                key={project.title}
                href={project.href === "#" ? undefined : project.href}
                target={project.href === "#" ? undefined : "_blank"}
                rel={project.href === "#" ? undefined : "noopener noreferrer"}
                className={`group block p-6 rounded-lg border border-card-border bg-card-bg transition-all duration-200 ${
                  project.href !== "#" ? "hover:border-accent/40 cursor-pointer" : "cursor-default"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className={`font-semibold ${project.href !== "#" ? "group-hover:text-accent" : ""} transition-colors`}>
                    {project.title}
                  </h3>
                  {project.status && (
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded-full border shrink-0 ml-3 ${
                        project.status === "Georgia Tech"
                          ? "border-violet-500/30 text-violet-400"
                          : project.status === "Korean only"
                          ? "border-blue-500/30 text-blue-400"
                          : "border-card-border text-muted"
                      }`}
                    >
                      {project.status}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-background text-muted border border-card-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
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

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-card-border mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted font-mono">
            © 2026 Dongjin Kim · Built with Next.js & Tailwind
          </p>
          <div className="flex gap-4">
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
