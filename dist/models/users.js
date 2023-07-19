"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
}, { versionKey: false });
const User = (0, mongoose_1.model)("User", userSchema);
exports.User = User;
