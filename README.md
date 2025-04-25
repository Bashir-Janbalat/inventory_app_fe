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
├── api/
│   ├── Api.ts         # Base API logic for making HTTP requests
│   ├── AuthApi.ts     # API logic for authentication (login, signup)
│   └── ProductApi.ts  # API logic for product-related operations
│
├── auth/
│   ├── Auth.ts        # Authentication logic (handling JWT tokens)
│   └── UseAuth.ts     # Custom hook for authentication management (login, logout)
│
├── components/
│   ├── LoginForm.tsx  # Form component for logging in
│   ├── ProductCard.tsx # Card component to display a product
│   ├── ProductList.tsx # List component for displaying products
│   └── ProtectedRoute.tsx # Wrapper component to protect routes
│   ├── Header.tsx     # Header component (with logout button)
│   └── Footer.tsx     # Footer component (includes copyright info)
│
├── pages/
│   ├── LoginPage.tsx   # Page component for login
│   ├── NotFoundPage.tsx # Page component for 404 errors
│   ├── ProductPage.tsx  # Page component for individual product details
│   └── SignupPage.tsx  # Page component for signup
│
├── types/
│   ├── ProductDTO.ts    # Product data structure
│   └── UserDTO.ts       # User data structure
│
├── App.tsx              # Main app component, sets up routing
├── main.tsx             # Entry point of the app
├── routes.tsx           # Handles routing of the app
└── vite-env.d.ts        # TypeScript environment types for Vite

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

Und in Api.ts wie folgt verwenden:

    baseURL: import.meta.env.VITE_API_URL


🤝 Link zum Backend
Das Spring Boot Backend findest du hier: [inventory_app (GitHub)](https://github.com/Bashir-Janbalat/inventory_app)

**Autor:** [Bashir Janbalat](https://github.com/Bashir-Janbalat)

