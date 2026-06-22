# POC 5: 3D Isometric Navigation with React Three Fiber

This proof-of-concept demonstrates hierarchical navigation using real-time 3D rendering with React Three Fiber and Three.js, featuring an isometric-style camera view.

## Overview

POC 5 explores the high-fidelity end of the technology spectrum by using genuine 3D rendering to create an immersive hierarchical navigation experience. Unlike the 2D approaches (SVG, PixiJS, Phaser), this POC uses real-time 3D with proper lighting, shadows, and depth to match the reference image's aesthetic most closely.

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber
- **Three.js** - 3D graphics library

## Features

- **3D Isometric Camera**: Orthographic camera providing the classic isometric view
- **Hierarchical Navigation**: World → House → Kitchen → Refrigerator
- **Interactive 3D Objects**: Clickable 3D elements with hover affordances
- **Animated Transitions**: Smooth camera zoom and position changes when navigating
- **Real-time Lighting**: Ambient and directional lighting for depth perception
- **Responsive Drawer**: Object details panel matching other POCs

## Scene Structure

### World Scene
- 3D house exterior with roof, door, and windows
- Surrounding environment with grass ground and trees
- Subtle house rotation animation
- Click house to enter

### House Scene
- Interior room with walls, floor, and ceiling
- Kitchen area (clickable) with counter
- Living room area with sofa and coffee table
- Kitchen area has subtle hover animation

### Kitchen Scene
- Detailed kitchen with counter, sink, stove, and table
- **Refrigerator** - The primary interactive object
  - Hover effect with color change and emissive glow
  - Click to open drawer with object details
  - Recognizable 3D geometry (tall box with handle)

## Running the POC

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd poc-5-3d
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Navigation

1. **World View**: Click on the house to enter
2. **House Interior**: Click on the kitchen area (marked with different floor color) to enter
3. **Kitchen**: Click on the refrigerator to view its details in the drawer
4. **Back**: Use the "← Back" button to navigate up the hierarchy

## Implementation Details

### Camera System
- Uses `OrthographicCamera` for isometric projection
- Animated transitions using `useFrame` for smooth interpolation
- Different zoom levels for each area (50 → 80 → 120)

### 3D Objects
- Built with basic Three.js geometries (Box, Cone, Cylinder, Sphere)
- No external 3D models - all geometry is procedural
- Materials use `MeshStandardMaterial` for lighting interaction

### Interactions
- Raycasting handled automatically by React Three Fiber
- `onPointerOver`/`onPointerOut` for hover states
- `onClick` for navigation and object selection

### Performance
- Uses React Three Fiber's efficient reconciliation
- Proper cleanup on unmount
- Suspense boundaries for loading states

## Comparison with Other POCs

| Aspect | POC 1 (SVG) | POC 2 (PixiJS) | POC 3 (Phaser) | POC 4 (Tree) | POC 5 (3D) |
|--------|-------------|---------------|----------------|--------------|------------|
| Rendering | 2D SVG | 2D Canvas | 2D Canvas | Text | 3D WebGL |
| Depth | Simulated | Simulated | Simulated | None | Real |
| Lighting | CSS | None | Basic | None | Real-time |
| Performance | High | High | High | Highest | Medium |
| Fidelity | Low | Medium | Medium | Low | High |
| Bundle Size | Smallest | Small | Medium | Smallest | Largest |

## Acceptance Criteria Met

✅ New `poc-5-3d` project exists, builds, and runs (Vite + React + TS)  
✅ Uses canonical `world.ts` verbatim and supports enter/back hierarchical navigation  
✅ Renders 3D isometric-style scenes with identifiable house, kitchen, and refrigerator  
✅ Refrigerator is clickable 3D object with hover affordance that opens Drawer  
✅ Entering/leaving areas triggers animated camera/scene transitions  
✅ `npm run build` and lint pass with no new errors; 3D context disposes cleanly  

## Future Enhancements

- Add glTF models for more realistic objects
- Implement particle effects for feedback
- Add sound effects for interactions
- Support for mobile touch gestures
- More complex animations and transitions
- Environment mapping for reflections
