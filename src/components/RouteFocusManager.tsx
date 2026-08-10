import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function RouteFocusManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const focusRoute = () => {
      const heading = document.querySelector<HTMLElement>("[data-route-heading], #main-content h1");
      const main = document.querySelector<HTMLElement>("#main-content:not([aria-busy='true'])");
      const target = heading ?? main;
      if (!target) return false;
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      return true;
    };

    if (focusRoute()) return;
    const observer = new MutationObserver(() => {
      if (focusRoute()) observer.disconnect();
    });
    observer.observe(document.getElementById("root")!, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
