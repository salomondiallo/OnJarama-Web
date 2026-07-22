import { useEffect, useMemo, useState } from "react";

export type DayNightPreference = "auto" | "day" | "night";
export type DayNightMode = "day" | "night";

export const DAY_NIGHT_STORAGE_KEY = "onjarama-day-night-mode";

function modeFromHour(date = new Date()): DayNightMode {
  const hour = date.getHours();
  return hour >= 6 && hour < 19 ? "day" : "night";
}

function readPreference(): DayNightPreference {
  if (typeof window === "undefined") return "auto";
  const value = window.localStorage.getItem(DAY_NIGHT_STORAGE_KEY);
  return value === "day" || value === "night" || value === "auto" ? value : "auto";
}

export function useDayNightMode() {
  const [preference, setPreferenceState] = useState<DayNightPreference>(readPreference);
  const [automaticMode, setAutomaticMode] = useState<DayNightMode>(() => modeFromHour());

  useEffect(() => {
    if (preference !== "auto") return;
    const update = () => setAutomaticMode(modeFromHour());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [preference]);

  const setPreference = (next: DayNightPreference) => {
    setPreferenceState(next);
    window.localStorage.setItem(DAY_NIGHT_STORAGE_KEY, next);
  };

  const mode = useMemo<DayNightMode>(
    () => (preference === "auto" ? automaticMode : preference),
    [automaticMode, preference],
  );

  return { mode, preference, setPreference };
}
