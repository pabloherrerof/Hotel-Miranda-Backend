import { Schema, model } from "mongoose";
import { IContact } from "../types/interfaces";

const contactSchema = new Schema<IContact>({
    id:{
        type: String,
        required: true,
        unique: true
    },
    date:{
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
    
})

const Contact = model("Contact", contactSchema);

export {Contact, IContact}

