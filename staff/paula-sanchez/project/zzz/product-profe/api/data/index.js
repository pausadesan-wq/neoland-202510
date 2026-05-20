export * from './models/index.js'
 
import { insertUser } from './insertUser.js'
import { findUserByEmail } from './findUserByEmail.js'
import { findUserByUsername  } from './findUserByUsername.js'
import { findUserById } from './findUserById.js'
import { updateUser } from './updateUser.js'
import { deleteAllUsers } from './deleteAllUsers.js'

import { insertPet } from './insertPet.js'
import { findPetById } from './findPetById.js'
import { findPetsByUserId } from './findPetsByUserId.js'
import { updatePet } from './updatePet.js'
import { deletePet } from './deletePet.js'
import { deleteAllPets } from './deleteAllPets.js'

export const data = {
    insertUser,
    findUserByEmail,
    findUserByUsername,
    findUserById,
    updateUser,
    deleteAllUsers,
    insertPet,
    findPetById,
    findPetsByUserId,
    updatePet,
    deletePet,
    deleteAllPets
}

