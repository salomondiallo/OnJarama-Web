import { useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useDayNightMode, type DayNightMode } from "../hooks/useDayNightMode";
import { AboutSection } from "../sections/AboutSection";
import { EcosystemSection } from "../sections/EcosystemSection";
import { MissionSection } from "../sections/MissionSection";
import { RoadmapSection } from "../sections/RoadmapSection";
import { TreeHeroSection } from "../sections/TreeHeroSection";
import { VisionSection } from "../sections/VisionSection";

export default function HomePage() {
  const { mode, preference, setPreference, autoStrategy } = useDayNightMode();
  const [preparedMode, setPreparedMode] = useState<DayNightMode | null>(null);

  return (
    <>
      <Header
        isHomePage
        mode={mode}
        preference={preference}
        autoStrategy={autoStrategy}
        onModeChange={setPreference}
        onModePrepare={(next) => setPreparedMode(next === "auto" ? mode : next)}
      />
      <main id="main-content">
        <TreeHeroSection mode={mode} preference={preference} preparedMode={preparedMode} />
        <EcosystemSection />
        <AboutSection />
        <MissionSection />
        <VisionSection />
        <RoadmapSection />
      </main>
      <Footer isHomePage />
    </>
  );
}
