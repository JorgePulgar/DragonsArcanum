---
trigger: always_on
---

# The Dragon's Arcanum: Architecture & Silo Standards

## 1. Core Principles
* **Silo Authority**: Content must be strictly organized into Silos (Reviews, Comparisons, News) to build topical authority.
* **Mobile-First**: All layouts must be designed for mobile viewports first, using responsive Tailwind 4.0 utilities.
* **Clean Slugs**: Remove redundant words from URLs (e.g., use `/reviews/adventures/curse-of-strahd` rather than `/reviews/adventures/curse-of-strahd-review`).
* **Performance**: Target 100/100 Lighthouse scores. Use Astro's Zero-JS by default; use React only for interactive islands.

## 2. Technical Stack
* **Framework**: Astro 5.0 (Content Layer API).
* **Styling**: Tailwind CSS 4.0.
* **Components**: React 19 (Islands) + Lucide React (Icons).
* **Data**: MDX for reviews/content with Zod-validated schemas.

## 3. Silo & URL Structure
All routes must follow this physical and logical hierarchy:
* **Reviews Silo**: `/reviews/[category]/[slug]` (Categories: adventures, rulebooks, settings, supplements).
* **Comparisons Silo**: `/comparisons/[category]/[slug]` (Matches categories above).
* **News Silo**: `/news/[category]/[slug]` (Categories: releases, updates, wotc).
* **Guides Silo**: `/guides/[slug]` (High-intent SEO pillars).

## 4. UI/UX Standards (Bento System)
* **Category Hubs**: Must use a **Bento Grid** layout. 
    * Top 3 posts utilize large-span cards (featured).
    * Remaining posts use standard-sized cards in a responsive grid.
* **Clustering**: Visually group related posts (e.g., "Related Adventures") within "Bento Boxes" to minimize white space and improve density.

## 5. Data & SEO Guardrails
* **Zod Schema**: Every content collection MUST have a Zod schema validating metadata (Price, Level Range, Rating, Date).
* **Schema Markup**: Every Review page must generate `Product` and `Review` JSON-LD. Every page must have `BreadcrumbList` JSON-LD.
* **Interlinking**: Automatically link a Review to its relevant Comparison page if the `reference()` exists in the MDX frontmatter.

## 6. Developer Constraints
* **No Hardcoding**: All metadata must be pulled from Content Collections.
* **Asset Optimization**: Use Astro's `<Image />` component for all D&D book covers to ensure WebP/AVIF conversion and lazy loading.
* **Security**: Environment variables (API keys) must never be committed; use `.env` files.