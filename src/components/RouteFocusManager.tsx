import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function RouteFocusManager() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const scrollImmediately = (scroll: () => void) => {
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      scroll();
      root.style.scrollBehavior = previousScrollBehavior;
    };

    const scrollToDestination = () => {
      if (!hash) {
        scrollImmediately(() => window.scrollTo({ top: 0, left: 0 }));
        return true;
      }
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return false;
      scrollImmediately(() => target.scrollIntoView({ block: "start" }));
      return true;
    };

    const observer = new MutationObserver(() => {
      if (scrollToDestination()) observer.disconnect();
    });
    if (!scrollToDestination()) {
      observer.observe(document.getElementById("root")!, { childList: true, subtree: true });
    }

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(scrollToDestination);
    });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [hash, pathname]);

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
