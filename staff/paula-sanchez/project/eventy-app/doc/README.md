# 🎉 Eventy (working title)

## 📌 Intro

Eventy (naming en proceso) es una aplicación web full stack que permite a los usuarios descubrir, crear y unirse a eventos en la ciudad de Granada.

La plataforma nace como solución a la dificultad de encontrar planes locales de forma centralizada y con poca información en diferentes plataformas, facilitando la conexión entre personas con intereses similares y logrando encontrar cualquier evento desde una misma aplicación.

Esta aplicación incluye autenticación de usuarios, gestión de eventos y participación en actividades.

![Eventy](https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif)

---

## ⚙️ Funcional (Use Cases)

La aplicación permite a los usuarios:

- Registrarse en la plataforma
- Iniciar sesión y cerrar sesión
- Mantener sesión activa (usuario autenticado)
- Crear un perfil básico de usuario (nombre e intereses opcionales)
- Crear eventos con información estructurada:
  - título
  - descripción
  - fecha
  - ciudad (Granada)
  - categoría
  - enlace externo (tickets / redes sociales opcional)
  - organizador (usuario creador)

- Ver listado de eventos disponibles
- Ver detalle de un evento
- Editar y eliminar eventos propios
- Unirse a eventos creados por otros usuarios
- Ver eventos en los que participa el usuario

---

## 🧠 Técnico

### 🏗️ Arquitectura

- Frontend: React
- Backend: Node.js + Express
- Base de datos: MongoDB (Mongoose)
- API REST propia
- Autenticación mediante JWT
- Control de acceso mediante middleware

---

### 🔐 Autenticación

- Registro de usuario
- Login de usuario
- Logout
- Protección de rutas mediante token JWT
- Usuario autenticado disponible en sesión

---

### 📡 API Endpoints (resumen)

**Auth**
- POST /api/auth/register → register-user
- POST /api/auth/login → authenticate-user
- GET /api/auth/me → get-user

**Events**
- POST /api/events → create-event
- GET /api/events → get-events
- GET /api/events/:id → get-event-by-id
- PUT /api/events/:id → update-event
- DELETE /api/events/:id → delete-event

**Participation**
- POST /api/events/:id/join → join-event
- GET /api/users/me/events → get-my-events

---

### 🗂️ Modelo de datos

**User**
- id
- name
- email
- password (hashed)
- interests (optional)
- createdAt

**Event**
- id
- title
- description
- date
- city
- category
- creatorId
- externalLink (optional)
- participants[]

---

## 🎯 Objetivo del proyecto

Desarrollar una aplicación full stack funcional con autenticación de usuarios, API propia y operaciones CRUD completas, simulando un producto real con arquitectura backend moderna.

---

## 🚀 Futuras mejoras según viabilidad

- Filtros por categoría
- Búsqueda de eventos
- Eventos privados
- Sistema de comentarios
- Recomendaciones según intereses