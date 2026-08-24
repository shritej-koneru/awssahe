# AWS Student Builders Group — SAHE
## Design System & Design Tokens Specification

---

## 1. Color Tokens

### Primary Palette
| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| `color-bg-primary` | `#000000` | Deep pitch black background for pages and main layout |
| `color-bg-elevated` | `#0b0b0b` | Elevated container, navbar, and backdrop background |
| `color-bg-card-dark` | `rgba(13,8,24,0.85)` | Glassmorphic dark card surface with purple tint |
| `color-bg-card-light` | `#f5f5f5` | High-contrast brutalist light panel surface |
| `color-accent-purple` | `#a855f7` | Primary electric purple accent (AWS purple) |
| `color-accent-purple-glow` | `rgba(168,85,247,0.4)`| Spring animations, glow borders, and active shadows |
| `color-fg-primary` | `#ffffff` | Primary text and white heading color |
| `color-fg-muted` | `#d1d5db` (`gray-300`) | Body paragraph text and subheadings |
| `color-fg-subtle` | `rgba(255,255,255,0.7)` | Secondary subtitles, dates, metadata |

---

## 2. Typography Stack

### Font Families
- **Display / Headlines**: `Bebas Neue` (fallback: `Oswald`, `sans-serif`)
  - Defined CSS Variable: `--font-display`
  - Usage: H1, H2, Hero titles, navbar logo, button labels, badge chips.
- **Body / Interface**: `Space Grotesk` (fallback: `system-ui`, `sans-serif`)
  - Defined CSS Variable: `--font-body`
  - Usage: Paragraphs, descriptions, list items, card details, metadata.
- **Monospace / Accents**: `JetBrains Mono` (fallback: `Courier New`, `monospace`)
  - Usage: Terminal codes, tag identifiers, numbers (`01`, `02`), dates.

### Font Scales & Tracking
| Scale | Font Size | Tracking | Usage |
| :--- | :--- | :--- | :--- |
| **Hero Display** | `clamp(3.25rem, 25vw, 10.5rem)` | `-0.04em` | Main hero "BUILD BEYOND" headline |
| **Section H1/H2** | `clamp(2.25rem, 5vw, 3.5rem)` | `0.01em` | Section headings, page titles |
| **Card H3** | `1.3rem` – `1.5rem` | `0.02em` – `0.05em` | Member card titles, activity titles |
| **Body Standard** | `0.95rem` – `1.125rem` | `0.14em` / `1.8` height | Paragraphs, lead text |
| **Badge Tag** | `0.65rem` – `0.75rem` | `0.18em` – `0.25em` | Department pills, role tags |

---

## 3. Surface & Elevation (Neo-Brutalism)

### Hard Shadows & Borders
- **Standard Brutalist Shadow**: `boxShadow: 10px 10px 0 0 #a855f7`
- **Inverted Brutalist Shadow**: `boxShadow: 10px 10px 0 0 #ffffff`
- **White Badge Shadow**: `boxShadow: 6px 6px 0 0 #ffffff`
- **Glow Shadow**: `boxShadow: 0 0 24px rgba(168,85,247,0.4)`
- **Card Border Heavy**: `3px solid #000000` / `3px solid #ffffff`
- **Card Border Subtle**: `1.5px solid rgba(168,85,247,0.35)`

### Motifs & Accents
- **Diamond Marker**: `width: 16px; height: 16px; transform: rotate(45deg); background-color: #a855f7;`
- **Noise Grain Texture**:
  ```css
  .grain-overlay {
    position: fixed;
    inset: -50%;
    width: 200%;
    height: 200%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.028;
    background-image: url("data:image/svg+xml,...");
    animation: grain 0.8s steps(1) infinite;
  }
  ```

---

## 4. Animation & Motion Design Guidelines

All UI interactions utilize Framer Motion with realistic spring physics:
- **Button Hover**: `whileHover={{ scale: 1.05, y: -4, boxShadow: "0 0 24px rgba(168,85,247,0.4)" }}`
- **Card Hover**: `whileHover={{ y: -10, scale: 1.03, rotateZ: 1, boxShadow: "0 20px 40px rgba(168,85,247,0.35)" }}`
- **Spring Transition Standard**: `{ type: "spring", stiffness: 260, damping: 18 }`
- **Scroll Reveal**: Staggered staggerChildren `0.12s`, fade-up `y: 25` to `y: 0`.

---

## 5. UI Component Library Standards

### 1. Section Header Badge
```tsx
<span className="font-display uppercase bg-[#a855f7] text-black border-[3px] border-white shadow-[6px_6px_0_0_#ffffff] px-6 py-2 -rotate-2 text-base tracking-[0.25em] font-bold">
  {"// SECTION NAME"}
</span>
```

### 2. Slide Button
```tsx
<motion.button
  whileHover={{ y: -4, boxShadow: "0 0 24px rgba(168,85,247,0.4)" }}
  className="relative font-display text-lg uppercase bg-[#a855f7] text-black rounded-lg px-8 py-3.5"
>
  Explore →
</motion.button>
```

### 3. Member & Event Card
```tsx
<div className="bg-[#0d0818]/85 backdrop-blur-md border border-[#a855f7]/35 rounded-[14px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
  <div className="h-1 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700" />
  {/* Card content */}
</div>
```

---

*AWS Student Builders Group Design System v1.0*
