
import { addEvent } from './addEvent'
import { changeUserEmail } from './changeUserEmail'
import { changeUserImage } from './changeUserImage'
import { changeUserName } from './changeUserName'
import { changeUserPassword } from './changeUserPassword'
import { changeUserUsername } from './changeUserUsername'
import { getLoggedInUser } from './getLoggedInUser'
import { getEvent } from './getEvent'
import { getEvents } from './getEvents'
import { isUserLoggedIn } from './isUserLoggedIn'
import { loginUser } from './loginUser'
import { logoutUser } from './logoutUser'
import { modifyEvent } from './modifyEvent'
import { registerUser } from './registerUser'
import { removeEvent } from './removeEvent'

import { saveEvent } from './saveEvent'
import { unsaveEvent } from './unsaveEvent'
import { getSavedEvents } from './getSavedEvents'
import { joinEvent } from './joinEvent'
import { leaveEvent } from './leaveEvent'
import { getJoinedEvents } from './getJoinedEvents'
import { getCreatedEvents } from './getCreatedEvents'

export const logic = {
    addEvent,
    changeUserEmail,
    changeUserImage,
    changeUserName,
    changeUserPassword,
    changeUserUsername,
    getLoggedInUser,
    getEvent,
    getEvents,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    modifyEvent,
    registerUser,
    removeEvent,
    saveEvent,
    unsaveEvent,
    getSavedEvents,
    joinEvent,
    leaveEvent,
    getJoinedEvents,
    getCreatedEvents
}
