# Design System Strategy: The Digital Expedition

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Editorial Explorer."** 

This system moves away from the "grid-of-boxes" aesthetic typical of travel booking sites and leans into a high-end, editorial layout reminiscent of a premium travel journal. We achieve this through intentional asymmetry, exaggerated typographic scales, and a "layered landscape" approach to depth. By utilizing wide margins and overlapping elements (e.g., an image bleeding into a text block), we create a sense of motion and adventure while maintaining the rigid reliability of a professional booking platform.

## 2. Colors: Tonal Landscapes
Our palette is rooted in the "Savannah Sunset" (`primary`) and "Jungle Canopy" (`secondary`). We move beyond flat design by using a "No-Line" rule.

*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Structural boundaries must be defined solely through background color shifts. For example, a `surface_container_low` section should sit directly against a `surface` background to create a soft, natural edge.
*   **Surface Hierarchy & Nesting:** Treat the UI as a physical stack of fine paper. 
    *   **Level 0 (Base):** `surface` (#fafaf5)
    *   **Level 1 (Sections):** `surface_container_low` (#f4f4ef)
    *   **Level 2 (Cards/Modules):** `surface_container_lowest` (#ffffff)
*   **The "Glass & Gradient" Rule:** To evoke the hazy horizon of a savannah, use Glassmorphism for floating navigation bars or filter overlays. Apply a `surface` color at 70% opacity with a `20px` backdrop-blur. 
*   **Signature Textures:** Main CTAs should not be flat. Use a subtle linear gradient from `primary` (#ad2c00) to `primary_container` (#d34011) at a 135-degree angle to provide a tactile, sun-drenched "soul."

## 3. Typography: Authority & Legibility
We use a high-contrast pairing to balance the ruggedness of adventure with the precision of a modern booking engine.

*   **Display & Headlines (Epilogue):** We use **Epilogue** for its robust, slightly industrial weight. Large scales (e.g., `display-lg` at 3.5rem) should be used with tight letter-spacing (-0.02em) to feel authoritative and "editorial."
*   **Body & Labels (Inter):** **Inter** provides the "Trustworthy" pillar of the brand. Its tall x-height ensures legibility during high-stress booking moments or on small mobile screens.
*   **Hierarchy Note:** Use `headline-lg` for adventure titles but drop to `label-md` in all-caps with `0.1rem` tracking for categories (e.g., "SAFARI," "TREKKING") to create a sophisticated, labeled-map aesthetic.

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "software-like" for a nature-focused brand. We use atmospheric elevation.

*   **The Layering Principle:** Instead of a shadow, place a `surface_container_highest` (#e3e3de) element inside a `surface_dim` (#dadad5) area to create a "recessed" look for dashboard widgets.
*   **Ambient Shadows:** If an element must float (like a "Book Now" sticky button), use an extra-diffused shadow: `box-shadow: 0 12px 40px rgba(90, 65, 58, 0.08);`. Note the color is a tint of `on_surface_variant`, not pure black.
*   **The "Ghost Border" Fallback:** If a container requires a boundary (e.g., an input field), use the `outline_variant` (#e3beb5) at **20% opacity**. It should be felt, not seen.
*   **Glassmorphism:** Use for mobile bottom sheets. It keeps the user grounded in the "adventure" by letting the vibrant photography of the background bleed through the UI.

## 5. Components: Rugged Precision

### Buttons
*   **Primary:** Gradient of `primary` to `primary_container`. `md` (0.375rem) roundedness. Padding: `1.2rem` (horizontal) / `0.85rem` (vertical).
*   **Secondary:** `secondary_container` background with `on_secondary_container` text. No border.
*   **Tertiary:** Ghost style. `on_surface` text with a subtle `3px` bottom-bar on hover using `primary`.

### Adventure Cards
*   **Structure:** No borders or shadows. Use `surface_container_lowest` for the card body. 
*   **Imagery:** Use a slight "Zoom on Hover" effect. The image should occupy the top 60% of the card with a "tucked" label using `tertiary_container` overlapping the bottom-right corner of the image.

### Input Fields
*   **Style:** Minimalist. A background of `surface_container_highest` with a `2px` bottom-only stroke in `outline_variant`. On focus, the bottom stroke transforms into `primary`.
*   **Spacing:** Use `spacing-3` (1rem) between the label and the input area.

### Dashboards
*   **Layout:** Use a wide sidebar (`surface_container_low`) and a main content area (`surface`). Use a "Masonry" style layout for user stats to break the rigid grid and feel more organic.

### Special Component: "The Compass" (Progress Tracker)
*   For the booking flow, use a horizontal line-less stepper. Completed steps are marked with a `secondary` (Jungle Green) dot, and the current step is a `primary` (Sunset Orange) pulse.

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical margins. A hero image can be offset to the right by `spacing-8` while the text sits flush left.
*   **Do** use `spacing-16` or `spacing-20` for vertical breathing room between major sections to maintain an "expensive" editorial feel.
*   **Do** ensure all touch targets (buttons, chips) are at least `48px` in height for mobile explorers.

### Don't:
*   **Don't** use 100% black text. Always use `on_background` (#1a1c19) or `on_surface_variant` (#5a413a) for a softer, organic feel.
*   **Don't** use "Card-in-Card" layouts with shadows. Use background color shifts (`surface_container` tiers) to nest information.
*   **Don't** use standard "blue" for links. Use `secondary` (green) for success-related links and `primary` (orange) for actions.