# 🎉 EnTeRaTe!

## 📌 Intro

EnTeRaTe! es una aplicación web full stack que permite descubrir, compartir y guardar eventos que están ocurriendo en la ciudad de Granada, especialmente aquellos que no aparecen fácilmente en los motores de búsqueda ni en plataformas tradicionales.

La plataforma nace como solución a un problema real: la dificultad de enterarse de planes interesantes que circulan en redes sociales, carteles o boca a boca, pero que no están centralizados en ningún sitio.

EnTeRaTe! actúa como un **feed social de descubrimiento local**, donde cualquier usuario puede encontrar o subir planes de forma rápida.


![EnTeRaTe](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3BsMW1lN3VjbWo4Y2dha24wdnZpczM0MnFzanl4dDN5NzRpNnUwMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xMGh0bajSyNdC/giphy.gif)


// https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnhyY2RiaWd0ZTN4ZW85OXRkZDlqNzA4YXdiaWRvZDU0ZzI2Z3EwdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pTvQxc1RsLgqR3W9Ii/giphy.gif

//https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTZxOTRoMmRrc3g2cHEydnhmeHU2ZDJoaTI3NnYwOTc4cDI3bDlkNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/y4DARu43ULbu8dodFn/giphy.gif

//https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcm80ODY2anNvbDdzNGFkYW82a3djbHdwMWUyMmQxdXM4ZnVnejF5ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oxQNfFeMqtTn30Xv2/giphy.gif

//https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXJkYmlvMWdyOGpkOTNzaHVndnpsajU5aGQ5c3lqdWR0cDR4YTdxNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8iR3qjwWnpurm/giphy.gif

https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWM2NmZpcWNvNnV1MWFkeHM5MzdhMmlscWUxODNiNGZuaHNvdTNhZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/21QEFYC8rnm3q08bWF/giphy.gif

//https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDd1NWhpZ3B1aDVlMDkwN2Vmc240MHdraXlpZDExbHYxejAwb2J0byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5wFkqt6A8R4qAqGIFQ/giphy.gif

//https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG9lZmJyOXRnbG9nZzkzZHFkcWZxd2t2ZzExMHNxbTZpYzlqeGJseCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3iwRj8JrhaBfvQMSx9/giphy.gif

//https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnlmYXloZXd5MzUwYnZiNHVodmR5NzQ4djBndmVvemU2bmd0ZzJlaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eKDp7xvUdbCrC/giphy.gif

//https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTJvajIzMTZkZzN5dnAycWJjcncwYXNoNDZra2tzbWpsYWE2YmhpZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2skvQvfiA8vl0V73yl/giphy.gif
---

#### User (guest)
- Browse events without authentication
- Filter events by category (vibe)
- Search events
- View event detail

#### User (authenticated)
- Register
- Login / Logout
- Maintain session (JWT)
- Create events
- Edit and delete own events
- Save / bookmark events
- View saved events
- View own created events

#### Event interaction
- View event feed
- Filter by multiple categories (multi-tag system)
- Join / show interest in events (basic participation)
- View event details:
  - description
  - date & time
  - location
  - category + tags
  - source (Instagram, poster, etc.)

---

## 🎨 UI/UX Design

[Figma Design](https://www.figma.com/design/ApUaZ483AiA3Y1v5fx204m/EnTeRaTe_Event?node-id=0-1&t=5cXEVG55dIeHkU0R-1)

### Design principles

- Editorial + social feed hybrid
- Strong typography and visual hierarchy
- Highlight-based graphic system (stickers, strokes)
- Mobile-first thinking
- Fast discovery experience (scroll → filter → click)

---

## 🧠 Technical Description

### 🏗️ Architecture

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- REST API
- Authentication: JWT
- Image storage: cloud storage (external service)

---

### 📦 Project Structure

- `app/` → frontend (components, pages, logic)
- `api/` → backend (routes, handlers, logic, models)
- `com/` → shared utilities (validation, errors, regex)
- `doc/` → documentation

---

### 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Protected routes
- Session persistence

---

### 📡 API Endpoints (summary)

#### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`

#### Events
- POST `/api/events` → create event
- GET `/api/events` → list events
- GET `/api/events/:id` → event detail
- PUT `/api/events/:id` → update event
- DELETE `/api/events/:id` → delete event

#### User Events
- GET `/api/users/me/events` → created events
- GET `/api/users/me/saved` → saved events

---

### 🗂️ Data Model

#### User
- id
- name
- email
- password (hashed)
- interests (optional)
- createdAt

#### Event
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
- tags[] (multiple categories)
- priceType (free / paid)
- sourceType (instagram, tiktok, poster, word-of-mouth, web)
- sourceUrl (optional)
- participants[]
- createdAt

---

## 🔍 Key Features

- Multi-category filtering (events can belong to multiple vibes)
- Local discovery feed
- User-generated events
- Event bookmarking (saved events)
- Real image upload (not only URLs)
- Clean navigation with multiple screens (not landing-based)

---

## 🎯 Project Goal

Build a real-world full stack application simulating a production-ready product:

- Authentication system
- CRUD operations
- Scalable architecture
- Real UX flows (not just static UI)
- Social-driven content model

---

## 🚀 Future Improvements

- Smart recommendations based on user behavior
- Map-based event discovery
- Moderation system for submitted events
- Comments and interactions
- Trending / popular events
- Notifications system

---

## 🧪 Development Approach

This project combines:

- Rapid prototyping (Lovable)
- Iterative refinement (Claude)
- Manual refactoring and improvements

With the goal of balancing:
- speed
- product thinking
- code quality

---

## 🚀 FUTURE IMPROVEMENTS

- Private Events
- Discounts/Loyalty points system
- Comment system
- Share events (internally and externally)
- Create groups
- Personalized recommendations based on interests

## 📎 Tracking

[Pull Request](https://github.com/b00tc4mp/neoland-202510/pull/30)