# ENTÉRATE

## Introduction

ENTÉRATE es una aplicación web mobile-first para descubrir planes y eventos en Granada que muchas veces no aparecen en los motores de búsqueda habituales. Una aplicación hecha por y para la comunidad.

Cualquier persona puede consultar los eventos disponibles, explorar por categorías y fechas y acceder al detalle de cada plan. Los usuarios registrados, además, pueden crear sus propios eventos, guardarlos y apuntarse a ellos.

![ENTÉRATE](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDdqMzM3dHpqdnJnaWxmcTBrbnY4ZHAzNzNocnFvZHM4ZmZpa3A0dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/W0E8LqFXQmpEU0YcOt/giphy.gif)


## Functional description

### Use cases

#### Invitado

- Ver Home.
- Explorar eventos mediante búsqueda, categorías y filtros de fecha.
- Consultar el detalle de un evento.
- Registrarse.
- Iniciar sesión.

#### Usuario registrado

- Iniciar y cerrar sesión.
- Ver y editar su perfil.
- Cambiar nombre, username, email, contraseña e imagen de perfil.
- Crear eventos.
- Editar eventos propios.
- Eliminar eventos propios.
- Guardar y desguardar eventos.
- Apuntarse y cancelar asistencia a eventos.
- Consultar **Mis planes**:
  - Guardados.
  - Voy.
  - Creados.
  - Pasados.

### UI/UX design

La interfaz ha sido diseñada siguiendo un enfoque **mobile-first**.

Para visualizar la experiencia principal tal y como ha sido diseñada, se recomienda utilizar las herramientas de desarrollo del navegador en modo responsive con un ancho aproximado de **390 px**.

- [Archivo de Figma — vistas completas](https://www.figma.com/design/jZmJmUETMuD2AQuSnPD0Ax/EnterateAppMobile_Dise%C3%B1oUI-UX_ProyectoFinal?node-id=2052-95&t=q7SuXz8ZeNaYhrFr-1)

- [Prototipo navegable](https://www.figma.com/proto/jZmJmUETMuD2AQuSnPD0Ax/EnterateAppMobile_Dise%C3%B1oUI-UX_ProyectoFinal?node-id=2038-1139&t=GQbfCd6oKVCw6ZOg-1)

## Technical description

### Architecture

La aplicación se divide en tres bloques principales:

- **App** — frontend desarrollado con React.
- **API** — backend desarrollado con Node.js y Express.
- **DB** — persistencia de datos mediante MongoDB y Mongoose.

La organización del proyecto sigue una separación por responsabilidades:

- `api/`
  - routers (con handlers)
  - logic
  - data
  - mongoose (schemas y models)
  - middlewares
- `app/`
  - views (con components)
  - logic
  - data
  - styles
- `com/`
  - errors
  - validate
  - regex
  - constants
- `doc/`
  - documentación

### Data Model

#### UserData

- `id` — unique, string
- `name` — required, string, mínimo 1
- `email` — required, unique, string, mínimo 6, formato email
- `username` — required, unique, string, mínimo 3
- `password` — required, hashed string, mínimo 8
- `image` — optional, URL
- `role` — required, enum: `regular` | `administrator` (por defecto `regular`)
- `savedEvents` — array of Event ids

#### EventData

- `id` — unique, string
- `owner` — User id, required
- `title` — required, string, 4–120
- `description` — required, string, 20–800
- `date` — required, Date
- `time` — required, string HH:MM
- `location` — required, string, 2–120
- `address` — optional, string, máximo 160
- `district` — optional, string, máximo 80
- `category` — required, enum: Deporte | Cultura | Comida | Música | Ocio | Artesanía | Mercadillos
- `tags` — array of strings, 1–5 (rango validado en la capa `logic`)
- `priceType` — required, enum: Gratis | De pago | Donativo
- `price` — string, máximo 40, required cuando `priceType = De pago`
- `image` — optional, URL
- `sourceType` — required, enum: Instagram | TikTok | Web | Cartel | Boca a boca
- `sourceUrl` — optional, URL
- `attendees` — array of User ids

Si un evento no incluye imagen o la URL proporcionada no puede cargarse, la aplicación utiliza una imagen genérica de respaldo.

## Main features

### Events

- Consulta de eventos públicos.
- Búsqueda por texto.
- Filtrado por categoría.
- Filtrado por fecha:
  - Hoy.
  - Esta semana.
  - Este mes.
  - Más adelante.
- Creación, modificación y eliminación de eventos propios.
- Imagen opcional con fallback local.
- Eventos relacionados mediante **Planes parecidos**.
- Compartir eventos mediante copia del enlace.

### User activity

Los usuarios registrados pueden gestionar su actividad desde **Mis planes**:

- **Guardados** — eventos futuros guardados.
- **Voy** — eventos futuros a los que el usuario está apuntado.
- **Creados** — eventos publicados por el usuario.
- **Pasados** — eventos anteriores a los que el usuario estaba apuntado.

Guardar un evento y apuntarse a él son acciones independientes.

### Authentication and access control

La autenticación se realiza mediante JWT.

Las acciones privadas requieren un usuario autenticado, mientras que la consulta de Home, Explorar y Detalle de evento es pública.

La edición y eliminación de eventos está restringida al propietario del evento.

## API endpoints

Base URL: `http://localhost:8080`

### Users

| Método | Ruta | Acceso |
|---|---|---|
| POST | `/users` | público |
| POST | `/users/auth` | público |
| GET | `/users/me` | privado |
| PATCH | `/users/me/name` | privado |
| PATCH | `/users/me/username` | privado |
| PATCH | `/users/me/email` | privado |
| PATCH | `/users/me/password` | privado |
| PATCH | `/users/me/image` | privado |
| GET | `/users/me/saved-events` | privado |
| POST | `/users/me/saved-events/:eventId` | privado |
| DELETE | `/users/me/saved-events/:eventId` | privado |
| GET | `/users/me/joined-events` | privado |
| GET | `/users/me/created-events` | privado |

### Events

| Método | Ruta | Acceso |
|---|---|---|
| GET | `/events` | público |
| GET | `/events/:eventId` | público |
| POST | `/events` | privado |
| PUT | `/events/:eventId` | privado (solo owner) |
| DELETE | `/events/:eventId` | privado (solo owner) |
| POST | `/events/:eventId/attendees/me` | privado |
| DELETE | `/events/:eventId/attendees/me` | privado |

Las rutas privadas requieren la cabecera `Authorization: Bearer <token>`. El token se obtiene en `POST /users/auth` y caduca en 1 hora.

## Technologies

### Frontend

- HTML
- CSS
- Tailwind CSS (vía CDN, no como dependencia de npm)
- JavaScript
- React
- React Router

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- bcryptjs
- JWT
- CORS

### Development and testing

- Mocha
- Chai
- morgan-body
- curl
- Git
- Markdown
- VS Code
- Sublime Merge

## Installation and execution

Clonar el repositorio e instalar las dependencias de frontend y backend.

### API

```bash
cd enterate-app/api
npm install
npm start
```

### App

En otra terminal:

```bash
cd enterate-app/app
npm install
npm start
```

Por defecto, Vite sirve la aplicación en `http://localhost:5173/`.

### Variables de entorno

La API se arranca con `node --env-file=.env`, por lo que el archivo `.env` es obligatorio. Cada carpeta incluye su `.env.example` como referencia.

`enterate-app/api/.env`

```bash
DB_URL=mongodb://localhost:27017/enterate
TEST_DB_URL=mongodb://localhost:27017/enterate-test
PORT=8080
JWT_SECRET=tu-secreto
```

`enterate-app/app/.env`

```bash
VITE_API_URL=http://localhost:8080
VITE_LOG_LEVEL=0
```

Requisito previo: MongoDB ejecutándose en local en el puerto 27017.

## Demo data

Para cargar los datos de demostración:

```bash
cd enterate-app/api
npm run populate
```

### Usuarios demo

**Lucía**
- Email: `lucia@example.com`
- Username: `lucia`
- Password: `123123123`

**Marcos**
- Email: `marcos@example.com`
- Username: `marcos`
- Password: `123123123`


## Tests

Para ejecutar los tests de la API:

```bash
cd enterate-app/api
npm test
```

Para comprobar el build del frontend:

```bash
cd enterate-app/app
npm run build
```

## References

Este proyecto se ha desarrollado a partir de los conocimientos, prácticas y arquitectura trabajados durante el bootcamp Full Stack Web Developer de Neoland.

Como referencia técnica se ha utilizado el proyecto desarrollado durante las clases por el profesor:

- [Proyecto de referencia del profesor](https://github.com/b00tc4mp/neoland-202510/pull/14)

## Project tracking

El desarrollo de ENTÉRATE puede consultarse en el Pull Request del proyecto:

- [Pull Request — ENTÉRATE](https://github.com/b00tc4mp/neoland-202510/pull/30)
