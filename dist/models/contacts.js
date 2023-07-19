"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
        required: true,
    },
    archived: {
        type: Boolean,
        required: true,
    },
    customer: {
        type: Object,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, { versionKey: false });
const Contact = (0, mongoose_1.model)("Contact", contactSchema);
exports.Contact = Contact;
