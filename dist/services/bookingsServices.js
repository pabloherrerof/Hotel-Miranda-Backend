"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.createBooking = exports.updateBooking = exports.getSingleBooking = exports.getBookings = void 0;
const booking_1 = require("../models/booking");
const rooms_1 = require("../models/rooms");
const getBookings = async () => {
    try {
        let bookings = await booking_1.Booking.find().sort({ id: 1 }).exec();
        if (bookings.length > 0) {
            return bookings;
        }
        else
            throw new Error("Couldn`t find bookings on the database.");
    }
    catch (e) {
        throw e;
    }
};
exports.getBookings = getBookings;
const getSingleBooking = async (bookingId) => {
    try {
        let booking = await booking_1.Booking.findOne({ id: bookingId }).exec();
        if (booking) {
            console.log(booking);
            return booking;
        }
        else
            throw new Error(`Booking with ID ${bookingId} could not be found in the database.`);
    }
    catch (error) {
        throw error;
    }
};
exports.getSingleBooking = getSingleBooking;
const updateBooking = async (updatedBooking, bookingId) => {
    try {
        let { id } = updatedBooking;
        id = bookingId;
        const findRoom = await rooms_1.Room.findOne({ id: updatedBooking.room }).exec();
        if (findRoom) {
            let booking = await booking_1.Booking.findOneAndUpdate({ id: bookingId }, {
                $set: updatedBooking
            }, { new: true }).exec();
            console.log(booking);
            if (booking) {
                console.log(booking);
                return booking;
            }
            else
                throw new Error(`Booking with ID ${bookingId} could not be found in the database.`);
        }
        else
            throw new Error(`Room with ID ${updatedBooking.room} could not be found in the database.`);
    }
    catch (e) {
        throw e;
    }
};
exports.updateBooking = updateBooking;
const createBooking = async (newbooking) => {
    try {
        const lastBooking = await booking_1.Booking.findOne().sort({ id: -1 }).exec();
        const lastId = parseInt(lastBooking.id.slice(2));
        if (!lastBooking) {
            throw Error("Couldn't find bookings on the database");
        }
        else {
            const { name, checkIn, checkOut, room, id, specialRequest } = newbooking;
            const findRoom = await rooms_1.Room.findOne({ id: room }).exec();
            if (findRoom) {
                let booking = await new booking_1.Booking({
                    id: "B-" + (lastId + 1).toString().padStart(4, "0"),
                    name: name,
                    orderDate: new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    }),
                    checkIn: checkIn,
                    checkOut: checkOut,
                    room: room,
                    specialRequest: specialRequest,
                });
                await booking.save()
                    .then(() => {
                    console.log("Booking saved!");
                    console.log(booking);
                })
                    .catch((error) => {
                    throw new Error("Error saving the booking");
                });
                return booking;
            }
            else {
                throw new Error("The room could not be found in the database");
            }
        }
    }
    catch (e) {
        throw e;
    }
};
exports.createBooking = createBooking;
const deleteBooking = async (bookingId) => {
    try {
        let booking = await booking_1.Booking.findOneAndDelete({ id: bookingId }).exec();
        if (booking) {
            console.log(booking);
            return booking;
        }
        else
            throw new Error(`Booking with ID ${bookingId} could not be found in the database.`);
    }
    catch (error) {
        throw error;
    }
};
exports.deleteBooking = deleteBooking;
