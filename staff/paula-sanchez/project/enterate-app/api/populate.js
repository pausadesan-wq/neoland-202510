import bcrypt from 'bcryptjs'

import { connect, disconnect, UserModel, EventModel } from './mongoose/index.js'

// === ENTÉRATE — populate ===
// Limpia usuarios y eventos y siembra datos ficticios de eventos reales de Granada.

connect('mongodb://localhost:27017/enterate')
    .then(() => Promise.all([
        UserModel.deleteMany(),
        EventModel.deleteMany()
    ]))
    .then(() => bcrypt.hash('123123123', 10))
    .then(hash => {
        const wendy = new UserModel({ name: 'Wendy Darling', email: 'wendy@darling.com', username: 'wendydarling', password: hash })
        const peter = new UserModel({ name: 'Peter Pan', email: 'peter@pan.com', username: 'peterpan', password: hash })

        return Promise.all([wendy.save(), peter.save()])
            .then(([wendy, peter]) => {
                console.log('users:', wendy.username, peter.username)

                const events = [
                    new EventModel({
                        owner: wendy.id,
                        title: 'Paseo por el Parque Federico García Lorca',
                        description: 'Un paseo tranquilo por uno de los parques más bonitos de Granada. Quedamos a la entrada y caminamos sin prisa.',
                        date: new Date('2026-08-02'),
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
                        owner: peter.id,
                        title: 'Senderismo en Los Cahorros de Monachil',
                        description: 'Ruta clásica por Los Cahorros de Monachil. Puentes colgantes, río y desayuno en grupo al volver.',
                        date: new Date('2026-08-13'),
                        time: '09:00',
                        location: 'Los Cahorros',
                        address: 'Sendero de Los Cahorros, Monachil',
                        district: 'Monachil',
                        category: 'Deporte',
                        tags: ['Aire libre', 'Senderismo', 'En grupo'],
                        priceType: 'Gratis',
                        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80',
                        sourceType: 'Instagram',
                        sourceUrl: 'https://instagram.com/granadatrails'
                    }),
                    new EventModel({
                        owner: wendy.id,
                        title: 'Yoga en Parque Tico Medina',
                        description: 'Clase de yoga al aire libre, todos los niveles. Trae tu esterilla y agua.',
                        date: new Date('2026-08-05'),
                        time: '19:00',
                        location: 'Parque Tico Medina',
                        district: 'Zaidín',
                        category: 'Deporte',
                        tags: ['Yoga', 'Aire libre', 'Tranquilo'],
                        priceType: 'Donativo',
                        image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1200&q=80',
                        sourceType: 'Cartel'
                    }),
                    new EventModel({
                        owner: peter.id,
                        title: 'Ruta de tapas escondidas por el centro',
                        description: 'Cuatro bares que casi nadie conoce, con la mejor relación tapa/precio del centro. Plazas limitadas.',
                        date: new Date('2026-08-07'),
                        time: '21:00',
                        location: 'Centro',
                        address: 'Punto de encuentro: Plaza Nueva',
                        district: 'Centro',
                        category: 'Comida',
                        tags: ['Tapas', 'Noche', 'En grupo', 'Conocer gente'],
                        priceType: 'De pago',
                        price: '15',
                        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
                        sourceType: 'Boca a boca'
                    }),
                    new EventModel({
                        owner: wendy.id,
                        title: 'Feria del vino de Granada',
                        description: 'Más de 30 bodegas pequeñas de Granada y alrededores. Copa incluida con la entrada.',
                        date: new Date('2026-08-18'),
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
                        owner: peter.id,
                        title: 'Mercado de artesanía en San Nicolás',
                        description: 'Más de 20 puestos de artesanía local con vistas a la Alhambra. Música en directo al atardecer.',
                        date: new Date('2026-08-23'),
                        time: '11:00',
                        location: 'Mirador San Nicolás',
                        district: 'Albaicín',
                        category: 'Mercadillos',
                        tags: ['Artesanía', 'Aire libre', 'Familiar', 'Local'],
                        priceType: 'Gratis',
                        image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80',
                        sourceType: 'Cartel'
                    }),
                    new EventModel({
                        owner: wendy.id,
                        title: 'Concierto acústico en la Carbonería',
                        description: 'Noche de acústico con artistas locales. Consumición mínima. Aforo limitado, mejor llegar pronto.',
                        date: new Date('2026-08-28'),
                        time: '22:00',
                        location: 'Sala La Carbonería',
                        address: 'Calle Cardenal Parrado 8',
                        district: 'Realejo',
                        category: 'Música',
                        tags: ['Interior', 'Noche', 'Adultos'],
                        priceType: 'De pago',
                        price: '12',
                        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
                        sourceType: 'Instagram',
                        sourceUrl: 'https://instagram.com/lacarboneriagranada'
                    }),
                    new EventModel({
                        owner: peter.id,
                        title: 'Exposición de fotografía en Gran Capitán',
                        description: 'Muestra colectiva de fotografía documental sobre los barrios de Granada. Entrada libre.',
                        date: new Date('2026-09-15'),
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
                        // === RELACIONES DEMO (Fase 8) ===
                        // Wendy guarda 2 y va a 3. Peter guarda 1 y va a 2.
                        const wendySaves = [saved[1].id, saved[5].id] // Senderismo + Mercado
                        const wendyGoing = [saved[0].id, saved[2].id, saved[6].id] // Paseo + Yoga + Concierto
                        const peterSaves = [saved[4].id] // Feria del vino
                        const peterGoing = [saved[3].id, saved[7].id] // Tapas + Exposición

                        return Promise.all([
                            UserModel.updateOne({ _id: wendy.id }, { $addToSet: { savedEvents: { $each: wendySaves } } }),
                            UserModel.updateOne({ _id: peter.id }, { $addToSet: { savedEvents: { $each: peterSaves } } }),
                            ...wendyGoing.map(eid => EventModel.updateOne({ _id: eid }, { $addToSet: { attendees: wendy.id } })),
                            ...peterGoing.map(eid => EventModel.updateOne({ _id: eid }, { $addToSet: { attendees: peter.id } }))
                        ]).then(() => saved)
                    })
            })
            .then(events => console.log(`events created: ${events.length}`))
    })
    .catch(error => console.error(error))
    .finally(() => disconnect())
