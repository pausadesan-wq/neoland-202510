import bcrypt from 'bcryptjs'

import { connect, disconnect, UserModel, EventModel } from './mongoose/index.js'

// === ENTÉRATE — populate ===
// Limpia usuarios y eventos y siembra datos ficticios de planes de Granada.
// Las fechas son relativas al día de hoy para que los datos demo nunca caduquen:
// hay eventos pasados (pestaña Pasados), de esta semana y más adelante.

// Devuelve la fecha de hoy desplazada n días (negativo = pasado).
function inDays(n) {
    const now = new Date()
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    date.setDate(date.getDate() + n)

    return date
}

connect('mongodb://localhost:27017/enterate')
    .then(() => Promise.all([
        UserModel.deleteMany(),
        EventModel.deleteMany()
    ]))
    .then(() => bcrypt.hash('123123123', 10))
    .then(hash => {
        const lucia = new UserModel({ name: 'Lucía Martín', email: 'lucia@example.com', username: 'lucia', password: hash })
        const marcos = new UserModel({ name: 'Marcos Ruiz', email: 'marcos@example.com', username: 'marcos', password: hash })

        return Promise.all([lucia.save(), marcos.save()])
            .then(([lucia, marcos]) => {
                console.log('users:', lucia.username, marcos.username)

                const events = [
                    // === PASADOS ===
                    new EventModel({
                        owner: marcos.id,
                        title: 'Mercadillo vintage en el Realejo',
                        description: 'Ropa de segunda mano, vinilos y trastos bonitos en una plaza del Realejo. Puestos de gente del barrio.',
                        date: inDays(-20),
                        time: '11:00',
                        location: 'Plaza de los Campos',
                        district: 'Realejo',
                        category: 'Mercadillos',
                        tags: ['Aire libre', 'Local', 'Familiar'],
                        priceType: 'Gratis',
                        image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80',
                        sourceType: 'Cartel'
                    }),
                    new EventModel({
                        owner: lucia.id,
                        title: 'Concierto de jazz en el Botánico',
                        description: 'Cuarteto de jazz al atardecer en el jardín botánico. Aforo pequeño y muy buen sonido.',
                        date: inDays(-6),
                        time: '20:30',
                        location: 'Jardín Botánico',
                        address: 'Calle Duquesa 1',
                        district: 'Centro',
                        category: 'Música',
                        tags: ['Aire libre', 'Adultos', 'Tranquilo'],
                        priceType: 'De pago',
                        price: '12',
                        image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=1200&q=80',
                        sourceType: 'Instagram',
                        sourceUrl: 'https://instagram.com/jazzgranada'
                    }),

                    // === ESTA SEMANA ===
                    // Este arranca hoy mismo, para poder probar el filtro "Hoy" de Explorar.
                    new EventModel({
                        owner: lucia.id,
                        title: 'Paseo por el Parque Federico García Lorca',
                        description: 'Un paseo tranquilo por uno de los parques más bonitos de Granada. Quedamos a la entrada y caminamos sin prisa.',
                        date: inDays(0),
                        time: '10:30',
                        location: 'Parque Federico García Lorca',
                        district: 'Centro',
                        category: 'Ocio',
                        tags: ['Aire libre', 'Tranquilo', 'Conocer gente'],
                        priceType: 'Gratis',
                        image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1200&q=80',
                        sourceType: 'Boca a boca'
                    }),
                    new EventModel({
                        owner: lucia.id,
                        title: 'Yoga en Parque Tico Medina',
                        description: 'Clase de yoga al aire libre, todos los niveles. Trae tu esterilla y agua. La profe pasa la gorra al final.',
                        date: inDays(3),
                        time: '19:00',
                        location: 'Parque Tico Medina',
                        district: 'Zaidín',
                        category: 'Deporte',
                        tags: ['Aire libre', 'Tranquilo', 'Accesible'],
                        priceType: 'Donativo',
                        image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1200&q=80',
                        sourceType: 'Cartel'
                    }),
                    new EventModel({
                        owner: marcos.id,
                        title: 'Ruta de tapas escondidas por el centro',
                        description: 'Cuatro bares que casi nadie conoce, con la mejor relación tapa/precio del centro. Plazas limitadas.',
                        date: inDays(5),
                        time: '21:00',
                        location: 'Centro',
                        address: 'Punto de encuentro: Plaza Nueva',
                        district: 'Centro',
                        category: 'Comida',
                        tags: ['Noche', 'En grupo', 'Conocer gente'],
                        priceType: 'De pago',
                        price: '15',
                        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
                        sourceType: 'Boca a boca'
                    }),

                    // === MÁS ADELANTE ===
                    new EventModel({
                        owner: marcos.id,
                        title: 'Jam session abierta en la Carbonería',
                        description: 'Noche de jam abierta: te subes con tu instrumento o te quedas escuchando. Consumición mínima en barra.',
                        date: inDays(8),
                        time: '22:00',
                        location: 'Sala La Carbonería',
                        address: 'Calle Cardenal Parrado 8',
                        district: 'Realejo',
                        category: 'Música',
                        tags: ['Interior', 'Noche', 'Conocer gente'],
                        priceType: 'Gratis',
                        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
                        sourceType: 'Instagram',
                        sourceUrl: 'https://instagram.com/lacarboneriagranada'
                    }),
                    new EventModel({
                        owner: marcos.id,
                        title: 'Senderismo en Los Cahorros de Monachil',
                        description: 'Ruta clásica por Los Cahorros de Monachil. Puentes colgantes, río y desayuno en grupo al volver.',
                        date: inDays(11),
                        time: '09:00',
                        location: 'Los Cahorros',
                        address: 'Sendero de Los Cahorros, Monachil',
                        district: 'Monachil',
                        category: 'Deporte',
                        tags: ['Aire libre', 'En grupo', 'Popular'],
                        priceType: 'Gratis',
                        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80',
                        sourceType: 'Instagram',
                        sourceUrl: 'https://instagram.com/granadatrails'
                    }),
                    new EventModel({
                        owner: lucia.id,
                        title: 'Feria del vino de Granada',
                        description: 'Más de 30 bodegas pequeñas de Granada y alrededores. Copa incluida con la entrada.',
                        date: inDays(16),
                        time: '12:00',
                        location: 'Palacio de Congresos',
                        district: 'Centro',
                        category: 'Comida',
                        tags: ['Adultos', 'Popular', 'Interior'],
                        priceType: 'De pago',
                        price: '10',
                        image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80',
                        sourceType: 'Web',
                        sourceUrl: 'https://feriadelvinogranada.com'
                    }),
                    new EventModel({
                        owner: marcos.id,
                        title: 'Mercado de artesanía en San Nicolás',
                        description: 'Más de 20 puestos de artesanía local con vistas a la Alhambra. Música en directo al atardecer.',
                        date: inDays(25),
                        time: '11:00',
                        location: 'Mirador San Nicolás',
                        district: 'Albaicín',
                        category: 'Mercadillos',
                        tags: ['Aire libre', 'Familiar', 'Local'],
                        priceType: 'Gratis',
                        image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=80',
                        sourceType: 'Cartel'
                    }),
                    new EventModel({
                        owner: lucia.id,
                        title: 'Taller de cerámica en el Albaicín',
                        description: 'Iniciación al torno en un taller del Albaicín. Materiales incluidos y te llevas tu pieza a casa.',
                        date: inDays(32),
                        time: '17:30',
                        location: 'Taller Barro y Cal',
                        address: 'Cuesta del Chapiz 22',
                        district: 'Albaicín',
                        category: 'Artesanía',
                        tags: ['Interior', 'Nuevo', 'Conocer gente'],
                        priceType: 'De pago',
                        price: '20',
                        image: 'https://images.unsplash.com/photo-1565193298357-c5b46b0d4d0a?w=1200&q=80',
                        sourceType: 'Web',
                        sourceUrl: 'https://barroycal.es'
                    }),
                    new EventModel({
                        owner: marcos.id,
                        title: 'Exposición de fotografía en Gran Capitán',
                        description: 'Muestra colectiva de fotografía documental sobre los barrios de Granada. Entrada libre.',
                        date: inDays(40),
                        time: '10:00',
                        location: 'Centro Cultural Gran Capitán',
                        district: 'Centro',
                        category: 'Cultura',
                        tags: ['Interior', 'Tranquilo', 'Local'],
                        priceType: 'Gratis',
                        image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200&q=80',
                        sourceType: 'Cartel'
                    })
                ]

                return Promise.all(events.map(event => event.save()))
                    .then(saved => {
                        // === RELACIONES DEMO ===
                        // Índices: 0 mercadillo vintage (pasado), 1 jazz (pasado), 2 paseo, 3 yoga,
                        // 4 tapas, 5 jam, 6 senderismo, 7 feria vino, 8 artesanía, 9 cerámica, 10 exposición.
                        // Lucía: guarda 3 (uno pasado, para comprobar que Guardados no muestra pasados),
                        // va a 4 (dos ya pasados → pestaña Pasados).
                        const luciaSaves = [saved[1].id, saved[6].id, saved[8].id]
                        const luciaGoing = [saved[0].id, saved[1].id, saved[2].id, saved[3].id]
                        const marcosSaves = [saved[7].id, saved[9].id]
                        const marcosGoing = [saved[0].id, saved[4].id, saved[5].id, saved[10].id]

                        return Promise.all([
                            UserModel.updateOne({ _id: lucia.id }, { $addToSet: { savedEvents: { $each: luciaSaves } } }),
                            UserModel.updateOne({ _id: marcos.id }, { $addToSet: { savedEvents: { $each: marcosSaves } } }),
                            ...luciaGoing.map(eid => EventModel.updateOne({ _id: eid }, { $addToSet: { attendees: lucia.id } })),
                            ...marcosGoing.map(eid => EventModel.updateOne({ _id: eid }, { $addToSet: { attendees: marcos.id } }))
                        ]).then(() => saved)
                    })
            })
            .then(events => console.log(`events created: ${events.length}`))
    })
    .catch(error => console.error(error))
    .finally(() => disconnect())
