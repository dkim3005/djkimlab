import Link from "next/link";

const EMAIL = "djkim3005@gmail.com";
const LINKEDIN = "https://linkedin.com/in/dongjink";
const GITHUB = "https://github.com/dkim3005";

const CREDENTIALS = [
  "M.S. Computer Science (AI) — Georgia Tech",
  "Health Informatics (A)",
  "Certified Kubernetes Administrator",
  "Toronto · Permanent Resident",
];

const IMPACT = [
  { value: "600–800", unit: "min / day", label: "Visitor waiting time removed by a reservation & call system now in daily use" },
  { value: "2.5 h → 20 min", unit: "", label: "Daily briefing turned into a short human review with an LLM pipeline" },
  { value: "~100", unit: "visitors / day", label: "Served through a production system I built, deploy and support" },
  { value: "112k", unit: "X-rays", label: "Chest X-ray triage with explainability and FHIR patient context" },
];

type CaseStudy = {
  tag: string;
  title: string;
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
  links: { label: string; href: string }[];
};

const CASE_STUDIES: CaseStudy[] = [
  {
    tag: "Patient-flow analogue · In production",
    title: "Reservation & call system for a high-traffic service counter",
    problem:
      "About 100 visitors a day queued at the Korean Consulate's busiest counters with no visibility into wait times; staff could not absorb walk-ins and reporting was manual.",
    approach:
      "QR check-in, a live lobby wait-list display, a staff console to call the next visitor with text-to-speech announcements, and integration with the booking system — deployed on Google Cloud, with automated counter-statistics reports.",
    outcome:
      "Removes 600–800 minutes of visitor waiting time per day, reduced wait-time complaints, and replaced hand-built statistics with an automatically generated report.",
    stack: ["Python", "Google Cloud", "Text-to-speech", "vcita API", "Web console"],
    links: [],
  },
  {
    tag: "Medical imaging AI",
    title: "Radiology AI — triage, explainability and search on one model",
    problem:
      "Imaging models are hard to trust if clinicians cannot see why a prediction was made or find similar prior cases.",
    approach:
      "DenseNet121 multi-label triage over NIH ChestX-ray14 (14 findings) with FHIR patient context, Grad-CAM activation maps for each prediction, and CLIP ViT-B/32 semantic image search — three workflows sharing one model.",
    outcome:
      "A working triage worklist with activation maps checked against the dataset's labels and radiologist boxes — and an honest view of where the model agrees and where it does not.",
    stack: ["PyTorch", "DenseNet121", "Grad-CAM", "CLIP", "HL7 FHIR"],
    links: [
      { label: "Try the demo", href: "/projects/radiology/demo" },
      { label: "Case study", href: "/projects/radiology" },
      { label: "Code", href: `${GITHUB}/radiology-ai` },
      { label: "Explainability", href: `${GITHUB}/xai-dashboard` },
    ],
  },
  {
    tag: "Grounded LLM · Evaluated",
    title: "Retrieval-grounded Q&A assistant for public services",
    problem:
      "Staff answer the same procedural questions (passports, notarization, visas) repeatedly, and a general chatbot would invent answers.",
    approach:
      "Hybrid BM25 + embedding retrieval over 216 official bulletin posts, answers constrained to retrieved sources with citations and a disclaimer, plus an evaluation pass before rollout.",
    outcome:
      "Evaluation showed source-data quality — not the model — was the main driver of accuracy, which set the data clean-up plan before public release.",
    stack: ["Python", "FastAPI", "RAG", "BM25 + embeddings", "Evaluation"],
    links: [
      { label: "Case study", href: "/projects/chatbot" },
      { label: "Code", href: `${GITHUB}/chatbot_consulate` },
    ],
  },
  {
    tag: "Operational automation",
    title: "LLM briefing pipeline for leadership",
    problem: "A daily briefing took 2.5 hours of manual reading across ~15 government and news sources.",
    approach:
      "A Python pipeline that ingests the sources, classifies articles by topic, drafts a one-page brief with an LLM, and delivers it to staff up to five times a day with monitoring and retries.",
    outcome: "The task became a 20-minute human review; the person stays in the loop for every brief that goes out.",
    stack: ["Python", "LLM APIs", "NLP", "Telegram", "Cloudflare Zero Trust"],
    links: [],
  },
];

const OTHER_WORK = [
  { title: "Autonomous AI Agent", note: "Plan → act → observe loop with a sandboxed tool runtime", href: "/projects/agent" },
  { title: "Audio Intelligence", note: "Speech → transcript, sentiment and keywords in one pass", href: "/projects/audio" },
  { title: "Reinforcement Learning Lab", note: "DQN control tasks and an AlphaZero-style game arena", href: "/projects/rl" },
  { title: "Responsive Lamp", note: "Gaze tracking + object detection with grounded memory", href: "/projects/lamp" },
  { title: "Investment Operations Suite", note: "Reconciliation, NAV and data-quality monitoring", href: "/projects/ops" },
  { title: "ML Visualizations", note: "Interactive explanations of 18 ML models", href: "/projects/mlviz" },
];

const PRINCIPLES = [
  { title: "Human in the loop", body: "Tools draft, flag and route; people decide. Every system above keeps a person accountable for the final action." },
  { title: "Evaluate before rollout", body: "Measure accuracy and failure modes on real data first — and fix the data when that is the real problem." },
  { title: "Privacy by design", body: "Least-privilege access, no secrets in code, and an awareness of PHIPA-style obligations for health information." },
  { title: "Explainable output", body: "Show sources, activation maps or reasoning traces so users can verify rather than trust blindly." },
];

const EXPERIENCE = [
  {
    role: "Software Developer / Administrative Officer",
    org: "Consulate General of the Republic of Korea in Toronto",
    period: "Dec 2025 — Present",
    points: [
      "Led the office's AI transformation: reservation & call system, public website renewal, grounded Q&A assistant and LLM briefing pipeline.",
      "Operate the systems in production on Google Cloud, including a weekend recovery after an instance failure.",
      "Gather requirements from and train non-technical staff; automated statistics reporting for service counters.",
    ],
  },
  {
    role: "Founder",
    org: "dojito.com — early-stage AI venture",
    period: "Jun 2026 — Present",
    points: ["Rapid prototyping of AI tools (OCR for high-traffic counters, LLM news curation, agentic workflows)."],
  },
  {
    role: "DevOps Engineer",
    org: "Luxoft — Hyundai Motors infotainment platform",
    period: "Feb 2022 — Dec 2022",
    points: [
      "Ran CI/CD (Jenkins, Docker) and Kubernetes deployments across 20+ nodes for a production platform.",
      "Built 10+ Grafana dashboards and alerting; caught a control-plane misconfiguration before it caused an outage.",
    ],
  },
  {
    role: "Software Application Engineer",
    org: "CSI Vision — client: Korea Institute of Materials Science",
    period: "Mar 2021 — Jul 2021",
    points: ["Built a MATLAB pipeline reconstructing 3D molecular structures from large HDF5 datasets."],
  },
  {
    role: "Strategy & Planning Associate",
    org: "DP World",
    period: "Apr 2019 — Jan 2020",
    points: ["Board-facing financial analysis and monthly reporting for the Asia-Pacific office."],
  },
];

const EDUCATION = [
  { school: "Georgia Institute of Technology", degree: "M.S. Computer Science — Artificial Intelligence", year: "2026", note: "Machine Learning (A) · Health Informatics (A) · Information Security (A) · Deep Learning · Knowledge-Based AI (A)" },
  { school: "Korea National Open University", degree: "B.S. Computer Science", year: "2022", note: "" },
  { school: "Kyung Hee University", degree: "B.B.A. Business Administration", year: "2017", note: "" },
];

const CERTS = ["Certified Kubernetes Administrator (CKA), 2023", "TensorFlow Developer Certificate, 2021", "Azure Fundamentals, 2021"];

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <>

      <main className="mx-auto max-w-5xl px-5">
        {/* Hero */}
        <section className="pb-14 pt-16 sm:pt-24">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-card-border bg-card-bg px-3 py-1 text-xs text-muted">
            <span className="h-2 w-2 rounded-full bg-accent" /> Open to healthcare AI & digital health roles in Toronto
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            I build AI systems that give time back to frontline staff and the people they serve.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Healthcare AI &amp; digital health engineer. I take operational problems — queues, repetitive questions, manual
            reporting — and ship grounded, evaluated AI tools that run in production and keep people in the loop.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {CREDENTIALS.map((c) => (
              <li key={c} className="rounded-md border border-card-border bg-card-bg px-3 py-1.5 text-sm">
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover">
              See the work
            </a>
            <a href={LINKEDIN} className="rounded-md border border-card-border bg-card-bg px-5 py-2.5 text-sm font-medium hover:border-accent">
              LinkedIn
            </a>
            <a href={GITHUB} className="rounded-md border border-card-border bg-card-bg px-5 py-2.5 text-sm font-medium hover:border-accent">
              GitHub
            </a>
          </div>
        </section>

        {/* Impact */}
        <section aria-label="Impact" className="grid gap-4 border-y border-card-border py-10 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT.map((m) => (
            <div key={m.label}>
              <p className="text-3xl font-semibold tracking-tight text-accent">
                {m.value} {m.unit && <span className="text-base font-medium text-muted">{m.unit}</span>}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{m.label}</p>
            </div>
          ))}
        </section>

        {/* Case studies */}
        <section id="work" className="scroll-mt-20 py-16">
          <SectionTitle eyebrow="Selected work" title="Problem → approach → outcome" />
          <div className="space-y-6">
            {CASE_STUDIES.map((c) => (
              <article key={c.title} className="rounded-xl border border-card-border bg-card-bg p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">{c.tag}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{c.title}</h3>
                <dl className="mt-5 grid gap-5 sm:grid-cols-3">
                  {(
                    [
                      ["Problem", c.problem],
                      ["Approach", c.approach],
                      ["Outcome", c.outcome],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{k}</dt>
                      <dd className="mt-1.5 text-[15px] leading-relaxed">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <ul className="flex flex-wrap gap-1.5">
                    {c.stack.map((s) => (
                      <li key={s} className="rounded bg-background px-2 py-0.5 text-xs text-muted ring-1 ring-card-border">
                        {s}
                      </li>
                    ))}
                  </ul>
                  {c.links.length > 0 && (
                    <div className="flex gap-4 text-sm font-medium">
                      {c.links.map((l) =>
                        l.href.startsWith("/") ? (
                          <Link key={l.label} href={l.href} className="text-accent hover:underline">
                            {l.label} →
                          </Link>
                        ) : (
                          <a key={l.label} href={l.href} className="text-accent hover:underline">
                            {l.label} →
                          </a>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          <h3 className="mb-4 mt-12 text-sm font-semibold uppercase tracking-wide text-muted">More projects</h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {OTHER_WORK.map((p) => (
              <li key={p.title}>
                <Link href={p.href} className="block h-full rounded-lg border border-card-border bg-card-bg p-4 hover:border-accent">
                  <p className="font-medium">{p.title}</p>
                  <p className="mt-1 text-sm text-muted">{p.note}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Principles */}
        <section id="approach" className="scroll-mt-20 border-t border-card-border py-16">
          <SectionTitle eyebrow="How I build" title="Safe, useful AI for care settings" />
          <div className="grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="rounded-lg border border-card-border bg-card-bg p-5">
                <p className="font-medium">{p.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="scroll-mt-20 border-t border-card-border py-16">
          <SectionTitle eyebrow="Experience" title="Where I've shipped" />
          <ol className="space-y-8">
            {EXPERIENCE.map((e) => (
              <li key={e.org} className="grid gap-2 sm:grid-cols-[180px_1fr] sm:gap-8">
                <p className="text-sm text-muted">{e.period}</p>
                <div>
                  <p className="font-semibold">{e.role}</p>
                  <p className="text-sm text-muted">{e.org}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-relaxed">
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Education */}
        <section className="border-t border-card-border py-16">
          <SectionTitle eyebrow="Education" title="Training & credentials" />
          <ul className="space-y-5">
            {EDUCATION.map((ed) => (
              <li key={ed.school} className="grid gap-1 sm:grid-cols-[180px_1fr] sm:gap-8">
                <p className="text-sm text-muted">{ed.year}</p>
                <div>
                  <p className="font-semibold">{ed.school}</p>
                  <p className="text-sm">{ed.degree}</p>
                  {ed.note && <p className="mt-1 text-sm text-muted">{ed.note}</p>}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">{CERTS.join(" · ")}</p>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20 border-t border-card-border py-16">
          <div className="rounded-xl border border-card-border bg-card-bg p-8 sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight">Let&apos;s talk</h2>
            <p className="mt-3 max-w-2xl text-muted">
              Interested in hospital, research-institute and digital-health teams in Toronto working on applied AI, clinical
              informatics, decision support or the infrastructure behind them.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${EMAIL}`} className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover">
                {EMAIL}
              </a>
              <a href={LINKEDIN} className="rounded-md border border-card-border px-5 py-2.5 text-sm font-medium hover:border-accent">
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

    </>
  );
}
