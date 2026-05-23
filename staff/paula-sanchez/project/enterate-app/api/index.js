import express, { Router } from 'express'
import cors from 'cors'
import morganBody from 'morgan-body'

import { userRouter, petRouter } from './routers/index.js'
import { errorHandler } from './middlewares/index.js'

import { connect } from './mongoose/index.js'

connect(process.env.DB_URL)
    .then(() => {
        console.log('DB connected')

        const api = express()

        const jsonBodyParser = express.json()

        api.use(cors())

        api.use(jsonBodyParser)

        morganBody(api, {
            logAllReqHeader: true,
            logAllResHeader: true
        })

        api.get('/', (req, res) => res.json({ message: 'Hello! from API ;)' }))

        api.use('/users', userRouter)
        api.use('/pets', petRouter)

        api.use(errorHandler)

        api.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
    })
    .catch(error => console.error(error))