export const colors = {
  cream: "#FFF3E2",
  butter: "#FFD98C",
  peach: "#FFB37E",
  coral: "#FF8A5C",
  terracotta: "#D96A45",
  blushPink: "#F7A8A0",
  grassLight: "#A5D96E",
  grassDark: "#75B04E",
  leaf: "#58A45C",
  leafDark: "#3E7F49",
  woodHoney: "#D19A62",
  woodMid: "#B07A48",
  woodDark: "#82552F",
  skyDay: "#AEDCEC",
  glass: "#C4E8E4",
  mintAppliance: "#BFE6D8",
  mintApplianceDark: "#8FC4AF",
  steelWarm: "#C9C2B8",
  steelWarmDark: "#948B7F",
  tileWarm: "#F4DFB8",
  wallInterior: "#F9E6C8",
  wallInteriorShade: "#EACDA3",
  ink: "#5B4A54"
} as const;

export type PaletteColor = keyof typeof colors;

export const interaction = {
  hoverGlow: "#FFC24D",
  selection: "#FF7E4F",
  shadowTint: "#5B4A54",
  shadowTintAlpha: 0.18
} as const;

export const faceShading = {
  description:
    "Lightness multipliers for isometric volume faces, key light from upper-left. top = base lightened, left = base as-is, right = base darkened.",
  top: 1.12,
  left: 1.0,
  right: 0.82
} as const;

export const palette = {
  colors,
  interaction,
  faceShading
} as const;
