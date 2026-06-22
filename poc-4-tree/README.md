# POC 4: React Tree (Non-Visual Baseline)

## Purpose

This POC serves as the **intentional non-visual baseline** for comparison against the visual POCs (SVG, PixiJS, Phaser, 3D). It demonstrates hierarchical navigation using a minimal text/list-based UI without any visual environment, isometric rendering, or scene exploration.

## What This POC Is

- A clean, minimal text/list navigation interface
- Uses standard React components with folder icons
- Demonstrates the same hierarchical navigation pattern as visual POCs
- Provides a control/baseline for comparing "navigation without visual exploration"

## What This POC Is Not

- **Not** a visual environment
- **Not** isometric art or canvas rendering
- **Not** a scene with zoom/pan/transition effects
- **Not** designed for visual exploration

## Navigation

This POC implements the same canonical navigation behavior as all other POCs:

- **Enter**: Navigate into child areas (World → House → Kitchen)
- **Back**: Navigate up the hierarchy
- **Breadcrumbs**: Visual path indicator showing current location
- **Drawer**: Object details panel when selecting items

## Canonical Dataset

Uses the canonical `world.ts` dataset (World → House → Kitchen → Refrigerator) shared across all POCs for fair comparison.

## Tech Stack

- React 19
- TypeScript
- Vite
- No rendering libraries (pure DOM)

## Running

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
npm run lint
```
