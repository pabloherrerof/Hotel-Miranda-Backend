import { Router } from "express";
import {getBookingsController, getSingleBookingController, updateBookingController, deleteBookingController, createBookingController } from "../controllers/bookingsController";
import { validateCreateBooking, validateUpdateBooking } from "../validators/bookingsValidator";


const bookingsRouter = Router();
bookingsRouter.get("/", getBookingsController);
bookingsRouter.get("/:bookingId", getSingleBookingController);
bookingsRouter.post("/", validateCreateBooking, createBookingController);
bookingsRouter.put("/:bookingId", validateUpdateBooking, updateBookingController);
bookingsRouter.delete("/:bookingId", deleteBookingController);


export {bookingsRouter}