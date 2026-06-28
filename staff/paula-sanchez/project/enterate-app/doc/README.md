# ENTÉRATE

## Introduction

Aplicación web para descubrir planes y eventos culturales en Granada. Cualquiera puede consultar los eventos; los usuarios registrados pueden crear, guardar y apuntarse a planes.

## Functional description

### Use cases

Invitado
- ver home
- explorar eventos con búsqueda, categorías y filtros de fecha
- ver detalle de un evento

User
- register
- login / logout
- ver perfil
- cambiar nombre, username, email, contraseña e imagen
- crear evento
- editar evento propio
- eliminar evento propio
- guardar / desguardar evento
- apuntarse / cancelar asistencia
- ver Mis planes (Guardados, Voy, Creados, Pasados)

### UI/UX design

[Archivo de Figma](https://www.figma.com/design/jZmJmUETMuD2AQuSnPD0Ax/EnterateAppMobile_Dise%C3%B1oUI-UX_ProyectoFinal--Copia-?node-id=0-1&t=v1WNCEDL2Nu5R9EY-1)
[Prototipo navegable](https://www.figma.com/proto/jZmJmUETMuD2AQuSnPD0Ax/EnterateAppMobile_Dise%C3%B1oUI-UX_ProyectoFinal--Copia-?node-id=0-1&t=v1WNCEDL2Nu5R9EY-1)

## Technical description

### Blocks

- App (React)
- API (Express)
- DB (Mongo)

### Packages

- api (handlers, logic, data)
- app (components, logic, data)
- com (errors, validate, regex, constants)
- doc (readme, images)

### Data Model

UserData
- id (unique, string)
- name (required, string)
- email (required, unique, string)
- username (required, unique, string)
- password (required, hashed, string)
- image (string)
- role (required, string, regular | administrator)
- savedEvents (array of Event ids)

EventData
- id (unique, string)
- owner (User.id, required)
- title (required, string, 4-120)
- description (required, string, 20-800)
- date (required, Date)
- time (required, string HH:MM)
- location (required, string)
- address (string, optional)
- district (string, optional)
- category (required, enum)
- tags (array of strings, 1-5)
- priceType (required, enum: Gratis | De pago | Donativo)
- price (string, required cuando priceType = De pago)
- image (required, url)
- sourceType (required, enum: Instagram | TikTok | Web | Cartel | Boca a boca)
- sourceUrl (string, opcional)
- attendees (array of User ids)

### Techs

- HTML / JavaScript / CSS / Tailwind / React / React Router
- Node / Express / Mongo / Mongoose / BCrypt / JWT / curl / Mocha / Chai / Morgan
- Git / Markdown / VSCode / Sublime Merge

## Tracking

[PR](https://github.com/b00tc4mp/neoland-202510/pull/14)
