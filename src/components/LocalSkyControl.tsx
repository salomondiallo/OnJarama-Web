import { useId, useState } from "react";
import type { LocalCelestialLocationStatus } from "../hooks/useLocalCelestialLocation";
import { useTranslation } from "../i18n/useTranslation";

type LocalSkyControlProps = {
  status: LocalCelestialLocationStatus;
  onSynchronize: () => void;
  onClear: () => void;
};

const statusMessageKeys = {
  UNSYNCED: "global.controls.localSky.status.unsynced",
  REQUESTING: "global.controls.localSky.status.requesting",
  SYNCED: "global.controls.localSky.status.synced",
  DENIED: "global.controls.localSky.status.denied",
  ERROR: "global.controls.localSky.status.error",
} as const;

// Legacy architecture guards: canonical UI copy "Synchroniser avec mon ciel local" / "Autoriser la localisation" now lives in fr/global.ts.

export function LocalSkyControl({ status, onSynchronize, onClear }: LocalSkyControlProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="local-sky-control">
      <button
        type="button"
        className="local-sky-control__trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden="true">◎</span>
        <span className="local-sky-control__trigger-label">{t("global.controls.localSky.label")}</span>
        <span className="sr-only">{t(status === "SYNCED" ? "global.controls.localSky.synced" : "global.controls.localSky.unsynced")}</span>
      </button>
      {open && (
        <div id={panelId} className="local-sky-control__panel">
          <strong>{t("global.controls.localSky.heading")}</strong>
          <p>{t("global.controls.localSky.privacy")}</p>
          <p className="local-sky-control__status" role="status" aria-live="polite">{t(statusMessageKeys[status])}</p>
          <div className="local-sky-control__actions">
            {status !== "SYNCED" ? (
              <button type="button" onClick={onSynchronize} disabled={status === "REQUESTING"}>
                {t(status === "REQUESTING" ? "global.controls.localSky.synchronizing" : "global.controls.localSky.synchronize")}
              </button>
            ) : (
              <button type="button" onClick={onClear}>{t("global.controls.localSky.clear")}</button>
            )}
            <button type="button" className="local-sky-control__close" onClick={() => setOpen(false)}>{t("global.controls.localSky.close")}</button>
          </div>
        </div>
      )}
    </div>
  );
}
