"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    orderDate: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
    checkIn: {
        type: String,
        required: true
    },
    checkOut: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        ref: 'Room'
    },
    specialRequest: {
        type: String,
        required: true
    }
}, { versionKey: false });
const Booking = (0, mongoose_1.model)("Booking", bookingSchema);
exports.Booking = Booking;
