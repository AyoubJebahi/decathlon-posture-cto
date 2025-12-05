// src/components/RequireProfile.jsx
import { Navigate, useLocation } from "react-router-dom";
import { loadProfile } from "../state/profileStorage";

export default function RequireProfile({ children }) {
  const location = useLocation();
  const profile = loadProfile();

  if (!profile) {
    return (
      <Navigate
        to="/posture/qcm"
        replace
        state={{ reason: "profile_required", from: location.pathname }}
      />
    );
  }

  return children;
}
