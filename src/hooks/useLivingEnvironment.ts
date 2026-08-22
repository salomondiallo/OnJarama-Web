import { useEffect, useMemo, useState } from "react";
import { useDayNightMode, type AutoStrategy } from "./useDayNightMode";
import { useEnvironmentClock } from "./useEnvironmentClock";
import { useLocalCelestialLocation } from "./useLocalCelestialLocation";
import { resolveInternalDynamicSky, type DynamicSkyState } from "../utils/dynamicSky";
import { resolveLocalCelestialState, type CelestialPhase } from "../utils/solarDayNight";
import { resolveAstronomicalSky, type AstronomicalSkyState } from "../lib/astronomicalSky";

function resolvePresentationMoonPhase(phase: AstronomicalSkyState["moonPhase"]): DynamicSkyState["moonPhase"] {
  if (phase === "FULL") return "FULL";
  if (phase === "FIRST_QUARTER" || phase === "LAST_QUARTER") return "QUARTER";
  if (phase === "WAXING_GIBBOUS" || phase === "WANING_GIBBOUS") return "GIBBOUS";
  return "CRESCENT";
}

export type EnvironmentPerformanceProfile = "STANDARD" | "COMPACT";

export type LivingEnvironmentState = Readonly<{
  nowMs: number;
  preference: ReturnType<typeof useDayNightMode>["preference"];
  resolvedMode: ReturnType<typeof useDayNightMode>["mode"];
  autoStrategy: AutoStrategy;
  setPreference: ReturnType<typeof useDayNightMode>["setPreference"];
  celestialPhase: CelestialPhase;
  celestialProgress: number;
  dynamicSkyState: DynamicSkyState;
  astronomicalSky: AstronomicalSkyState | null;
  locationStatus: ReturnType<typeof useLocalCelestialLocation>["status"];
  synchronizeLocation: ReturnType<typeof useLocalCelestialLocation>["synchronize"];
  clearLocation: ReturnType<typeof useLocalCelestialLocation>["clear"];
  reducedMotion: boolean;
  performanceProfile: EnvironmentPerformanceProfile;
}>;

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function useLivingEnvironment(): LivingEnvironmentState {
  const nowMs = useEnvironmentClock();
  const dayNight = useDayNightMode(nowMs);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const compactViewport = useMediaQuery("(max-width: 768px)");
  const localLocation = useLocalCelestialLocation();

  return useMemo(() => {
    const now = new Date(nowMs);
    const performanceProfile = compactViewport ? "COMPACT" as const : "STANDARD" as const;
    const astronomicalSky = dayNight.preference === "auto" && localLocation.location
      ? resolveAstronomicalSky({ timestamp: nowMs, ...localLocation.location, profile: performanceProfile })
      : null;
    const resolvedMode = astronomicalSky ? astronomicalSky.localSkyMode.toLowerCase() as "day" | "night" : dayNight.mode;
    const celestial = astronomicalSky
      ? { phase: resolvedMode === "day" ? "day" as const : "night" as const, progress: 0.5 }
      : dayNight.preference === "auto"
      ? resolveLocalCelestialState(now)
      : { phase: dayNight.mode === "day" ? "day" as const : "night" as const, progress: 0.5 };
    const baselineDynamicSky = resolveInternalDynamicSky(
      now,
      celestial.phase,
      dayNight.preference === "auto" ? null : resolvedMode,
    );
    const dynamicSkyState = astronomicalSky
      ? Object.freeze({ ...baselineDynamicSky, moonPhase: resolvePresentationMoonPhase(astronomicalSky.moonPhase) })
      : baselineDynamicSky;

    return Object.freeze({
      nowMs,
      preference: dayNight.preference,
      resolvedMode,
      autoStrategy: astronomicalSky ? "solar" as const : dayNight.autoStrategy,
      setPreference: dayNight.setPreference,
      celestialPhase: celestial.phase,
      celestialProgress: celestial.progress,
      dynamicSkyState,
      astronomicalSky,
      locationStatus: localLocation.status,
      synchronizeLocation: localLocation.synchronize,
      clearLocation: localLocation.clear,
      reducedMotion,
      performanceProfile,
    });
  }, [compactViewport, dayNight, localLocation, nowMs, reducedMotion]);
}
