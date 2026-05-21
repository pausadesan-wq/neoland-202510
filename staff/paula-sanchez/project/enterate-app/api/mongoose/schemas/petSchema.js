import mongoose from 'mongoose'
import { URL_REGEX } from 'com'

const { Schema, ObjectId } = mongoose

export const petSchema = new Schema({
    owner: {
        type: ObjectId,
        ref: 'User'
    },

    name: {
        type: String,
        minLength: 1,
        required: true
    },

    birthdate: {
        type: Date,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        match: URL_REGEX,
        required: true
    }
})