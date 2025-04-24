# React-Frontend für das Inventory-App (mit TypeScript + Vite)

Dies ist das Frontend der Lagerverwaltungsanwendung. Es kommuniziert mit einem Spring Boot Backend unter Verwendung von JWT-Authentifizierung.

## 🛠 Verwendete Technologien

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/) 
- [JWT-Authentifizierung](https://jwt.io/)

---

## 📁 Projektstruktur
````
src/
├── api/
│   ├── api.ts
│   ├── authApi.ts
│   └── productApi.ts
│
├── auth/
│   ├── auth.ts
│   └── useAuth.ts
│
├── components/
│   ├── LoginForm.tsx
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   └── ProtectedRoute.tsx
│
├── pages/
│   ├── LoginPage.tsx
│   ├── NotFoundPage.tsx
│   ├── ProductPage.tsx
│   └── SignupPage.tsx
│
├── types/
│   ├── ProductDTO.ts
│   └── UserDTO.ts
│
├── App.tsx
├── main.tsx
└── routes.tsx
└── vite-env.d.ts

````

---

## 🔐 Authentifizierungsablauf (JWT)

1. Der Benutzer meldet sich über `/auth/login` an.
2. Das JWT-Token wird im `localStorage` gespeichert.
3. Axios fügt automatisch `Authorization: Bearer <token>` zu allen Anfragen hinzu.
4. Geschützte API-Endpunkte sind nur mit gültigem Token erreichbar.

---

## 🚀 Projektstart

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
````

📦 Umgebungsvariablen

Du kannst Umgebungsvariablen in einer .env Datei definieren, zB.:

    VITE_API_URL=http://localhost:8081/api

Und in api.ts wie folgt verwenden:

    baseURL: import.meta.env.VITE_API_URL


🤝 Link zum Backend
Das Spring Boot Backend findest du hier: [inventory_app (GitHub)](https://github.com/Bashir-Janbalat/inventory_app)

**Autor:** [Bashir Janbalat](https://github.com/Bashir-Janbalat)

