# djkimlab

Portfolio & technical wiki site at djkimlab.com.

## Stack

- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: FastAPI (AI/ML tasks) + Next.js API Routes (simple CRUD)
- Database: PostgreSQL (TBD)
- Infra: Docker Compose + Cloudflare Tunnel on M1 MacBook Air 8GB
- AI API: Gemini (cost — has credits)
- Language: English only

## Git Workflow

- Never include "Co-Authored-By" lines in commit messages
- Keep commit messages short and concise (one line preferred)
- Always work on feature branches, never commit directly to main
- Branch naming: `feature/description` or `fix/description`
- Create PR for review before merging

## Wiki Rules

- Wiki content lives in `wiki/` directory
- `wiki/topics/` = evergreen technical knowledge (objective, timeless)
- `wiki/decisions/` = Architecture Decision Records with date, status, reasoning
- Templates are in `wiki/templates/`
- When making a new tech choice: suggest creating a decision doc. Do NOT auto-generate — wait for user approval
- When introducing a new library/tool: check if a topics doc exists. If not, suggest creating one

## Code Style

- ESLint + Prettier (Next.js defaults)
- Use functional components, not class components
- Prefer named exports over default exports

## Project Structure

```
wiki/           ← Technical knowledge base (markdown)
  topics/       ← Evergreen knowledge by category
  decisions/    ← Architecture Decision Records
  templates/    ← Document templates
```
