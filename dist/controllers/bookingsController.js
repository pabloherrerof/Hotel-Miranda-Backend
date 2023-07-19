"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingController = exports.updateBookingController = exports.createBookingController = exports.getSingleBookingController = exports.getBookingsController = void 0;
const express_validator_1 = require("express-validator");
const bookingsServices_1 = require("../services/bookingsServices");
const getBookingsController = async (req, res) => {
    try {
        const allBookings = await (0, bookingsServices_1.getBookings)();
        console.log(allBookings);
        res.status(200).send({ status: "200", data: allBookings });
    }
    catch (e) {
        res.status(500).send({ status: "500", error: e.message });
    }
};
exports.getBookingsController = getBookingsController;
const getSingleBookingController = async (req, res) => {
    try {
        const bookingId = req.params["bookingId"];
        const singleBooking = await (0, bookingsServices_1.getSingleBooking)(bookingId);
        res.status(200).send({ status: "200", data: singleBooking });
    }
    catch (e) {
        res.status(500).send({ status: "500", error: e.message });
    }
};
exports.getSingleBookingController = getSingleBookingController;
const createBookingController = async (req, res) => {
    try {
        const booking = req.body;
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            res.status(422).send({ errors: result.array() });
            return;
        }
        const createdBooking = await (0, bookingsServices_1.createBooking)(booking);
        console.log(createdBooking);
        res.status(201).send({ status: "201", data: createdBooking });
    }
    catch (e) {
        res.status(400).send({ status: "400", data: { error: e.message } });
    }
};
exports.createBookingController = createBookingController;
const updateBookingController = async (req, res) => {
    try {
        const booking = req.body;
        const bookingId = req.params["bookingId"];
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            res.status(422).json({ errors: result.array() });
            return;
        }
        const updatedBooking = await (0, bookingsServices_1.updateBooking)(booking, bookingId);
        res.status(201).send({ status: "204", data: updatedBooking });
    }
    catch (e) {
        res.status(400).send({ status: "400", data: { error: e.message } });
    }
};
exports.updateBookingController = updateBookingController;
const deleteBookingController = async (req, res) => {
    try {
        const bookingId = req.params["bookingId"];
        const deletedIdBooking = await (0, bookingsServices_1.deleteBooking)(bookingId);
        res.send({ status: "200", data: { deletedBooking: deletedIdBooking } });
    }
    catch (e) {
        res.status(400).send({ status: "400", data: { error: e.message } });
    }
};
exports.deleteBookingController = deleteBookingController;
