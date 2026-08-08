import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getNextFallbackBoundary, getNextLocalMidnight, resolveFallbackDayNightMode } from "../utils/solarDayNight";

export type DayNightPreference = "auto" | "day" | "night";
export type DayNightMode = "day" | "night";

export const DAY_NIGHT_STORAGE_KEY = "onjarama-day-night-mode";

export type AutoStrategy = "solar" | "fallback";

function readPreference(): DayNightPreference {
  if (typeof window === "undefined") return "auto";
  const value = window.localStorage.getItem(DAY_NIGHT_STORAGE_KEY);
  return value === "day" || value === "night" || value === "auto" ? value : "auto";
}

export function useDayNightMode() {
  const [preference, setPreferenceState] = useState<DayNightPreference>(readPreference);
  const [automaticMode, setAutomaticMode] = useState<DayNightMode>(() => resolveFallbackDayNightMode(new Date()));
  const [autoStrategy, setAutoStrategy] = useState<AutoStrategy>("fallback");
  const timerRef = useRef<number | null>(null);
  const resolveAndScheduleRef = useRef<() => void>(() => undefined);
  const timezoneOffsetRef = useRef(new Date().getTimezoneOffset());

  const clearBoundaryTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resolveAndSchedule = useCallback(() => {
    clearBoundaryTimer();
    const now = new Date();
    const strategy: AutoStrategy = "fallback";
    const nextMode = resolveFallbackDayNightMode(now);
    setAutomaticMode(nextMode);
    setAutoStrategy(strategy);
    timezoneOffsetRef.current = now.getTimezoneOffset();

    const boundary = getNextFallbackBoundary(now);
    const nextEvent = Math.min(boundary?.getTime() ?? Number.POSITIVE_INFINITY, getNextLocalMidnight(now).getTime());
    const delay = Math.max(50, Math.min(nextEvent - now.getTime() + 50, 2_147_483_647));
    timerRef.current = window.setTimeout(() => resolveAndScheduleRef.current(), delay);
  }, [clearBoundaryTimer]);

  useEffect(() => {
    resolveAndScheduleRef.current = resolveAndSchedule;
  }, [resolveAndSchedule]);

  useEffect(() => {
    if (preference !== "auto") {
      clearBoundaryTimer();
      return;
    }
    queueMicrotask(resolveAndSchedule);
    const resume = () => {
      const timezoneChanged = timezoneOffsetRef.current !== new Date().getTimezoneOffset();
      if (timezoneChanged) clearBoundaryTimer();
      resolveAndSchedule();
    };
    const resumeWhenVisible = () => {
      if (document.visibilityState === "visible") resume();
    };
    document.addEventListener("visibilitychange", resumeWhenVisible);
    window.addEventListener("focus", resume);
    window.addEventListener("pageshow", resume);

    return () => {
      clearBoundaryTimer();
      document.removeEventListener("visibilitychange", resumeWhenVisible);
      window.removeEventListener("focus", resume);
      window.removeEventListener("pageshow", resume);
    };
  }, [clearBoundaryTimer, preference, resolveAndSchedule]);

  const setPreference = (next: DayNightPreference) => {
    setPreferenceState(next);
    window.localStorage.setItem(DAY_NIGHT_STORAGE_KEY, next);
    if (next !== "auto") clearBoundaryTimer();
    else {
      resolveAndSchedule();
    }
  };

  const mode = useMemo<DayNightMode>(
    () => (preference === "auto" ? automaticMode : preference),
    [automaticMode, preference],
  );

  return { mode, preference, setPreference, autoStrategy };
}
