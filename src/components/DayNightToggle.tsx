import type { AutoStrategy, DayNightMode, DayNightPreference } from "../hooks/useDayNightMode";

const OPTIONS: { value: DayNightPreference; label: string; icon: string }[] = [
  { value: "auto", label: "Auto", icon: "◐" },
  { value: "day", label: "Jour", icon: "☀" },
  { value: "night", label: "Nuit", icon: "☾" },
];

type DayNightToggleProps = {
  value: DayNightPreference;
  onChange: (value: DayNightPreference) => void;
  onPrepare: (value: DayNightPreference) => void;
  resolvedMode: DayNightMode;
  autoStrategy: AutoStrategy;
};

export function DayNightToggle({ value, onChange, onPrepare, resolvedMode, autoStrategy }: DayNightToggleProps) {
  return (
    <fieldset className="day-night-toggle" aria-label="Choisir l’ambiance lumineuse">
      <legend className="sr-only">Ambiance lumineuse</legend>
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={value === option.value ? "is-selected" : ""}
          aria-label={option.value === "auto"
            ? `Mode automatique ${autoStrategy === "solar" ? "solaire" : "avec horaires de secours"}, ambiance actuelle : ${resolvedMode === "day" ? "jour" : "nuit"}`
            : `Mode ${option.label.toLowerCase()}`}
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
