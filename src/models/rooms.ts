import { Schema, model } from "mongoose";
import { IRoom } from "../types/interfaces";

const roomSchema = new Schema<IRoom>({
    id:{
        type: String,
        required: true,
        unique: true
    },
    roomType:{
        type: String,
        enum: ["Single Bed", "Double Bed", "Double Superior","Suite", "NO DATA"],
        required: true,
    },
    roomNumber:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
        required: true,
    },
    cancellation:{
        type: String,
        required: true,
    },
    amenities:{
        type: [],
        required: true,
    },
    thumbnail:{
        type: String,
        required: true,
    },
    images:{
        type: [],
        required: true,
    },
    status:{
        type: String,
        required: false,
    },

    
}, {versionKey: false})

const Room = model("Room", roomSchema);

export {Room, IRoom}