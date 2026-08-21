import { useId, useState } from "react";
import type { LocalCelestialLocationStatus } from "../hooks/useLocalCelestialLocation";

type LocalSkyControlProps = {
  status: LocalCelestialLocationStatus;
  onSynchronize: () => void;
  onClear: () => void;
};

const STATUS_MESSAGES: Record<LocalCelestialLocationStatus, string> = {
  UNSYNCED: "Le mode Auto utilise actuellement les horaires artistiques.",
  REQUESTING: "Demande de localisation en cours…",
  SYNCED: "Le mode Auto est synchronisé avec votre ciel local approximatif.",
  DENIED: "Localisation refusée. Le mode Auto conserve les horaires artistiques.",
  ERROR: "Localisation indisponible. Le mode Auto conserve les horaires artistiques.",
};

export function LocalSkyControl({ status, onSynchronize, onClear }: LocalSkyControlProps) {
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
        <span className="local-sky-control__trigger-label">Ciel local</span>
        <span className="sr-only">{status === "SYNCED" ? "synchronisé" : "non synchronisé"}</span>
      </button>
      {open && (
        <div id={panelId} className="local-sky-control__panel">
          <strong>Synchroniser avec mon ciel local</strong>
          <p>Votre position approximative sert uniquement à placer le Soleil et la Lune. Elle reste enregistrée dans ce navigateur et n’est envoyée nulle part.</p>
          <p className="local-sky-control__status" role="status" aria-live="polite">{STATUS_MESSAGES[status]}</p>
          <div className="local-sky-control__actions">
            {status !== "SYNCED" ? (
              <button type="button" onClick={onSynchronize} disabled={status === "REQUESTING"}>
                {status === "REQUESTING" ? "Synchronisation…" : "Autoriser la localisation"}
              </button>
            ) : (
              <button type="button" onClick={onClear}>Effacer ma localisation</button>
            )}
            <button type="button" className="local-sky-control__close" onClick={() => setOpen(false)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}
