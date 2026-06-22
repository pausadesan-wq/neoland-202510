export * from './models/index.js'

import { insertUser } from './insertUser.js'
import { findUserByEmail } from './findUserByEmail.js'
import { findUserByUsername  } from './findUserByUsername.js'
import { findUserById } from './findUserById.js'
import { updateUser } from './updateUser.js'
import { deleteAllUsers } from './deleteAllUsers.js'

import { insertEvent } from './insertEvent.js'
import { findEvents } from './findEvents.js'
import { findEventById } from './findEventById.js'
import { findEventsByUserId } from './findEventsByUserId.js'
import { updateEvent } from './updateEvent.js'
import { deleteEvent } from './deleteEvent.js'
import { deleteAllEvents } from './deleteAllEvents.js'

import { addSavedEvent } from './addSavedEvent.js'
import { removeSavedEvent } from './removeSavedEvent.js'
import { findSavedEventsByUserId } from './findSavedEventsByUserId.js'
import { addAttendee } from './addAttendee.js'
import { removeAttendee } from './removeAttendee.js'
import { findEventsByAttendeeId } from './findEventsByAttendeeId.js'

export const data = {
    insertUser,
    findUserByEmail,
    findUserByUsername,
    findUserById,
    updateUser,
    deleteAllUsers,
    insertEvent,
    findEvents,
    findEventById,
    findEventsByUserId,
    updateEvent,
    deleteEvent,
    deleteAllEvents,
    addSavedEvent,
    removeSavedEvent,
    findSavedEventsByUserId,
    addAttendee,
    removeAttendee,
    findEventsByAttendeeId
}
