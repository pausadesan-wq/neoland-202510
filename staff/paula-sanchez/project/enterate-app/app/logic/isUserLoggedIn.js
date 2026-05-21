import { data } from '../data'

export function isUserLoggedIn() {
    return !!data.getToken()
}