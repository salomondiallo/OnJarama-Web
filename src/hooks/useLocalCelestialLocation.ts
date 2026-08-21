import { useCallback, useState } from "react";
import { isValidCoordinates, roundToQuarterDegree } from "../lib/astronomicalSky";

export type LocalCelestialLocationStatus = "UNSYNCED" | "REQUESTING" | "SYNCED" | "DENIED" | "ERROR";
export type CoarseCelestialLocation = Readonly<{ latitude: number; longitude: number; version: 1 }>;

export const CELESTIAL_LOCATION_STORAGE_KEY = "onjarama-celestial-location-v1";

const DEVELOPMENT_PREVIEW_LOCATIONS: Record<string, CoarseCelestialLocation> = {
  montreal: Object.freeze({ latitude: 45.5, longitude: -73.5, version: 1 }),
  conakry: Object.freeze({ latitude: 9.5, longitude: -13.75, version: 1 }),
  sydney: Object.freeze({ latitude: -33.75, longitude: 151.25, version: 1 }),
};

function readDevelopmentPreviewLocation(): CoarseCelestialLocation | null {
  if (!import.meta.env.DEV || typeof window === "undefined") return null;
  return DEVELOPMENT_PREVIEW_LOCATIONS[new URLSearchParams(window.location.search).get("celestial-location") ?? ""] ?? null;
}

function readStoredLocation(): CoarseCelestialLocation | null {
  if (typeof window === "undefined") return null;
  try {
    const value = JSON.parse(window.localStorage.getItem(CELESTIAL_LOCATION_STORAGE_KEY) ?? "null") as Partial<CoarseCelestialLocation> | null;
    if (!value || value.version !== 1 || typeof value.latitude !== "number" || typeof value.longitude !== "number") return null;
    if (!isValidCoordinates(value.latitude, value.longitude)) return null;
    if (roundToQuarterDegree(value.latitude) !== value.latitude || roundToQuarterDegree(value.longitude) !== value.longitude) return null;
    return Object.freeze({ latitude: value.latitude, longitude: value.longitude, version: 1 });
  } catch {
    return null;
  }
}

export function useLocalCelestialLocation() {
  const [location, setLocation] = useState<CoarseCelestialLocation | null>(() => readDevelopmentPreviewLocation() ?? readStoredLocation());
  const [status, setStatus] = useState<LocalCelestialLocationStatus>(() => location ? "SYNCED" : "UNSYNCED");

  const synchronize = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("ERROR");
      return;
    }

    setStatus("REQUESTING");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const coarse = Object.freeze({
          latitude: roundToQuarterDegree(coords.latitude),
          longitude: roundToQuarterDegree(coords.longitude),
          version: 1 as const,
        });
        if (!isValidCoordinates(coarse.latitude, coarse.longitude)) {
          setStatus("ERROR");
          return;
        }
        window.localStorage.setItem(CELESTIAL_LOCATION_STORAGE_KEY, JSON.stringify(coarse));
        setLocation(coarse);
        setStatus("SYNCED");
      },
      (error) => {
        setStatus(error.code === error.PERMISSION_DENIED ? "DENIED" : "ERROR");
      },
      { enableHighAccuracy: false, maximumAge: 30 * 60_000, timeout: 10_000 },
    );
  }, []);

  const clear = useCallback(() => {
    window.localStorage.removeItem(CELESTIAL_LOCATION_STORAGE_KEY);
    setLocation(null);
    setStatus("UNSYNCED");
  }, []);

  return { location, status, synchronize, clear } as const;
}
