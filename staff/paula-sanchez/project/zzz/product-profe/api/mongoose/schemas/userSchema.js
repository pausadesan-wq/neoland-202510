import mongoose from 'mongoose'
import { EMAIL_REGEX, URL_REGEX } from 'com'

const { Schema } = mongoose

export const userSchema = new Schema({
    name: {
        type: String,
        minLength: 1,
        required: true
    },

    email: {
        type: String,
        minLength: 6,
        match: EMAIL_REGEX,
        required: true,
        unique: true
    },

    username: {
        type: String,
        minLength: 3,
        required: true,
        unique: true
    },

    password: {
        type: String,
        minLength: 8,
        required: true
    },

    image: {
        type: String,
        match: URL_REGEX,
        default: null
    },

    role: {
        type: String,
        enum: ['regular', 'administrator'],
        default: 'regular',
        required: true
    }
})