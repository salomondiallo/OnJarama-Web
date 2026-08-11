import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { RouteFocusManager } from "./components/RouteFocusManager";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProjectPlaceholderPage } from "./pages/ProjectPlaceholderPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const OJWPage = lazy(() => import("./pages/OJWPage"));

function App() {
  return (
    <BrowserRouter>
      <RouteFocusManager />
      <div className="app">
        <Suspense fallback={<main id="main-content" className="route-loading" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route caseSensitive path="/oja" element={<ProjectPlaceholderPage projectId="academy" />} />
            <Route caseSensitive path="/ojp" element={<ProjectPlaceholderPage projectId="path" />} />
            <Route caseSensitive path="/ojcs" element={<ProjectPlaceholderPage projectId="ojcs-connect" />} />
            <Route caseSensitive path="/ojw" element={<OJWPage />} />
            <Route path="/OJA" element={<Navigate to="/oja" replace />} />
            <Route path="/OJP" element={<Navigate to="/ojp" replace />} />
            <Route path="/OJCS" element={<Navigate to="/ojcs" replace />} />
            <Route path="/OJW" element={<Navigate to="/ojw" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
