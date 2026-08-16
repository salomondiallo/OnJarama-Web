import { useMemo, useState } from "react";
import { resolveFallbackDayNightMode } from "../utils/solarDayNight";

export type DayNightPreference = "auto" | "day" | "night";
export type DayNightMode = "day" | "night";

export const DAY_NIGHT_STORAGE_KEY = "onjarama-day-night-mode";

export type AutoStrategy = "solar" | "fallback";

function readPreference(): DayNightPreference {
  if (typeof window === "undefined") return "auto";
  const value = window.localStorage.getItem(DAY_NIGHT_STORAGE_KEY);
  return value === "day" || value === "night" || value === "auto" ? value : "auto";
}

export function useDayNightMode(nowMs?: number) {
  const [preference, setPreferenceState] = useState<DayNightPreference>(readPreference);
  const [fallbackNowMs] = useState(() => Date.now());
  const resolvedNowMs = nowMs ?? fallbackNowMs;
  const automaticMode = useMemo<DayNightMode>(
    () => resolveFallbackDayNightMode(new Date(resolvedNowMs)),
    [resolvedNowMs],
  );
  const autoStrategy: AutoStrategy = "fallback";

  const setPreference = (next: DayNightPreference) => {
    setPreferenceState(next);
    window.localStorage.setItem(DAY_NIGHT_STORAGE_KEY, next);
  };

  const mode = useMemo<DayNightMode>(
    () => (preference === "auto" ? automaticMode : preference),
    [automaticMode, preference],
  );

  return { mode, preference, setPreference, autoStrategy };
}
