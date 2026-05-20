# 🎉 ENTÉRATE

## 📌 Intro

ENTÉRATE es una aplicación web full stack diseñada para descubrir, compartir y guardar eventos que están ocurriendo en la ciudad de Granada, especialmente aquellos que no aparecen fácilmente en motores de búsqueda ni en plataformas tradicionales.

La plataforma surge como solución a un problema real: la dificultad de enterarse de planes interesantes en la ciudad, que únicamente circulan en redes sociales, carteles o boca a boca, pero que no están centralizados en ningún sitio; obligando al usuario a una sobre información y/o estar pendiente de estas plataformas.

ENTÉRATE funciona como un **feed social de descubrimiento local**, donde cualquier usuario puede explorar o compartir planes de forma rápida y sencilla, unificando esta información en una misma plataforma.

El proyecto comenzó con un enfoque **desktop-first** para asegurar la implementación completa de los flujos principales. Posteriormente, evolucionó hacia un enfoque **mobile-first real**, incorporando:

- Navegación tipo app (tab bar)
- Onboarding de usuario
- Sistema de autenticación progresiva (soft auth)

Esto acerca la experiencia a un producto digital real y usable en contexto móvil.

---

## 🎬 Demo

<p align="center">
  <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3BsMW1lN3VjbWo4Y2dha24wdnZpczM0MnFzanl4dDN5NzRpNnUwMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xMGh0bajSyNdC/giphy.gif" width="500"/>
</p>

---

## 👤 User Roles

### Guest
- Browse events without authentication
- Filter events by category (vibe)
- Search events
- View event details
- Navigate the full app experience

⚠️ Limitations:
- Cannot save events
- Cannot join events (“Voy a ir”)
- Cannot create events

---

### Authenticated User
- Register / Login
- Maintain session (JWT)
- Create events
- Edit and delete own events
- Save / bookmark events
- Join events (“Voy a ir”)
- View saved events
- View own created events

---

## 🚪 Onboarding & Access

La aplicación incluye un sistema de onboarding inspirado en apps móviles:

- Al iniciar por primera vez, se muestra una pantalla de autenticación
- El usuario puede:
  - Registrarse o iniciar sesión
  - Continuar como invitado
  - Cerrar el onboarding

### 🧠 Interaction Model

ENTÉRATE utiliza un sistema de **autenticación progresiva (soft auth)**:

- El usuario puede explorar libremente sin registrarse
- Solo se requiere autenticación para acciones clave:
  - Guardar eventos
  - Apuntarse a eventos
  - Crear eventos

Si un usuario intenta realizar una de estas acciones sin estar autenticado, se le invita a registrarse sin bloquear la navegación.

---

## 🎨 UI/UX Design

[Figma Design - Desktop-first](https://www.figma.com/design/ApUaZ483AiA3Y1v5fx204m/EnTeRaTe_Event?node-id=8-542&t=5cXEVG55dIeHkU0R-1)

### Design principles

- Editorial + social feed hybrid
- Strong typography and visual hierarchy
- Highlight-based graphic system (stickers, strokes)
- Mobile-first navigation (tab bar structure)
- Fast discovery experience (scroll → filter → click)
- Soft onboarding (non-blocking authentication)
- Action-based authentication (login required only for interaction)
- App-like UX patterns (not traditional web navigation)

---

## 🧠 Technical Description

### 🏗️ Architecture

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- REST API
- Authentication: JWT
- Image storage: external cloud service

---

## 📦 Project Structure

- `app/` → frontend (components, views, logic)
- `api/` → backend (routes, handlers, logic, models)
- `com/` → shared utilities (validation, errors, regex)
- `doc/` → documentation

---

## 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Protected routes
- Session persistence

---

## 📡 API Endpoints (summary)

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`

### Events
- POST `/api/events`
- GET `/api/events`
- GET `/api/events/:id`
- PUT `/api/events/:id`
- DELETE `/api/events/:id`

### User Events
- GET `/api/users/me/events`
- GET `/api/users/me/saved`

---

## 🗂️ Data Model

### User
- id
- name
- username
- email
- password (hashed)
- image/avatar
- createdAt

### Event
- id
- title
- description
- image (URL)
- date
- time
- location
- district
- creatorId
- mainCategory
- tags[]
- priceType (free / paid)
- sourceType (instagram, tiktok, poster, boca a boca, web)
- sourceUrl (optional)
- participants[]
- createdAt

---

## 🔍 Key Features

- Multi-category filtering (vibes)
- Local discovery feed
- User-generated events
- Event bookmarking (saved events)
- Event participation (“Voy a ir”)
- Real image upload
- Mobile-first navigation (tab bar)
- Soft authentication system
- Onboarding flow
- App-like interaction patterns

---

## 🎯 Project Goal

Desarrollar una aplicación full stack realista que simule un producto en producción:

- Sistema completo de autenticación
- CRUD de eventos
- Arquitectura escalable
- Flujos de usuario reales
- Modelo social de contenido

---

## 🚀 Future Improvements

- Smart recommendations
- Map-based discovery
- Moderation system
- Comments & interactions
- Trending events
- Notifications
- OAuth / social login
- User profiles (edad, intereses, etc.)
- Advanced filtering (fecha, ubicación)

---

## 📎 Tracking

[Pull Request](https://github.com/b00tc4mp/neoland-202510/pull/30)