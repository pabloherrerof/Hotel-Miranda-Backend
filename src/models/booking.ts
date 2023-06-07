import { InferSchemaType, Schema, model } from "mongoose";
import { IBooking } from "../types/interfaces";

const bookingSchema = new Schema<IBooking>({
    name:{
        type: String,
        required: true,
    },
    orderDate:{
        type: String,
        required: true
    },
    id:{
        type: String,
        required: true,
        unique: true,
    },
    checkIn:{
        type:String,
        required: true
    },
    checkOut:{
        type: String,
        required: true,
    },
    room:{
        type: String,
        ref: 'Room'
    },
    specialRequest:{
        type: String,
        required: true
    }
})

const Booking = model("Booking", bookingSchema);

export {Booking, IBooking}