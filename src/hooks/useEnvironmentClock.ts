import { useCallback, useEffect, useState } from "react";

const ENVIRONMENT_CLOCK_INTERVAL_MS = 60_000;

export function useEnvironmentClock(): number {
  const [nowMs, setNowMs] = useState(() => Date.now());
  const refresh = useCallback(() => setNowMs(Date.now()), []);

  useEffect(() => {
    const timer = window.setInterval(refresh, ENVIRONMENT_CLOCK_INTERVAL_MS);
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };

    document.addEventListener("visibilitychange", refreshWhenVisible);
    window.addEventListener("focus", refresh);
    window.addEventListener("pageshow", refresh);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("pageshow", refresh);
    };
  }, [refresh]);

  return nowMs;
}
