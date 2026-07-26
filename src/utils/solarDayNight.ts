export type SolarMode = "day" | "night";
export type SolarCondition = "normal" | "polar-day" | "polar-night" | "invalid";

export type CivilTwilight = {
  dawn: Date | null;
  dusk: Date | null;
  condition: SolarCondition;
};

const DAY_MS = 86_400_000;
const RAD = Math.PI / 180;
const JULIAN_UNIX_EPOCH = 2_440_588;
const JULIAN_J2000 = 2_451_545;
const CIVIL_TWILIGHT_ALTITUDE = -6 * RAD;

const toJulian = (date: Date) => date.getTime() / DAY_MS - 0.5 + JULIAN_UNIX_EPOCH;
const fromJulian = (julian: number) => new Date((julian + 0.5 - JULIAN_UNIX_EPOCH) * DAY_MS);
const toDays = (date: Date) => toJulian(date) - JULIAN_J2000;

function validCoordinates(latitude: number, longitude: number) {
  return Number.isFinite(latitude) && Number.isFinite(longitude) && Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180;
}

/** Calculates local civil dawn/dusk, when the solar centre crosses −6°. */
export function calculateCivilTwilight(date: Date, latitude: number, longitude: number): CivilTwilight {
  if (!Number.isFinite(date.getTime()) || !validCoordinates(latitude, longitude)) {
    return { dawn: null, dusk: null, condition: "invalid" };
  }

  const lw = -longitude * RAD;
  const phi = latitude * RAD;
  // The nearest solar cycle is derived from the absolute instant and longitude,
  // so fixed-offset tests and real visitors in either hemisphere behave alike.
  const days = toDays(date);
  const cycle = Math.round(days - 0.0009 - lw / (2 * Math.PI));
  const solarNoonApproximation = 0.0009 + (lw / (2 * Math.PI)) + cycle;
  const meanAnomaly = (357.5291 + 0.98560028 * solarNoonApproximation) * RAD;
  const equationOfCenter =
    (1.9148 * Math.sin(meanAnomaly) + 0.02 * Math.sin(2 * meanAnomaly) + 0.0003 * Math.sin(3 * meanAnomaly)) * RAD;
  const eclipticLongitude = meanAnomaly + equationOfCenter + 102.9372 * RAD + Math.PI;
  const solarDeclination = Math.asin(Math.sin(eclipticLongitude) * Math.sin(23.4397 * RAD));
  const solarTransit =
    JULIAN_J2000 +
    solarNoonApproximation +
    0.0053 * Math.sin(meanAnomaly) -
    0.0069 * Math.sin(2 * eclipticLongitude);
  const cosineHourAngle =
    (Math.sin(CIVIL_TWILIGHT_ALTITUDE) - Math.sin(phi) * Math.sin(solarDeclination)) /
    (Math.cos(phi) * Math.cos(solarDeclination));

  if (!Number.isFinite(cosineHourAngle)) return { dawn: null, dusk: null, condition: "invalid" };
  if (cosineHourAngle < -1) return { dawn: null, dusk: null, condition: "polar-day" };
  if (cosineHourAngle > 1) return { dawn: null, dusk: null, condition: "polar-night" };

  const hourAngle = Math.acos(cosineHourAngle);
  const duskJulian = solarTransit + hourAngle / (2 * Math.PI);
  const dawnJulian = solarTransit - hourAngle / (2 * Math.PI);
  const dawn = fromJulian(dawnJulian);
  const dusk = fromJulian(duskJulian);
  if (!Number.isFinite(dawn.getTime()) || !Number.isFinite(dusk.getTime())) {
    return { dawn: null, dusk: null, condition: "invalid" };
  }
  return { dawn, dusk, condition: "normal" };
}

export function resolveSolarDayNightMode(date: Date, latitude: number, longitude: number): SolarMode | null {
  const twilight = calculateCivilTwilight(date, latitude, longitude);
  if (twilight.condition === "polar-day") return "day";
  if (twilight.condition === "polar-night") return "night";
  if (!twilight.dawn || !twilight.dusk) return null;
  return date >= twilight.dawn && date < twilight.dusk ? "day" : "night";
}

export function resolveFallbackDayNightMode(date: Date): SolarMode {
  const hour = date.getHours();
  return hour >= 6 && hour < 19 ? "day" : "night";
}

export function getNextLocalMidnight(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
}

export function getNextFallbackBoundary(date: Date) {
  const next = new Date(date);
  if (date.getHours() < 6) next.setHours(6, 0, 0, 0);
  else if (date.getHours() < 19) next.setHours(19, 0, 0, 0);
  else {
    next.setDate(next.getDate() + 1);
    next.setHours(6, 0, 0, 0);
  }
  return next;
}

export function findNextSolarBoundary(date: Date, latitude: number, longitude: number): Date | null {
  for (let offset = 0; offset <= 2; offset += 1) {
    const candidateDate = new Date(date.getTime() + offset * DAY_MS);
    const { dawn, dusk, condition } = calculateCivilTwilight(candidateDate, latitude, longitude);
    if (condition === "invalid") return null;
    for (const boundary of [dawn, dusk]) {
      if (boundary && boundary.getTime() > date.getTime()) return boundary;
    }
  }
  return null;
}
