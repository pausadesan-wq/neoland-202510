export * from './models/index.js'

import { registerUser } from './registerUser.js'
import { authenticateUser } from './authenticateUser.js'
import { getUser } from './getUser.js'
import { changeUserEmail } from './changeUserEmail.js'
import { changeUserImage } from './changeUserImage.js'
import { changeUserName } from './changeUserName.js'
import { changeUserPassword } from './changeUserPassword.js'
import { changeUserUsername } from './changeUserUsername.js'

import { addEvent } from './addEvent.js'
import { getEvent } from './getEvent.js'
import { getEvents } from './getEvents.js'
import { modifyEvent } from './modifyEvent.js'
import { removeEvent } from './removeEvent.js'

export const logic = {
    registerUser,
    authenticateUser,
    getUser,
    changeUserEmail,
    changeUserImage,
    changeUserName,
    changeUserPassword,
    changeUserUsername,
    addEvent,
    getEvent,
    getEvents,
    modifyEvent,
    removeEvent
}
