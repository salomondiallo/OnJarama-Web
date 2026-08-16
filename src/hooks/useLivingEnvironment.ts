import { useEffect, useMemo, useState } from "react";
import { useDayNightMode } from "./useDayNightMode";
import { useEnvironmentClock } from "./useEnvironmentClock";
import { resolveInternalDynamicSky, type DynamicSkyState } from "../utils/dynamicSky";
import { resolveLocalCelestialState, type CelestialPhase } from "../utils/solarDayNight";

export type EnvironmentPerformanceProfile = "STANDARD" | "COMPACT";

export type LivingEnvironmentState = Readonly<{
  nowMs: number;
  preference: ReturnType<typeof useDayNightMode>["preference"];
  resolvedMode: ReturnType<typeof useDayNightMode>["mode"];
  autoStrategy: ReturnType<typeof useDayNightMode>["autoStrategy"];
  setPreference: ReturnType<typeof useDayNightMode>["setPreference"];
  celestialPhase: CelestialPhase;
  celestialProgress: number;
  dynamicSkyState: DynamicSkyState;
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
  const compactViewport = useMediaQuery("(max-width: 767px)");

  return useMemo(() => {
    const now = new Date(nowMs);
    const celestial = dayNight.preference === "auto"
      ? resolveLocalCelestialState(now)
      : { phase: dayNight.mode === "day" ? "day" as const : "night" as const, progress: 0.5 };

    return Object.freeze({
      nowMs,
      preference: dayNight.preference,
      resolvedMode: dayNight.mode,
      autoStrategy: dayNight.autoStrategy,
      setPreference: dayNight.setPreference,
      celestialPhase: celestial.phase,
      celestialProgress: celestial.progress,
      dynamicSkyState: resolveInternalDynamicSky(
        now,
        celestial.phase,
        dayNight.preference === "auto" ? null : dayNight.mode,
      ),
      reducedMotion,
      performanceProfile: compactViewport ? "COMPACT" as const : "STANDARD" as const,
    });
  }, [compactViewport, dayNight, nowMs, reducedMotion]);
}
