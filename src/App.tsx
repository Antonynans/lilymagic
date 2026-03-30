import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import HomePage from "./pages/Home";
import { WorkPage } from "./pages/WorkPage";
import WorkPageById from "./pages/WorkPageById";

export function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:id" element={<WorkPageById />} />
      </Routes>
    </>
  );
}
