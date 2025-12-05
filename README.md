# 🏋️ CTO de Votre Santé Posturale — Decathlon Digital

Projet réalisé pour le défi **Decathlon Digital** (Nuit de l’Info).  
Objectif : aider l’utilisateur à exécuter correctement des mouvements sportifs de base (squat, pompes, corde) afin de **prévenir les blessures**.

---

## ✅ Fonctionnalités (Niveaux)

- **Niveau 1 — Profilage Sportif (QCM)**
  - Questionnaire (niveau, objectif, contraintes, matériel disponible…)
  - Génération d’un profil (stockage local)

- **Niveau 2 — Instructions Personnalisées**
  - Étapes claires + cues (points d’attention)
  - Erreurs fréquentes + corrections

- **Niveau 3 — Visualisation**
  - Toggle *Mouvement correct* vs *Erreur fréquente*
  - Support **vidéo en boucle** (si vidéos présentes) avec fallback (schéma)

- **Bonus — Produits pertinents**
  - Suggestions de produits selon la pratique (tags)
  - Liens directs

---

## 🧱 Stack

**Frontend**
- React + Vite
- TailwindCSS
- React Router

**Backend**
- Node.js
- Express (API REST)

---

## 📁 Structure

```
backend/
frontend/
README.md
```

---

## 🚀 Lancer le projet (local)

### 1) Backend
```bash
cd backend
npm install
npm run dev
```

### 2) Frontend
```bash
cd ../frontend
npm install
npm run dev
```

- Frontend : http://localhost:5173  
- Backend : http://localhost:5000 (ou le port défini)

---

## 🔐 Variables d’environnement

Créer un fichier **backend/.env** (ne pas push sur GitHub) :

```env
PORT=5000
GROQ_API_KEY=YOUR_KEY_HERE
```

Un exemple est fourni : **backend/.env.example**

---

## 🎥 Vidéos (optionnel)

Pour la visualisation en boucle, placer des vidéos dans :  
`frontend/public/videos/`

Noms recommandés :
- `squat-ideal.mp4` / `squat-errors.mp4`
- `pushup-ideal.mp4` / `pushup-errors.mp4`
- `rope-ideal.mp4` / `rope-errors.mp4`

Si les vidéos n’existent pas, l’UI affiche automatiquement un schéma (fallback).

---

## 🧪 Endpoints (exemple)

> Adapte selon ton code backend

- `GET /api/moves` — liste des mouvements
- `POST /api/moves/:id/advice` — conseils personnalisés
- `POST /api/products` — produits liés à des tags

---

## ⚠️ Disclaimer

Ce projet ne remplace pas un avis médical. En cas de douleur vive/inhabituelle, **stop** et consulte un professionnel.

---

## 👥 Équipe

- Frontend : (Nom)
- Backend : (Nom)

---

## 🔗 Liens

- Repo GitHub : (lien)
- Démo locale : http://localhost:5173
