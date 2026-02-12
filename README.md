# 🐉 Dragon's Arcanum
### The Definitive Archive for D&D Book Comparisons & Reviews

**Dragon's Arcanum** is a high-performance TTRPG platform built to solve the "choice paralysis" in the Dungeons & Dragons community. It moves beyond traditional blogging by utilizing a **Technical Silo Architecture** to provide side-by-side data comparisons, in-depth critiques, and industry news.

---

## 🚀 The Development Experiment: Agentic Automation
This project serves as a live laboratory for **Agentic Web Development**. 
The entire platform is built using a custom autonomous workflow where a Lead Architect (Human) manages an Autonomous Agent (AI) through a strict protocol:

* **State-Machine Tasking**: Managed via a root-level `TASKS.md` that the agent reads, executes, and updates.
* **Atomic Git Flow**: Local development occurs on a `dev` branch with atomic commits for every individual task, ensuring a clean and reversible version history.
* **Real-time Monitoring**: Integrated with `ntfy.sh` to provide mobile push notifications for task completion, deployment readiness, or critical errors.
* **Safety Guardrails**: Implemented a "No-Deletion" policy and a `CLEANUP_PENDING.md` log to ensure human-in-the-loop oversight for all destructive actions.

---

## 🛠 Tech Stack (2026 Standards)
* **Framework**: [Astro 5.0](https://astro.build/) (Utilizing the Content Layer API for type-safe data loading).
* **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) with a custom **Copper & Tradewind** Design System.
* **Interactivity**: [React 19](https://react.dev/) Islands for high-performance selective hydration.
* **Data Integrity**: [Zod](https://zod.dev/) for strict runtime validation of all MDX content collections.
* **Architecture**: Topic Cluster/Silo SEO architecture for maximum topical authority.

---

## 🏛 Architecture & Design
### Silo Structure
The site is organized into four primary content silos to capture specific user intent:
1.  **Adventures**: Modules, campaigns, and one-shots.
2.  **Rulebooks**: Core rules and player expansions.
3.  **Settings**: World guides and lore-heavy sourcebooks.
4.  **Bestiaries**: Dedicated monster books and stat-block collections.