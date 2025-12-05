// src/state/profileStorage.js
const KEY = "posture_profile";

export function saveProfile(profile) {
  localStorage.setItem(KEY, JSON.stringify(profile));
}

export function loadProfile() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearProfile() {
  localStorage.removeItem(KEY);
}

// ✅ Reset automatique au lancement (boot)
export function resetProfileOnBoot() {
  clearProfile();
}
