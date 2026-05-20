import { data } from '../data'

export function logoutUser() {
    data.removeToken()
}