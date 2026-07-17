# Art Direction — Interactive Educational Toy

Shared visual specification for all visual POCs (1 — SVG, 2 — PixiJS, 3 — Phaser, 5 — Three.js/R3F).
POC 4 (React Tree) is the non-visual baseline and is intentionally excluded.

This document is the **single source of truth** for visual style. Every per-POC restyle
issue implements this spec. The machine-readable palette lives in
[`palette.json`](./palette.json) — POCs must consume colors from there (hex strings for
SVG/CSS/Three.js, hex ints for Pixi/Phaser) rather than hard-coding ad-hoc values.

## 1. Concept & References

Every scene should feel like a piece of an **interactive educational toy**: warm,
handcrafted, slightly exaggerated, and instantly readable. A child should be able to
point at any room and name its purpose.

Visual references (tone, not literal copying):

| Reference | What we borrow |
|---|---|
| **Monument Valley** | Clean isometric geometry, flat saturated faces, calm confident color blocking |
| **Unpacking** | Cozy interiors where a handful of objects tell the whole story of a room |
| **Animal Crossing (interiors)** | Rounded, chunky furniture with friendly proportions and warm wood tones |
| **Mini Motorways** | Minimal shapes that stay readable at any size; strong figure/ground contrast |
| **Tiny Glade** | Soft golden-hour lighting, toy-like materials, gentle color gradients |

### Hard rules

- **No placeholder cubes.** A plain untextured box is never an acceptable final object.
  Primitive geometry is allowed only when it is *intentionally stylized*: rounded or
  beveled edges, canonical palette colors, correct face shading, and a silhouette detail
  (handle, leg, knob, roofline) that identifies the object.
- **No raw CSS named colors** (`SkyBlue`, `SaddleBrown`, `SlateGray`, …). Every color
  must come from the canonical palette.
- **One time of day everywhere.** All scenes render the same warm late-afternoon light
  (see §3). No night scenes.

## 2. Canonical Palette

All values are defined in [`palette.json`](./palette.json). Names below are the
canonical keys.

### Core tones

| Name | Hex | Role |
|---|---|---|
| `cream` | `#FFF3E2` | Plaster walls, highlights, appliance bodies |
| `butter` | `#FFD98C` | Warm light fills, lamp glow, sunlit floors |
| `peach` | `#FFB37E` | Secondary warm accent, cushions, rugs |
| `coral` | `#FF8A5C` | Primary warm accent — roofs, doors, stove details |
| `terracotta` | `#D96A45` | Roof/door shadow faces, brick tones |
| `blushPink` | `#F7A8A0` | Soft accent — flowers, mugs, small props |
| `grassLight` | `#A5D96E` | Ground top faces, sunlit grass |
| `grassDark` | `#75B04E` | Ground side faces, grass shadow |
| `leaf` | `#58A45C` | Tree foliage, plants |
| `leafDark` | `#3E7F49` | Foliage shadow faces |
| `woodHoney` | `#D19A62` | Furniture tops, floors — the default wood |
| `woodMid` | `#B07A48` | Wood left faces, plank lines |
| `woodDark` | `#82552F` | Wood right faces, legs, trims |
| `skyDay` | `#AEDCEC` | Sky, exterior backdrop |
| `glass` | `#C4E8E4` | Windows, glass panes (with `cream` frame) |
| `mintAppliance` | `#BFE6D8` | Refrigerator body — retro toy-fridge mint |
| `mintApplianceDark` | `#8FC4AF` | Refrigerator side/shadow faces |
| `steelWarm` | `#C9C2B8` | Sink, stove top, metallic details (warm gray, never blue-gray) |
| `steelWarmDark` | `#948B7F` | Metal shadow faces |
| `tileWarm` | `#F4DFB8` | Kitchen floor tiles (alternate with `cream`) |
| `wallInterior` | `#F9E6C8` | Interior walls |
| `wallInteriorShade` | `#EACDA3` | Interior wall shadow face |
| `ink` | `#5B4A54` | Outlines, text on scene, dark details (warm plum — never pure black) |

### Interaction tones

| Name | Hex | Role |
|---|---|---|
| `hoverGlow` | `#FFC24D` | Shared hover glow/outline across all POCs |
| `selection` | `#FF7E4F` | Active/selected state, click feedback |
| `shadowTint` | `#5B4A54` @ 18% alpha | Contact shadows / ambient occlusion |

> The old per-POC blue accents (`#4299e1`, `#4a90e2`, `#4169E1`) are retired. Warm amber
> (`hoverGlow`) is the single interaction color everywhere.

## 3. Lighting Mood

- **Time of day:** warm late afternoon ("golden hour"), identical in all scenes and POCs.
- **Key light:** from the **upper-left**, slightly warm (tint toward `butter`).
- **Shadows:** soft, tinted with `shadowTint` (warm plum at ~18% alpha) — never pure
  black, never hard-edged.
- **POC 5 (3D):** one warm directional light (upper-left) + soft ambient fill; soft
  shadows enabled; no cold/white point lights.
- **2D POCs:** bake the same light direction into face shading (§5) and add a simple
  elliptical contact shadow under grounded objects.

## 4. Per-Scene Briefs

The canonical hierarchy is **World → House → Kitchen → Refrigerator**
(dataset: `poc-4-tree/src/data/world.ts`).

### 4.1 World

- **Time of day / mood:** golden-hour exterior; calm, inviting, storybook village vibe.
- **Backdrop:** `skyDay` sky, `grassLight`/`grassDark` ground diamond.
- **Mandatory silhouette objects:**
  - The **house** — chunky proportions, oversized `coral`/`terracotta` roof (roof ≈ 45%
    of total house height), `cream` walls, `coral` door with an exaggerated round knob.
  - At least **two trees** — fat rounded `leaf` canopies on short `woodDark` trunks
    (lollipop proportions).
- **Purpose-readers (3–5 objects):** house, trees, a winding `tileWarm` path from the
  scene edge to the door, one or two `leaf` bushes. Optional: tiny clouds in `cream`.
- **Focus:** the house is the only hotspot; nothing may compete with it in size or
  saturation.

### 4.2 House (interior overview)

- **Time of day / mood:** warm afternoon light through windows; lived-in, cozy, softly
  sunlit (`butter` light pools on the floor).
- **Backdrop:** `wallInterior` walls, `woodHoney` plank floor.
- **Mandatory silhouette objects:**
  - A **sofa** with exaggerated rounded arms and fat cushions (`peach`/`blushPink`).
  - A visible **kitchen doorway/area** that clearly previews the kitchen (counter edge +
    a sliver of the mint fridge).
- **Purpose-readers (3–5 objects):** sofa, low round coffee table (`woodHoney`), rug
  (`peach`), window with `glass` panes and `butter` light, kitchen doorway. Optional: a
  potted plant (`leaf` + `terracotta` pot).
- **Focus:** the kitchen area/doorway is the hotspot; it should read as "there's more
  inside here".

### 4.3 Kitchen

- **Time of day / mood:** the brightest, warmest room — cheerful, appetizing, toy-kitchen
  playset feel.
- **Backdrop:** `wallInterior` walls, checkered `tileWarm`/`cream` floor.
- **Mandatory silhouette objects:**
  - The **refrigerator** — the hero object. Retro rounded-corner mint body
    (`mintAppliance`/`mintApplianceDark`), oversized `steelWarm` handle, visible
    freezer/fridge split. It must be the largest and most saturated appliance.
  - A **stove** with chunky knobs (`coral` accents) and round `ink` burners.
- **Purpose-readers (3–5 objects):** refrigerator, stove, counter with sink
  (`woodHoney` + `steelWarm` basin and an exaggerated curved faucet), upper cabinets
  (`cream` doors, `woodDark` knobs). Optional: a small prop on the counter (kettle,
  fruit bowl) in `blushPink`/`butter`.
- **Focus:** the refrigerator is the only object hotspot; the composition should lead
  the eye to it (placement, scale, saturation).

## 5. Isometric Rules

- **Projection:** classic 2:1 isometric — the ground diamond is twice as wide as tall
  (edges at ±26.57° from horizontal). POC 1/2/3 draw faces at this ratio; POC 5 uses an
  **orthographic camera** oriented to match (~35.264° elevation, 45° azimuth).
- **POC 2 note:** flat front-facing rectangles are not acceptable — Pixi scenes must be
  redrawn as true 2:1 isometric faces like POCs 1 and 3.
- **Face shading (light from upper-left):** derive the three faces of any volume from
  its base color:
  - **Top face — lightest:** base lightened ~12%
  - **Left face — base:** the canonical palette color as-is
  - **Right face — darkest:** base darkened ~18%
  - The exact multipliers are exported in `palette.json` (`faceShading`) so all POCs
    derive identical faces.
- **Outlines/edges:** no heavy black outlines. Either (a) no outline — faces separate by
  shading alone (preferred, Monument Valley style), or (b) a thin 1–1.5px `ink` outline
  at 25% alpha on the object's outer silhouette only, never on interior face edges.
  Pick one treatment per POC and use it consistently.
- **Grounding:** every object sitting on the floor gets a soft elliptical `shadowTint`
  contact shadow (or real soft shadows in POC 5).

## 6. Silhouette Rules

Objects are toys, not scale models. Exaggerate:

- **Chunky proportions:** furniture legs, door frames, and counters at ~1.5–2× realistic
  thickness. Nothing thinner than ~4% of the object's width.
- **Oversized functional parts:** handles, knobs, faucets, and buttons at ~1.5–2× scale —
  they are the affordances that explain what an object does.
- **Rounded corners everywhere:** visible corner radius on all boxy objects (fridge,
  sofa, table, cabinets). In POC 5, bevel or round box edges; sharp 90° edges only on
  architecture (walls/floors).
- **Squash the verticals slightly:** furniture a touch shorter and wider than realistic
  proportions reads as friendlier.
- **Readability test:** at 25% zoom, each mandatory object must still be identifiable by
  silhouette alone. If it is not, exaggerate its most characteristic feature further.

## 7. Interaction Affordance Style

One shared hover language across all POCs — **glow + lift**:

- **Idle (discoverability):** interactive elements get a very subtle slow pulse
  (opacity or scale oscillation, ~2s period, ±3%) so hotspots are findable without hunting.
- **Hover:**
  - **Glow:** soft outer glow in `hoverGlow` (blur ≈ 8px equivalent; POC 5 uses
    `hoverGlow` emissive at ~0.35 intensity).
  - **Lift:** the object translates up ~4–6px (or +0.05 units in POC 5) and/or scales to
    1.05×. Contact shadow stays put and softens, selling the lift.
  - **Cursor:** pointer.
  - **Transition:** 150–250ms ease-out, in and out.
- **Click/select:** brief squash-and-stretch (0.95× then overshoot to 1.02×) with the
  outline/glow switching to `selection` before the scene transition starts.
- **Forbidden:** blue tints/outlines, gray `setTint` overlays, invisible hotspots with no
  idle affordance.

## 8. Compliance Checklist (per POC restyle)

- [ ] All colors come from `palette.json` — no ad-hoc hex values or CSS named colors
- [ ] Scene is golden-hour daylight with upper-left key light
- [ ] Face shading follows top-lightest / left-base / right-darkest
- [ ] Mandatory silhouette objects present in each scene (§4)
- [ ] Each room readable at a glance via its 3–5 purpose-reader objects
- [ ] No placeholder cubes; primitives only when intentionally stylized (§1)
- [ ] Hover = warm glow + lift; click = squash-and-stretch (§7)
- [ ] Refrigerator is the visual hero of the Kitchen
