---
trigger: always_on
---

# The Dragon's Arcanum: Design System (Copper & Tradewind)

## 1. Core Philosophy: "Base & Buffer"
This design system mimics a physical D&D table: parchment, heavy wood, and magical accents.
* **The Anchor**: `Copper-950` (#381c10) is our neutral heavy. It acts as the "ink" and the "wood."
* **The Buffer Rule**: NEVER place `Tradewind` (Teal) elements directly against `Copper` (Orange) elements without a buffer. You MUST use a 1px or 2px `border-copper-950` to separate them and prevent visual vibration.
* **The Canvas**: `Copper-50` is the default background. Avoid pure white (#FFFFFF).

## 2. Tailwind Configuration (Theme Extension)
The agent must configure `tailwind.config.mjs` to include these specific custom colors:
* **Copper Series**: Base hue is earthy orange/brown.
    * `copper-50`: #fbf8ef
    * `copper-100`: #f3ead2
    * `copper-200`: #e6d4a1
    * `copper-300`: #d9ba70
    * `copper-400`: #d0a54f
    * `copper-500`: #c68a3a
    * `copper-600`: #b87333
    * `copper-700`: #92522b
    * `copper-800`: #774229
    * `copper-900`: #633824
    * `copper-950`: #381c10
* **Tradewind Series**: Base hue is magical teal.
    * `tradewind-50`: #f2fbfa
    * `tradewind-100`: #d3f4f0
    * `tradewind-200`: #a7e8e0
    * `tradewind-300`: #74d4cd
    * `tradewind-400`: #43b3ae
    * `tradewind-500`: #2d9f9b
    * `tradewind-600`: #227f7f
    * `tradewind-700`: #1f6566
    * `tradewind-800`: #1d5152
    * `tradewind-900`: #1c4545
    * `tradewind-950`: #0b2628

## 3. Typography Rules
Use these classes strictly for hierarchy to maintain contrast ratios:

| Element | Tailwind Class | Role |
| :--- | :--- | :--- |
| **H1, H2, H3** | `text-copper-950` | Heavy, authoritative contrast against parchment. |
| **Body / P** | `text-copper-800` | Softer contrast for long-form reading (reduces eye strain). |
| **Links / Spans** | `text-tradewind-700` | "Pop" color for interactive text or keywords. |
| **Meta / Date** | `text-copper-500` | De-emphasized info (lower saturation). |

## 4. Component Architecture

### Buttons
* **Normal Button**:
    * Background: `bg-copper-600`
    * Border: `border-2 border-copper-800`
    * Text: `text-white`
    * Hover: `hover:bg-copper-500` (Lighten to simulate metallic glow).
* **Special Button (Sign Up/Launch)**:
    * Background: `bg-tradewind-600`
    * Border: `border-2 border-copper-950` (Buffer Rule applied).
    * Hover: `hover:bg-tradewind-500`.

### Cards (The "Lair" Aesthetic)
Do not use soft, modern drop shadows. Use hard, distinct shadows to mimic rocky terrain.
* **Standard Card**: `bg-white border border-copper-200`.
* **Feature Card**:
    * Background: `bg-copper-50`
    * Border: `border-2 border-copper-950`
    * Shadow: `shadow-[4px_4px_0px_0px_rgba(56,28,16,0.1)]` (Hard shadow using Copper-950 tone).

## 5. Layout & Spacing Guardrails
* **Vibration Control**:
    * NEVER place `text-tradewind-500` on `bg-copper-500`.
    * ALWAYS pair Dark Tradewind (700) with Light Copper (50).
    * ALWAYS pair Dark Copper (950) with Light Tradewind (100).
* **Rhythm**: Use `space-y-20` between major sections to allow the user's eye to reset from the high-contrast colors.