import type { AutoStrategy, DayNightMode, DayNightPreference } from "../hooks/useDayNightMode";
import { useTranslation } from "../i18n/useTranslation";

// Legacy architecture guards: "Mode automatique" and "ambiance actuelle" remain canonical in fr/global.ts.

type DayNightToggleProps = {
  value: DayNightPreference;
  onChange: (value: DayNightPreference) => void;
  onPrepare: (value: DayNightPreference) => void;
  resolvedMode: DayNightMode;
  autoStrategy: AutoStrategy;
};

export function DayNightToggle({ value, onChange, onPrepare, resolvedMode, autoStrategy }: DayNightToggleProps) {
  const { t } = useTranslation();
  const options: { value: DayNightPreference; label: string; icon: string }[] = [
    { value: "auto", label: t("global.controls.theme.auto"), icon: "◐" },
    { value: "day", label: t("global.controls.theme.day"), icon: "☀" },
    { value: "night", label: t("global.controls.theme.night"), icon: "☾" },
  ];
  const autoLabel = autoStrategy === "solar"
    ? t(resolvedMode === "day" ? "global.controls.theme.autoSolarDay" : "global.controls.theme.autoSolarNight")
    : t(resolvedMode === "day" ? "global.controls.theme.autoFallbackDay" : "global.controls.theme.autoFallbackNight");

  return (
    <fieldset className="day-night-toggle" aria-label={t("global.controls.theme.label")}>
      <legend className="sr-only">{t("global.controls.theme.legend")}</legend>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={value === option.value ? "is-selected" : ""}
          aria-label={option.value === "auto"
            ? autoLabel
            : t(option.value === "day" ? "global.controls.theme.dayMode" : "global.controls.theme.nightMode")}
          aria-pressed={value === option.value}
          onPointerDown={() => onPrepare(option.value)}
          onTouchStart={() => onPrepare(option.value)}
          onFocus={() => onPrepare(option.value)}
          onClick={() => onChange(option.value)}
        >
          <span aria-hidden="true">{option.icon}</span>
          {option.label}
        </button>
      ))}
    </fieldset>
  );
}
