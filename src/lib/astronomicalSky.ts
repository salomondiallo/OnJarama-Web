import { getMoonIllumination, getMoonPosition, getPosition } from "suncalc";

export type AstronomicalProfile = "STANDARD" | "COMPACT";
export type LocalSkyMode = "DAY" | "NIGHT";
export type AstronomicalMoonPhase =
  | "NEW"
  | "WAXING_CRESCENT"
  | "FIRST_QUARTER"
  | "WAXING_GIBBOUS"
  | "FULL"
  | "WANING_GIBBOUS"
  | "LAST_QUARTER"
  | "WANING_CRESCENT";

export type MoonIlluminationGeometry = Readonly<{
  path: string;
  illuminatedFraction: number;
  brightSide: "LEFT" | "RIGHT" | "FULL" | "NONE";
  points: ReadonlyArray<readonly [number, number]>;
}>;

export type AstronomicalSkyInput = Readonly<{
  timestamp: number;
  latitude: number;
  longitude: number;
  profile: AstronomicalProfile;
}>;

export type AstronomicalSkyState = Readonly<{
  solarAltitude: number;
  solarAzimuth: number;
  sunVisible: boolean;
  sunX: number;
  sunY: number;
  moonAltitude: number;
  moonAzimuth: number;
  moonVisible: boolean;
  moonX: number;
  moonY: number;
  moonIllumination: number;
  moonPhaseValue: number;
  moonPhase: AstronomicalMoonPhase;
  moonOrientation: number;
  moonWaxing: boolean;
  localSkyMode: LocalSkyMode;
  cameraHeading: 0 | 180;
}>;

export const LOCATION_PRECISION_DEGREES = 0.25;
export const HERO_HORIZONTAL_FOV_DEGREES = 180;
export const CIVIL_TWILIGHT_ALTITUDE_DEGREES = -6;
export const CELESTIAL_HORIZON_DEGREES = 0;

const PROFILE_GEOMETRY = {
  STANDARD: { horizonY: 55, skyTopY: 8 },
  COMPACT: { horizonY: 58, skyTopY: 12 },
} as const;

export function roundToQuarterDegree(value: number): number {
  return Math.round(value / LOCATION_PRECISION_DEGREES) * LOCATION_PRECISION_DEGREES;
}

export function isValidCoordinates(latitude: number, longitude: number): boolean {
  return Number.isFinite(latitude) && Number.isFinite(longitude) && Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180;
}

export function normalizeAzimuth(azimuth: number): number {
  return ((azimuth % 360) + 360) % 360;
}

export function shortestSignedAngle(angle: number): number {
  return ((angle + 540) % 360) - 180;
}

export function resolveEquatorFacingHeading(latitude: number): 0 | 180 {
  return latitude >= 0 ? 180 : 0;
}

export function resolveAstronomicalMoonPhase(phase: number): AstronomicalMoonPhase {
  if (phase < 0.03 || phase >= 0.97) return "NEW";
  if (phase < 0.22) return "WAXING_CRESCENT";
  if (phase < 0.28) return "FIRST_QUARTER";
  if (phase < 0.47) return "WAXING_GIBBOUS";
  if (phase < 0.53) return "FULL";
  if (phase < 0.72) return "WANING_GIBBOUS";
  if (phase < 0.78) return "LAST_QUARTER";
  return "WANING_CRESCENT";
}

function mapHorizontalPosition(azimuth: number, heading: number) {
  const delta = shortestSignedAngle(azimuth - heading);
  return {
    visible: Math.abs(delta) <= HERO_HORIZONTAL_FOV_DEGREES / 2,
    x: 50 + (delta / HERO_HORIZONTAL_FOV_DEGREES) * 100,
  };
}

function mapVerticalPosition(altitude: number, profile: AstronomicalProfile) {
  const { horizonY, skyTopY } = PROFILE_GEOMETRY[profile];
  return horizonY - (Math.min(90, Math.max(0, altitude)) / 90) * (horizonY - skyTopY);
}

export function resolveAstronomicalSky(input: AstronomicalSkyInput): AstronomicalSkyState {
  if (!Number.isFinite(input.timestamp) || !isValidCoordinates(input.latitude, input.longitude)) {
    throw new RangeError("Astronomical sky requires a finite timestamp and valid coarse coordinates.");
  }

  const date = new Date(input.timestamp);
  const cameraHeading = resolveEquatorFacingHeading(input.latitude);
  const sun = getPosition(date, input.latitude, input.longitude);
  const moon = getMoonPosition(date, input.latitude, input.longitude);
  const illumination = getMoonIllumination(date);
  const solarAzimuth = normalizeAzimuth(sun.azimuth);
  const moonAzimuth = normalizeAzimuth(moon.azimuth);
  const sunHorizontal = mapHorizontalPosition(solarAzimuth, cameraHeading);
  const moonHorizontal = mapHorizontalPosition(moonAzimuth, cameraHeading);

  return Object.freeze({
    solarAltitude: sun.altitude,
    solarAzimuth,
    sunVisible: sun.altitude > CELESTIAL_HORIZON_DEGREES && sunHorizontal.visible,
    sunX: sunHorizontal.x,
    sunY: mapVerticalPosition(sun.altitude, input.profile),
    moonAltitude: moon.altitude,
    moonAzimuth,
    moonVisible: moon.altitude > CELESTIAL_HORIZON_DEGREES && moonHorizontal.visible && illumination.fraction > 0.005,
    moonX: moonHorizontal.x,
    moonY: mapVerticalPosition(moon.altitude, input.profile),
    moonIllumination: illumination.fraction,
    moonPhaseValue: illumination.phase,
    moonPhase: resolveAstronomicalMoonPhase(illumination.phase),
    moonOrientation: illumination.angle - moon.parallacticAngle,
    moonWaxing: illumination.waxing,
    localSkyMode: sun.altitude > CIVIL_TWILIGHT_ALTITUDE_DEGREES ? "DAY" : "NIGHT",
    cameraHeading,
  });
}

export function buildMoonIlluminationGeometry(phase: number, radius = 14, center = 16): MoonIlluminationGeometry {
  const normalizedPhase = ((phase % 1) + 1) % 1;
  const illuminatedFraction = (1 - Math.cos(2 * Math.PI * normalizedPhase)) / 2;
  if (normalizedPhase < 0.01 || normalizedPhase > 0.99) {
    return Object.freeze({ path: "", illuminatedFraction, brightSide: "NONE", points: Object.freeze([]) });
  }
  if (Math.abs(normalizedPhase - 0.5) < 0.01) {
    const path = `M ${center} ${center - radius} A ${radius} ${radius} 0 1 1 ${center} ${center + radius} A ${radius} ${radius} 0 1 1 ${center} ${center - radius} Z`;
    return Object.freeze({ path, illuminatedFraction: 1, brightSide: "FULL", points: Object.freeze([]) });
  }

  const waxing = normalizedPhase < 0.5;
  const phaseAngle = Math.abs(Math.PI - 2 * Math.PI * normalizedPhase);
  const points: Array<[number, number]> = [];
  const samples = 28;

  for (let index = 0; index <= samples; index += 1) {
    const angle = -Math.PI / 2 + (Math.PI * index) / samples;
    points.push([center + (waxing ? 1 : -1) * radius * Math.cos(angle), center + radius * Math.sin(angle)]);
  }
  for (let index = samples; index >= 0; index -= 1) {
    const y = -radius + (2 * radius * index) / samples;
    const halfWidth = Math.sqrt(Math.max(0, radius * radius - y * y));
    const x = (waxing ? -1 : 1) * Math.cos(phaseAngle) * halfWidth;
    points.push([center + x, center + y]);
  }

  const frozenPoints = Object.freeze(points.map(([x, y]) => Object.freeze([x, y] as const)));
  const path = `${frozenPoints.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`).join(" ")} Z`;
  return Object.freeze({ path, illuminatedFraction, brightSide: waxing ? "RIGHT" : "LEFT", points: frozenPoints });
}

export function buildMoonIlluminationPath(phase: number, radius = 14, center = 16): string {
  return buildMoonIlluminationGeometry(phase, radius, center).path;
}
