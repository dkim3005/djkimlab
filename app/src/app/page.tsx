import Link from "next/link";

const PROJECTS = [
  {
    title: "AI News Briefing",
    description:
      "Automated intelligence briefing system. RSS ingestion across 15+ sources, LLM-powered classification and summarization, searchable dashboard with daily digests.",
    tags: ["Python", "Gemini API", "RSS", "FastAPI"],
    status: "Coming Soon",
    href: "/projects/briefing",
  },
  {
    title: "DevOps Infrastructure",
    description:
      "Live visualization of how this site is built and deployed. GitHub Actions build history, Docker container health, server resource monitoring.",
    tags: ["Docker", "GitHub Actions", "Cloudflare Tunnel"],
    status: "Coming Soon",
    href: "/projects/infra",
  },
  {
    title: "ML Trading Lab",
    description:
      "Experimental comparison of rule-based quant strategies vs ML approaches. Q-learning, Random Forest results with interactive charts and honest analysis of limitations.",
    tags: ["Python", "PyTorch", "Reinforcement Learning"],
    status: "Coming Soon",
    href: "/projects/trading",
  },
  {
    title: "Medical AI",
    description:
      "Lung CT/X-ray classification using CNN with Grad-CAM heatmap visualization. FHIR patient data parsing and timeline dashboard.",
    tags: ["PyTorch", "FHIR", "Computer Vision"],
    status: "Coming Soon",
    href: "/projects/medical-ai",
  },
  {
    title: "ML Algorithm Visualizer",
    description:
      "Interactive visualizations of core ML algorithms — Decision Trees, k-Means clustering, PCA dimensionality reduction, SVM decision boundaries.",
    tags: ["TypeScript", "D3.js", "React"],
    status: "Coming Soon",
    href: "/projects/mlviz",
  },
];

const EXPERIENCE = [
  {
    role: "Administrative Officer — Technical Systems",
    company: "Consulate General of the Republic of Korea",
    location: "Toronto, ON",
    period: "Dec 2025 — Present",
    highlights: [
      "Built Python pipeline integrating 15+ government and media sources with LLM APIs, reducing briefing prep from 2 hours to 20 minutes",
      "Deployed searchable dashboard and Telegram distribution workflow for stakeholder briefings",
      "Managed secure rollout with Cloudflare Zero Trust and domain routing",
    ],
  },
  {
    role: "DevOps Engineer",
    company: "Luxoft — Hyundai Motors Infotainment",
    location: "Seongnam, South Korea",
    period: "Feb 2022 — Dec 2022",
    highlights: [
      "Supported CI/CD and observability across Jenkins, Docker, Kubernetes, Grafana, Prometheus",
      "Built 10+ dashboards for build health and infrastructure monitoring",
      "Resolved Kubernetes master-node issue before major outage on 128GB production server",
    ],
  },
];

const SKILLS = {
  "AI / ML": [
    "Gemini API",
    "OpenAI API",
    "TensorFlow",
    "PyTorch",
    "NLP Pipelines",
    "Q-Learning",
    "CNN / RNN",
  ],
  DevOps: [
    "Docker",
    "Kubernetes (CKA)",
    "Jenkins CI/CD",
    "Grafana",
    "Prometheus",
    "GitHub Actions",
  ],
  "Full-Stack": [
    "Python",
    "TypeScript",
    "Next.js",
    "FastAPI",
    "PostgreSQL",
    "REST APIs",
  ],
};

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Wiki", href: "/wiki" },
  { label: "Research", href: "/research" },
];

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
            <Link
              href="/resume.pdf"
              className="text-sm px-3 py-1.5 rounded-md border border-card-border text-muted hover:text-foreground hover:border-accent/50 transition-all"
            >
              Resume
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-accent font-mono text-sm mb-4">Hi, I&apos;m</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Dongjin Kim
            </h1>
            <p className="text-xl text-muted leading-relaxed mb-6">
              AI &amp; Infrastructure Engineer building systems that work.
              <br />
              M.S. Computer Science (AI) at Georgia Tech.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["CKA Certified", "TensorFlow Developer", "Georgia Tech MS CS"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="text-xs font-mono px-2.5 py-1 rounded-full border border-card-border text-muted"
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
            <div className="flex gap-3">
              <Link
                href="#projects"
                className="text-sm px-5 py-2.5 rounded-md bg-accent text-white hover:bg-accent-hover transition-colors font-medium"
              >
                View Projects
              </Link>
              <a
                href="https://github.com/dkim3005/djkimlab"
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
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 px-6 border-t border-card-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {Object.entries(SKILLS).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-mono text-accent mb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 rounded bg-card-bg text-muted border border-card-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6 border-t border-card-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Projects</h2>
          <p className="text-muted mb-10">
            Each project connects to real experience. Click to explore.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROJECTS.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                className="group block p-6 rounded-lg border border-card-border bg-card-bg hover:border-accent/40 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs font-mono text-muted px-2 py-0.5 rounded-full border border-card-border shrink-0 ml-3">
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-background text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20 px-6 border-t border-card-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-10">Experience</h2>
          <div className="space-y-10">
            {EXPERIENCE.map((exp) => (
              <div
                key={exp.company}
                className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4"
              >
                <div>
                  <p className="text-sm font-mono text-accent">{exp.period}</p>
                  <p className="text-xs text-muted mt-1">{exp.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{exp.role}</h3>
                  <p className="text-sm text-muted mb-3">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-muted leading-relaxed flex gap-2">
                        <span className="text-accent shrink-0 mt-1">›</span>
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
              <p className="text-sm font-mono text-accent">Expected May 2026</p>
              <div>
                <h3 className="font-semibold">Georgia Institute of Technology</h3>
                <p className="text-sm text-muted">
                  M.S. in Computer Science — Artificial Intelligence specialization
                </p>
                <p className="text-xs text-muted mt-2">
                  Machine Learning (A) · ML for Trading (A) · Deep Learning · Knowledge-Based AI
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
      <footer className="py-10 px-6 border-t border-card-border">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © 2026 Dongjin Kim. Built with Next.js, Tailwind CSS, and too much coffee.
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
