# Git Playground

An interactive web-based learning environment for mastering Git commands, branching strategies, and real-world industry workflows.

## Features

- **Interactive Terminal** — Simulated Git terminal with 20+ commands, command history (arrow keys), and `&&` chaining
- **Live Branch Graph** — Real-time SVG visualization that updates on every repo state change
- **23 Guided Scenarios** — Step-by-step lessons across 5 categories: Fundamentals, Collaboration, Advanced Ops, Rescue & Recovery, Industry Workflows
- **12 Workflow Diagrams** — Visual branch diagrams for GitFlow, GitHub Flow, Trunk-Based, Forking, Stacked PRs, and more
- **Quick Reference** — Click-to-copy cheat sheet for common Git commands
- **Dark/Light Theme** — Full theme system with smooth transitions

## Tech Stack

| Layer      | Technology                                      |
| ---------- | ----------------------------------------------- |
| Framework  | Next.js 14 (App Router)                         |
| Language   | TypeScript (strict mode)                        |
| Styling    | Tailwind CSS v3                                 |
| Animation  | Framer Motion                                   |
| Fonts      | IBM Plex Mono + DM Sans (next/font)             |
| Testing    | Vitest + React Testing Library                  |
| CI         | GitHub Actions                                  |
| Deployment | Static export (Vercel/Netlify/Cloudflare Pages) |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/rizkymashudi/Git-Playground.git
cd Git-Playground

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start development server         |
| `npm run build`        | Production build (static export) |
| `npm run lint`         | Run ESLint                       |
| `npm run format`       | Format with Prettier             |
| `npm run format:check` | Check formatting                 |
| `npm test`             | Run unit tests                   |
| `npm run test:watch`   | Run tests in watch mode          |

## Supported Git Commands

`init` `add` `commit` `status` `log` `branch` `checkout` `switch` `merge` `rebase` `stash` `tag` `remote` `push` `pull` `fetch` `reset` `cherry-pick` `diff` `reflog` `help`

Shell commands: `touch` `clear` `help`

## Project Structure

```
src/
├── app/                    # Next.js App Router (layout, page, styles)
├── components/
│   ├── graph/              # Branch graph SVG visualization
│   ├── layout/             # Header, Footer
│   ├── reference/          # Cheat sheet
│   ├── scenarios/          # Scenario list, progress, hints
│   ├── terminal/           # Terminal, input, line renderer
│   ├── ui/                 # Theme toggle
│   └── workflows/          # Workflow diagrams, cards, comparison
├── data/                   # Scenarios, workflows, cheat sheet data
├── hooks/                  # useGitTerminal, useCommandHistory, useScenario
├── lib/
│   ├── git-engine/         # Pure Git simulation engine
│   │   ├── commands/       # One file per command group
│   │   ├── engine.ts       # Command dispatcher
│   │   ├── types.ts        # Repository, Commit, GitResult
│   │   └── index.ts        # Public API
│   └── theme.ts            # Theme tokens
└── types/                  # Shared TypeScript interfaces
```

## License

MIT
