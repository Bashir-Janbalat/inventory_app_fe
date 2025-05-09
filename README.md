
# 📦 Inventory Management System

Frontend für das Inventarverwaltungssystem, gebaut mit **React**, **Vite**, **TypeScript** und **Material UI**.

---

## 🛠️ Tech Stack

- **React** 19.0.0
- **Vite** 6.3.2
- **TypeScript** 5.7.3
- **Material UI** 7.0.2
- **Zustand** 4.4.7
- **React Router** 7.5.1
- **Axios** 1.8.4
- **Formik** 2.4.6
- **JWT Decode** 4.0.0
- **Yup** 1.6.1
- **Emotion (for styling)** @emotion/react 11.14.0, @emotion/styled 11.14.0,@mui/icons-material 7.0.2

---

## 📂 Projektstruktur

```
---
```

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
