# MyPet

## Introduction

An for pet owners register their pets and their medical information, to have control on their health history.

![brave cat](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3FleXNvcGhpcXdpdjQ1eTVqd2JleGN2bWN2aXJmbzc3ZnF1OXptNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jpPTyP6YghtiU/giphy.gif)

## Functional description

### Use cases

User
- register
- login
- update credentials (username, password)
- update profile (name, email, phone, city, role, licensing number)

Owner (User)
- add pet
- remove pet
- modify pet
- list pets
- add comment log for pet
- remove comment log for pet
- modify comment log for pet
- list logs for pet
- filter veterinaries
- assign veterinary for pet
- unassign veterinary for pet

Veterinary (User)
- list assigned pets
- add action log for pet
- remove action log for pet
- modify action log for pet
- list logs for pet

### UI/UX design

[Archivo de Figma](https://www.figma.com/design/jZmJmUETMuD2AQuSnPD0Ax/EnterateAppMobile_Dise%C3%B1oUI-UX_ProyectoFinal--Copia-?node-id=0-1&t=v1WNCEDL2Nu5R9EY-1)
[Prototipo navegable](https://www.figma.com/proto/jZmJmUETMuD2AQuSnPD0Ax/EnterateAppMobile_Dise%C3%B1oUI-UX_ProyectoFinal--Copia-?node-id=0-1&t=v1WNCEDL2Nu5R9EY-1)

## Technical description

### Blocks

- App (React)
- API (Expess)
- DB (Mongo)

### Packages

- api (handlers, logic, data)
- app (components, logic, data)
- com (errors, validate, regex)
- doc (readme, images)

### Data Model

UserData
- id (unique, string)
- name (required, string)
- email (required, unique, string)
- username (required, unique, string)
- pasword (required, hashed, string)
- image (string)
- role (required, string, regular | administrator)

PetData
- id (unique, string)
- owner (UserData.id, string)
- name (required, string)
- birthdate (required, date)
- weight (required, number)
- image (required, string)

### Techs

- HTML / JavaScript / CSS / Tailwind / React / React Router
- Node / Express / Mongo / Mongoose / BCrypt / JWT / curl / Mocha / Chai / Morgan
- Git / Markdown / VSCode / Sublime Merge

## Tracking

[PR](https://github.com/b00tc4mp/neoland-202510/pull/14)