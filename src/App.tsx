import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { EcosystemSection } from "./sections/EcosystemSection";
import { MissionSection } from "./sections/MissionSection";
import { VisionSection } from "./sections/VisionSection";
import { RoadmapSection } from "./sections/RoadmapSection";

function App() {
  return (
    <div className="app">
      <Header />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <EcosystemSection />
        <MissionSection />
        <VisionSection />
        <RoadmapSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
