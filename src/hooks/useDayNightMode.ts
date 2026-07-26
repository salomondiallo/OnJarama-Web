import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  findNextSolarBoundary,
  getNextFallbackBoundary,
  getNextLocalMidnight,
  resolveFallbackDayNightMode,
  resolveSolarDayNightMode,
} from "../utils/solarDayNight";

export type DayNightPreference = "auto" | "day" | "night";
export type DayNightMode = "day" | "night";

export const DAY_NIGHT_STORAGE_KEY = "onjarama-day-night-mode";

export type AutoStrategy = "solar" | "fallback";
type Coordinates = { latitude: number; longitude: number };

function readPreference(): DayNightPreference {
  if (typeof window === "undefined") return "auto";
  const value = window.localStorage.getItem(DAY_NIGHT_STORAGE_KEY);
  return value === "day" || value === "night" || value === "auto" ? value : "auto";
}

export function useDayNightMode() {
  const [preference, setPreferenceState] = useState<DayNightPreference>(readPreference);
  const [automaticMode, setAutomaticMode] = useState<DayNightMode>(() => resolveFallbackDayNightMode(new Date()));
  const [autoStrategy, setAutoStrategy] = useState<AutoStrategy>("fallback");
  const coordinatesRef = useRef<Coordinates | null>(null);
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
    const coordinates = coordinatesRef.current;
    const solarMode = coordinates
      ? resolveSolarDayNightMode(now, coordinates.latitude, coordinates.longitude)
      : null;
    const strategy: AutoStrategy = coordinates && solarMode ? "solar" : "fallback";
    const nextMode = solarMode ?? resolveFallbackDayNightMode(now);
    setAutomaticMode(nextMode);
    setAutoStrategy(strategy);
    timezoneOffsetRef.current = now.getTimezoneOffset();

    const boundary =
      strategy === "solar" && coordinates
        ? findNextSolarBoundary(now, coordinates.latitude, coordinates.longitude)
        : getNextFallbackBoundary(now);
    const nextEvent = Math.min(boundary?.getTime() ?? Number.POSITIVE_INFINITY, getNextLocalMidnight(now).getTime());
    const delay = Math.max(50, Math.min(nextEvent - now.getTime() + 50, 2_147_483_647));
    timerRef.current = window.setTimeout(() => resolveAndScheduleRef.current(), delay);
  }, [clearBoundaryTimer]);

  useEffect(() => {
    resolveAndScheduleRef.current = resolveAndSchedule;
  }, [resolveAndSchedule]);

  const acceptPosition = useCallback((position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
      resolveAndSchedule();
      return;
    }
    coordinatesRef.current = { latitude, longitude };
    resolveAndSchedule();
  }, [resolveAndSchedule]);

  const requestPosition = useCallback(() => {
    if (!navigator.geolocation) {
      resolveAndSchedule();
      return;
    }
    navigator.geolocation.getCurrentPosition(acceptPosition, resolveAndSchedule, {
      enableHighAccuracy: false,
      timeout: 8_000,
      maximumAge: 3 * 60 * 60 * 1_000,
    });
  }, [acceptPosition, resolveAndSchedule]);

  const requestPositionAfterUserAction = useCallback(() => {
    if (!navigator.permissions) {
      requestPosition();
      return;
    }
    void navigator.permissions.query({ name: "geolocation" }).then((status) => {
      if (status.state !== "denied") requestPosition();
      else resolveAndSchedule();
    }).catch(requestPosition);
  }, [requestPosition, resolveAndSchedule]);

  useEffect(() => {
    if (preference !== "auto") {
      clearBoundaryTimer();
      return;
    }
    resolveAndSchedule();
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

    // Querying permission does not display a prompt. Position is read silently only when already granted.
    if (navigator.permissions) {
      void navigator.permissions.query({ name: "geolocation" }).then((status) => {
        if (status.state === "granted") requestPosition();
      }).catch(() => undefined);
    }
    return () => {
      clearBoundaryTimer();
      document.removeEventListener("visibilitychange", resumeWhenVisible);
      window.removeEventListener("focus", resume);
      window.removeEventListener("pageshow", resume);
    };
  }, [clearBoundaryTimer, preference, requestPosition, resolveAndSchedule]);

  const setPreference = (next: DayNightPreference) => {
    const isExplicitAutoRequest = next === "auto" && preference !== "auto";
    setPreferenceState(next);
    window.localStorage.setItem(DAY_NIGHT_STORAGE_KEY, next);
    if (next !== "auto") clearBoundaryTimer();
    else {
      resolveAndSchedule();
      if (!coordinatesRef.current && isExplicitAutoRequest) requestPositionAfterUserAction();
    }
  };

  const mode = useMemo<DayNightMode>(
    () => (preference === "auto" ? automaticMode : preference),
    [automaticMode, preference],
  );

  return { mode, preference, setPreference, autoStrategy };
}
