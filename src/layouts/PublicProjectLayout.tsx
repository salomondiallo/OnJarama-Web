import type { ReactNode } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PublicProjectContext, type PublicProjectContextCode } from "../components/PublicProjectContext";
import { useDayNightMode } from "../hooks/useDayNightMode";
import { useTranslation } from "../i18n/useTranslation";

type PublicProjectLayoutProps = {
  children: ReactNode;
  currentProject?: PublicProjectContextCode;
};

export function PublicProjectLayout({ children, currentProject }: PublicProjectLayoutProps) {
  const { t } = useTranslation();
  const { mode, preference, setPreference, autoStrategy } = useDayNightMode();

  return (
    <>
      <Header
        showAmbience={false}
        mode={mode}
        preference={preference}
        autoStrategy={autoStrategy}
        onModeChange={setPreference}
        onModePrepare={() => undefined}
      />
      <main id="main-content" className="public-page-shell">
        {currentProject ? (
          <PublicProjectContext currentProject={currentProject} />
        ) : (
          <a className="public-page-shell__back" href="/#ecosystem-projects">{t("global.projectContext.backToEcosystem")}</a>
        )}
        {children}
      </main>
      <Footer />
    </>
  );
}
