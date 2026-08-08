import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { TreeHeroSection } from "./sections/TreeHeroSection";
import { AboutSection } from "./sections/AboutSection";
import { EcosystemSection } from "./sections/EcosystemSection";
import { MissionSection } from "./sections/MissionSection";
import { VisionSection } from "./sections/VisionSection";
import { RoadmapSection } from "./sections/RoadmapSection";
import { useDayNightMode, type DayNightMode } from "./hooks/useDayNightMode";
import { useState } from "react";

function App() {
  const { mode, preference, setPreference, autoStrategy } = useDayNightMode();
  const [preparedMode, setPreparedMode] = useState<DayNightMode | null>(null);

  return (
    <div className="app">
      <Header
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
      <Footer />
    </div>
  );
}

export default App;
