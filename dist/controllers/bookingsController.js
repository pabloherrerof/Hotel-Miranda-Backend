"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooking = exports.deleteBooking = exports.updateBooking = exports.getSingleBooking = exports.getBookings = void 0;
const bookings_json_1 = __importDefault(require("../data/bookings.json"));
const getBookings = (req, res) => {
    res.send(bookings_json_1.default);
};
exports.getBookings = getBookings;
const getSingleBooking = (req, res) => {
    const bookingId = req.params.bookingId;
    const booking = bookings_json_1.default.find(booking => booking.id === bookingId);
    if (!booking) {
        return res.status(404).send(`Could not find user with id => ${bookingId}.`);
    }
    res.send(booking);
};
exports.getSingleBooking = getSingleBooking;
const createBooking = (req, res) => {
    let newBooking = req.body;
    bookings_json_1.default.push(newBooking);
};
exports.createBooking = createBooking;
const updateBooking = (req, res) => {
    res.send("Update Booking");
};
exports.updateBooking = updateBooking;
const deleteBooking = (req, res) => {
    res.send("Delete Booking");
};
exports.deleteBooking = deleteBooking;
