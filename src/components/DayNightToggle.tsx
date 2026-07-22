import type { DayNightPreference } from "../hooks/useDayNightMode";

const OPTIONS: { value: DayNightPreference; label: string; icon: string }[] = [
  { value: "auto", label: "Auto", icon: "◐" },
  { value: "day", label: "Jour", icon: "☀" },
  { value: "night", label: "Nuit", icon: "☾" },
];

type DayNightToggleProps = {
  value: DayNightPreference;
  onChange: (value: DayNightPreference) => void;
};

export function DayNightToggle({ value, onChange }: DayNightToggleProps) {
  return (
    <fieldset className="day-night-toggle" aria-label="Choisir l’ambiance lumineuse">
      <legend className="sr-only">Ambiance lumineuse</legend>
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={value === option.value ? "is-selected" : ""}
          aria-label={`Mode ${option.label.toLowerCase()}`}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          <span aria-hidden="true">{option.icon}</span>
          {option.label}
        </button>
      ))}
    </fieldset>
  );
}
