/**
 * Shared Honeybadger.AI design tokens for Expo + NativeWind (React Native),
 * keeping mobile apps 100% synchronized with the Next.js web design system.
 */
export const NATIVEWIND_COLORS = {
  background: "#000000",
  surface: "#08090A",
  surface2: "#0F1113",
  foreground: "#FFFFFF",
  muted: "#9AA4A6",
  subtle: "#5C6668",
  primary: "#1DF2E2",
  primaryHover: "#5CF7EC",
  primaryDeep: "#0FB8AA",
  primaryForeground: "#001413",
  border: "rgba(255,255,255,0.08)",
  borderStrong: "rgba(29,242,226,0.35)",
  accentGlow: "rgba(29,242,226,0.25)",
  success: "#34D399",
  warning: "#FBBF24",
  danger: "#F87171",
  info: "#1DF2E2",
} as const;

export const NATIVEWIND_LIGHT_COLORS = {
  background: "#F7FBFB",
  surface: "#FFFFFF",
  surface2: "#EDF6F6",
  foreground: "#05100F",
  muted: "#3D4E50",
  subtle: "#566668",
  primary: "#0A9E92",
  primaryText: "#07756C",
  border: "rgba(0,0,0,0.08)",
} as const;

/** Tuple for `expo-linear-gradient` `<LinearGradient colors={TURQUOISE_GRADIENT.colors} ... />` */
export const TURQUOISE_GRADIENT = {
  colors: ["#1DF2E2", "#0FB8AA"] as const,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
};

/** Skia radial glow parameters for `@shopify/react-native-skia` */
export const SKIA_GLOW = {
  colors: ["rgba(29,242,226,0.25)", "rgba(29,242,226,0)"] as const,
  blurSigma: 24,
};

/** Font family names loaded via `expo-font` + `@expo-google-fonts/*` */
export const EXPO_FONTS = {
  displayMedium: "Montserrat_500Medium",
  displaySemiBold: "Montserrat_600SemiBold",
  displayBold: "Montserrat_700Bold",
  sansRegular: "Inter_400Regular",
  sansMedium: "Inter_500Medium",
  monoRegular: "JetBrainsMono_400Regular",
  monoMedium: "JetBrainsMono_500Medium",
} as const;

/** Drop-in `app.json` splash & Android adaptive icon config */
export const EXPO_BRAND_APP_CONFIG = {
  splash: {
    image: "./assets/brand/mark.png",
    resizeMode: "contain",
    backgroundColor: "#000000",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/brand/mark.png",
      backgroundColor: "#000000",
    },
  },
} as const;

