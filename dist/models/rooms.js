"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    roomType: {
        type: String,
        enum: ["Single Bed", "Double Bed", "Double Superior", "Suite", "NO DATA"],
        required: true,
    },
    roomNumber: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    cancellation: {
        type: String,
        required: true,
    },
    amenities: {
        type: [],
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    images: {
        type: [],
        required: true,
    },
    status: {
        type: String,
        required: false,
    },
}, { versionKey: false });
const Room = (0, mongoose_1.model)("Room", roomSchema);
exports.Room = Room;
