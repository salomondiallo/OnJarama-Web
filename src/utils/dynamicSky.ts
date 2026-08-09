import type { CelestialPhase } from "./solarDayNight";

export type CloudCover = "CLEAR" | "FEW" | "SCATTERED" | "OVERCAST";
export type Precipitation = "NONE" | "LIGHT_RAIN" | "RAIN";
export type MoonPhase = "CRESCENT" | "QUARTER" | "GIBBOUS" | "FULL";
export type TimeOfDay = "MORNING" | "DAY" | "EVENING" | "NIGHT";
export type Atmosphere = "CLEAR" | "HAZY" | "WET";
export type LightSourceModel = "SOLAR_DIRECTIONAL_LIGHT" | "LUNAR_DIRECTIONAL_LIGHT" | "LANTERN_LOCAL_LIGHT";
export type CelestialSource = "SUN" | "MOON" | "NONE";

export type LightPhysics = {
  primarySource: Exclude<LightSourceModel, "LANTERN_LOCAL_LIGHT">;
  localSource: "LANTERN_LOCAL_LIGHT";
  sourceX: number;
  shadowX: number;
  shadowLength: number;
  directionalIntensity: number;
  cloudTransmission: number;
  moonPhaseIntensity: number;
};

export type DynamicSkyState = {
  timeOfDay: TimeOfDay;
  resolvedDayNightMode: "day" | "night";
  celestialSource: CelestialSource;
  cloudCover: CloudCover;
  precipitation: Precipitation;
  moonPhase: MoonPhase;
  atmosphere: Atmosphere;
};

const CLOUD_CYCLE: CloudCover[] = ["CLEAR", "FEW", "SCATTERED", "FEW", "OVERCAST", "SCATTERED"];

const resolveCelestialSource = (timeOfDay: TimeOfDay): CelestialSource => timeOfDay === "NIGHT" ? "MOON" : "SUN";

const resolveEnvironment = (state: Omit<DynamicSkyState, "resolvedDayNightMode" | "celestialSource">): DynamicSkyState => ({
  ...state,
  resolvedDayNightMode: state.timeOfDay === "NIGHT" ? "night" : "day",
  celestialSource: resolveCelestialSource(state.timeOfDay),
});

export function resolveSkyPreviewMode(search: string, fallback: "day" | "night"): "day" | "night" {
  const preview = new URLSearchParams(search).get("sky-preview");
  if (!preview) return fallback;
  if (["night", "crescent", "quarter", "gibbous", "full", "moon-left", "moon-right", "clear-night-crescent", "clear-night-full", "scattered-night", "overcast-night", "light-rain-night", "rain-night"].includes(preview)) return "night";
  if (["morning", "day", "evening", "solar-morning", "solar-evening", "overcast-day", "light-rain", "rain"].includes(preview)) return "day";
  return fallback;
}

export function resolveMoonPhase(date: Date): MoonPhase {
  const referenceNewMoon = Date.UTC(2000, 0, 6, 18, 14);
  const synodicMonth = 29.530588853;
  const age = ((((date.getTime() - referenceNewMoon) / 86_400_000) % synodicMonth) + synodicMonth) % synodicMonth;
  if (age < 5.5 || age >= 27.5) return "CRESCENT";
  if (age < 10) return "QUARTER";
  if (age < 14 || age >= 17.5) return "GIBBOUS";
  return "FULL";
}

export function resolveInternalDynamicSky(
  date: Date,
  celestialPhase: CelestialPhase,
  manualMode: "day" | "night" | null,
): DynamicSkyState {
  const timeOfDay: TimeOfDay = manualMode
    ? manualMode === "day" ? "DAY" : "NIGHT"
    : celestialPhase.toUpperCase() as TimeOfDay;
  const dayKey = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);

  if (manualMode) {
    return resolveEnvironment({
      timeOfDay,
      cloudCover: manualMode === "day" ? "FEW" : "SCATTERED",
      precipitation: "NONE",
      moonPhase: resolveMoonPhase(date),
      atmosphere: "CLEAR",
    });
  }

  const cloudCover = CLOUD_CYCLE[Math.abs(dayKey) % CLOUD_CYCLE.length];
  const precipitation: Precipitation = dayKey % 17 === 0 ? "RAIN" : dayKey % 7 === 0 ? "LIGHT_RAIN" : "NONE";
  return resolveEnvironment({
    timeOfDay,
    cloudCover,
    precipitation,
    moonPhase: resolveMoonPhase(date),
    atmosphere: precipitation === "NONE" ? (cloudCover === "OVERCAST" ? "HAZY" : "CLEAR") : "WET",
  });
}

export function resolveLightPhysics(state: DynamicSkyState, celestialProgress: number): LightPhysics {
  const phaseIntensity = { CRESCENT: 0.18, QUARTER: 0.4, GIBBOUS: 0.68, FULL: 1 }[state.moonPhase];
  const cloudTransmission = { CLEAR: 1, FEW: 0.86, SCATTERED: 0.66, OVERCAST: 0.28 }[state.cloudCover];
  const sourceX = Math.max(-1, Math.min(1, celestialProgress * 2 - 1));
  const altitude = Math.max(0.18, Math.sin(Math.PI * celestialProgress));
  const isNight = state.timeOfDay === "NIGHT";
  return {
    primarySource: isNight ? "LUNAR_DIRECTIONAL_LIGHT" : "SOLAR_DIRECTIONAL_LIGHT",
    localSource: "LANTERN_LOCAL_LIGHT",
    sourceX,
    shadowX: -sourceX,
    shadowLength: Math.min(2.4, 0.62 / altitude),
    directionalIntensity: cloudTransmission * (isNight ? 0.18 * phaseIntensity : 0.82 + altitude * 0.18),
    cloudTransmission,
    moonPhaseIntensity: phaseIntensity,
  };
}

/** Hidden proof hook for local qualification; it exposes no public controls or network dependency. */
export function applyDynamicSkyPreview(state: DynamicSkyState, search: string): DynamicSkyState {
  const preview = new URLSearchParams(search).get("sky-preview");
  if (!preview) return state;
  const next = { ...state };
  if (["clear", "few", "scattered", "overcast"].includes(preview)) next.cloudCover = preview.toUpperCase() as CloudCover;
  if (preview === "light-rain") Object.assign(next, { timeOfDay: "DAY", precipitation: "LIGHT_RAIN", atmosphere: "WET", cloudCover: "OVERCAST" });
  if (preview === "rain") Object.assign(next, { timeOfDay: "DAY", precipitation: "RAIN", atmosphere: "WET", cloudCover: "OVERCAST" });
  if (preview === "overcast-day") Object.assign(next, { timeOfDay: "DAY", cloudCover: "OVERCAST", precipitation: "NONE", atmosphere: "HAZY" });
  if (preview === "overcast-night") Object.assign(next, { timeOfDay: "NIGHT", cloudCover: "OVERCAST", precipitation: "NONE", atmosphere: "HAZY" });
  if (["crescent", "quarter", "gibbous", "full"].includes(preview)) {
    next.moonPhase = preview.toUpperCase() as MoonPhase;
    next.timeOfDay = "NIGHT";
  }
  if (["morning", "day", "evening", "night"].includes(preview)) next.timeOfDay = preview.toUpperCase() as TimeOfDay;
  if (preview === "solar-morning") Object.assign(next, { timeOfDay: "MORNING", cloudCover: "CLEAR", precipitation: "NONE", atmosphere: "CLEAR" });
  if (preview === "solar-evening") Object.assign(next, { timeOfDay: "EVENING", cloudCover: "CLEAR", precipitation: "NONE", atmosphere: "CLEAR" });
  if (preview === "moon-left" || preview === "moon-right") next.timeOfDay = "NIGHT";
  if (preview === "clear-night-crescent") Object.assign(next, { timeOfDay: "NIGHT", cloudCover: "CLEAR", precipitation: "NONE", atmosphere: "CLEAR", moonPhase: "CRESCENT" });
  if (preview === "clear-night-full") Object.assign(next, { timeOfDay: "NIGHT", cloudCover: "CLEAR", precipitation: "NONE", atmosphere: "CLEAR", moonPhase: "FULL" });
  if (preview === "scattered-night") Object.assign(next, { timeOfDay: "NIGHT", cloudCover: "SCATTERED", precipitation: "NONE", atmosphere: "CLEAR" });
  if (preview === "light-rain-night") Object.assign(next, { timeOfDay: "NIGHT", cloudCover: "OVERCAST", precipitation: "LIGHT_RAIN", atmosphere: "WET" });
  if (preview === "rain-night") Object.assign(next, { timeOfDay: "NIGHT", cloudCover: "OVERCAST", precipitation: "RAIN", atmosphere: "WET" });
  return resolveEnvironment(next);
}
