export * from './models/index.js'

import { registerUser } from './registerUser.js'
import { authenticateUser } from './authenticateUser.js'
import { getUser } from './getUser.js'
import { changeUserEmail } from './changeUserEmail.js'
import { changeUserImage } from './changeUserImage.js'
import { changeUserName } from './changeUserName.js'
import { changeUserPassword } from './changeUserPassword.js'
import { changeUserUsername } from './changeUserUsername.js'

import { addPet } from './addPet.js'
import { getPet } from './getPet.js'
import { getPets } from './getPets.js'
import { modifyPet } from './modifyPet.js'
import { removePet } from './removePet.js'

export const logic = {
    registerUser,
    authenticateUser,
    getUser,
    changeUserEmail,
    changeUserImage,
    changeUserName,
    changeUserPassword,
    changeUserUsername,
    addPet,
    getPet,
    getPets,
    modifyPet,
    removePet
}
