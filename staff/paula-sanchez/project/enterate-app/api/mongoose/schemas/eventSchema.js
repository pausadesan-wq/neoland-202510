import mongoose from 'mongoose'
import { URL_REGEX, TIME_REGEX, EVENT_CATEGORIES, EVENT_PRICE_TYPES, EVENT_SOURCE_TYPES } from 'com'

const { Schema, ObjectId } = mongoose

export const eventSchema = new Schema({
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        minLength: 4,
        maxLength: 120,
        required: true
    },

    description: {
        type: String,
        minLength: 20,
        maxLength: 800,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    time: {
        type: String,
        match: TIME_REGEX,
        required: true
    },

    location: {
        type: String,
        minLength: 2,
        maxLength: 120,
        required: true
    },

    address: {
        type: String,
        maxLength: 160,
        default: null
    },

    district: {
        type: String,
        maxLength: 80,
        default: null
    },

    category: {
        type: String,
        enum: EVENT_CATEGORIES,
        required: true
    },

    tags: {
        type: [String],
        default: []
    },

    priceType: {
        type: String,
        enum: EVENT_PRICE_TYPES,
        required: true
    },

    price: {
        type: String,
        maxLength: 40,
        default: null
    },

    image: {
        type: String,
        match: URL_REGEX,
        default: null
    },

    sourceType: {
        type: String,
        enum: EVENT_SOURCE_TYPES,
        required: true
    },

    sourceUrl: {
        type: String,
        match: URL_REGEX,
        default: null
    },

    attendees: {
        type: [{ type: ObjectId, ref: 'User' }],
        default: []
    }
}, { timestamps: true })
