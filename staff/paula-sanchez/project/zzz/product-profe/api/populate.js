import bcrypt from 'bcryptjs'

import { database, UserModel, PetModel } from './models.js'

database.connect('mongodb://localhost:27017/product')
    .then(() => bcrypt.hash('123123123', 10))
    .then(hash => {
        const wendy = new UserModel({ name: 'Wendy Darling', email: 'wendy@darling.com', username: 'wendydarling', password: hash })
        const peter = new UserModel({ name: 'Peter Pan', email: 'peter@pan.com', username: 'peterpan', password: hash })

        return Promise.all([wendy.save(), peter.save()])
            .then(([wendy, peter]) => {
                console.log(wendy, peter)

                const tor = new PetModel({ owner: wendy.id, name: 'Tor', birthdate: new Date('2020-01-20'), weight: 3, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcG1rMGp0b2Flazd6OGh3amFlcTZ1YWM1ejV3c2plMG04NmtzeG5sbiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cYpV2OjeIyBRu5GpHQ/giphy.gif' })

                const corito = new PetModel({ owner: wendy.id, name: 'Corito', birthdate: new Date('2025-04-26'), weight: 0.1, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2RscmxobGp6Z2RiNDk4b2w3YmwzcjM4NnFzOG01MWY3cjBvZ2VnYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/hSLfmcaoLe2D2IBSNN/giphy.gif' })

                const salami = new PetModel({ owner: peter.id, name: 'Salami', birthdate: new Date('2022-08-18'), weight: 8, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGlnZzExdnhoNXY4NDZ2MnY1d2c4MWk0MzczNDJvMTJtd2sxMndvayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YggtBfM5OkFsQ/giphy.gif' })

                return Promise.all([tor.save(), corito.save(), salami.save()])
            })
            .then(([tor, corito, salami]) => console.log(tor, corito, salami))
    })
    .catch(error => console.error(error))
    .finally(() => database.disconnect())