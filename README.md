
# Inventory App Frontend

Frontend für das Inventarverwaltungssystem, gebaut mit **React**, **Vite**, **TypeScript** und **Material UI**.

---

## 🛠️ Tech Stack

- **React** 19.0.0
- **Vite** 6.3.2
- **TypeScript** ~5.7.2
- **Material UI** 7.0.2
- **Zustand** 4.4.7
- **React Router** 7.5.1
- **Axios** 1.8.4
- **Formik** 2.4.6
- **JWT Decode** 4.0.0
- **Yup** 1.6.1
- **Emotion (for styling)** @emotion/react 11.14.0, @emotion/styled 11.14.0

---

## 📂 Projektstruktur

```
src/
├── api/
│   ├── AxiosInstance.ts         # Grundlegende API-Logik für HTTP-Anfragen
│   ├── ProductApi.ts            # API-Logik für produktbezogene Operationen
│   ├── CategoryApi.ts           # API-Logik für Kategoriebearbeitung
│   ├── SupplierApi.ts           # API-Logik für Lieferantenbezogene Operationen
│   ├── BrandApi.ts              # API-Logik für Markenbezogene Operationen
│
├── auth/
│   ├── AuthApi.ts               # Authentifizierungslogik (JWT-Token)
│   ├── AuthContext.tsx          # Kontext für Authentifizierungsstatus
│   ├── AuthUtils.ts             # Hilfsfunktionen für das Authentifizierungsmanagement
│   ├── UseAuth.ts             
│
├── components/
│   ├── filter/  
│   │   └── ProductFilters.tsx   # Filterkomponente für Produkte
│   ├── LoginForm.tsx            # Formular-Komponente für Login
│   ├── ProductCard.tsx          # Kartenkomponente zur Anzeige eines Produkts
│   ├── ProductList.tsx          # Listenkomponente für die Anzeige von Produkten
│   ├── ProtectedRoute.tsx       # Wrapper-Komponente zum Schutz von Routen
│   ├── Header.tsx               # Kopfzeilenkomponente (mit Logout-Schaltfläche)
│   ├── Footer.tsx               # Footer-Komponente (mit Copyright-Info)
│   ├── SignUpForm.tsx           # Signup-Formular-Komponente
│
├── pages/
│   ├── LoginPage.tsx            # Seite für Login
│   ├── NotFoundPage.tsx         # Seite für 404-Fehler
│   ├── ProductPage.tsx          # Seite für einzelne Produktdetails
│   └── SignupPage.tsx           # Seite für Signup
│
├── types/
│   ├── ProductDTO.ts            # Produkt-Datenstruktur
│   ├── BrandDTO.ts              # Marken-Datenstruktur
│   ├── CategoryDTO.ts           # Kategorie-Datenstruktur
│   ├── SupplierDTO.ts           # Lieferanten-Datenstruktur
│   ├── UserDTO.ts               # Benutzer-Datenstruktur
│   └── PagedResponseDTO.ts      # Struktur für paginierte Antworten
│
├── App.tsx                      # Haupt-App-Komponente, die das Routing einrichtet
├── main.tsx                     # Einstiegspunkt der App
├── routes.tsx                   # Handhabt das Routing der App
└── vite-env.d.ts                # TypeScript-Umgebungstypen für Vite
└── .env                         # Umgebungsvariablen für die App
└── Dockerfile                   # Dockerfile zur Containerisierung der App
└── docker-compose.inventory_app_fe.yml  # Docker-Compose-Konfiguration für die App
```

---

## 🚀 Installation

```bash
# Repository klonen
git clone https://github.com/Bashir-Janbalat/inventory_app_fe.git

# In das Projektverzeichnis wechseln
cd inventory_app_fe

# Abhängigkeiten installieren
npm install
# oder
yarn install
```

---

## ⚙️ Umgebungsvariablen einrichten

Erstelle eine `.env`-Datei im Projektstammverzeichnis:

```env
VITE_APP_API_BASE_URL=http://deine-api-url.com
```

---

## 🏃‍♂️ Die App ausführen

```bash
npm run dev
# oder
yarn dev
```

Die App wird lokal unter [http://localhost:5173](http://localhost:5173) ausgeführt.

---

## 🐳 Docker Setup

### App im Docker-Container ausführen

```bash
# Docker-Image erstellen
npm run docker:build

# Docker-Container starten

npm run docker:up

# Docker-Container stoppen

npm run docker:down
```

---

## 📋 Features

- **Authentifizierung**: Login, Signup und JWT-Token-Handling.
- **Produktverwaltung**: Anzeige, Erstellung, Bearbeitung und Löschung von Produkten.
- **Kategorieverwaltung**: Verwaltung von Produktkategorien.
- **Lieferantenverwaltung**: Verwaltung der Lieferanten für Produkte.
- **Markenverwaltung**: Verwaltung von Marken.
- **Filter**: Produktfilter-Funktionalität.
- **Formularvalidierung**: Mit React Hook Form und Yup.
