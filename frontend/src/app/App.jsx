import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import Accueil from "../pages/Accueil";
import QcmPage from "../pages/QcmPage";
import ResultPage from "../pages/ResultPage";
import MovePage from "../pages/MovePage";
import Home from "../pages/Home";

import FloatingChatWidget from "../components/FloatingChatWidget";
import RequireProfile from "../components/RequireProfile";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/posture/qcm" element={<QcmPage />} />

          {/* ✅ pages dépendantes du profil → QCM obligatoire */}
          <Route
            path="/posture/result"
            element={
              <RequireProfile>
                <ResultPage />
              </RequireProfile>
            }
          />
          <Route
            path="/posture/move/:id"
            element={
              <RequireProfile>
                <MovePage />
              </RequireProfile>
            }
          />
        </Route>
      </Routes>

      {/* ✅ icône flottante visible sur toutes les pages */}
      <FloatingChatWidget />
    </>
  );
}
