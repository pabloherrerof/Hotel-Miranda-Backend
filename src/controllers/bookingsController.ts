import { Request, Response } from "express";
import db from "../database/db.json";
import { Booking } from "../types/interfaces";
import {validationResult} from "express-validator";
import { getBookings, getSingleBooking, updateBooking, createBooking, deleteBooking  } from "../services/bookingsServices";

export const getBookingsController = (req: Request, res: Response) => {
  try {
    const allBookings = getBookings();
    res.status(200).send({ status: "200", data: allBookings });
  } catch (e) {
    res.status(500).send({ status: "500", e });
  }
};

export const getSingleBookingController = (req: Request, res: Response) => {
  try {
    const bookingId = req.params["bookingId"];

    const singleBooking = getSingleBooking(bookingId);
    res.status(200).send({ status: "200", data: singleBooking });
  } catch (e: any) {
    console.log(e);
    res.status(500).send({ status: "500", error: e.message });
  }
};

export const createBookingController = (req: Request, res: Response) => {
  try {
    const { name, checkIn, checkOut, specialRequest, room } = req.body;
    const result = validationResult(req);
    
    if (!result.isEmpty()) {
      res.status(422).send({ errors: result.array() });
      return;
    }
    
    if (db && db.bookings && db.bookings.length > 0) {
        const lastBookingId = parseInt(db.bookings[db.bookings.length - 1].id.slice(2));
        const newBooking : Booking = {
            name: name,
            id:  "B-" + (lastBookingId + 1).toString().padStart(4, "0"),
            orderDate: new Date().toLocaleDateString("en-US",{ year: 'numeric', month: '2-digit', day: '2-digit' }),
            checkIn: checkIn,
            checkOut: checkOut,
            room: room,
            specialRequest: specialRequest,
          };
          const createdBooking = createBooking(newBooking);
          res.status(201).send({ status: "201", data: createdBooking });
      } else {
        throw new Error("There's no data for bookings in the database.")
      }
  } catch (e: any) {
    res.status(400).send({ status: "400", data: { error: e.message } });
  }
};

export const updateBookingController = (req: Request, res: Response) => {
  const booking = req.body
  const bookingId = req.params["bookingId"];

  const result = validationResult(req);
    
  if (!result.isEmpty()) {
    res.status(422).json({ errors: result.array() });
    return;
  }

  const updatedBooking = updateBooking(booking, bookingId);

  res.status(201).send({ status: "OK", data: updatedBooking });
};

export const deleteBookingController = (req: Request, res: Response) => {
  try{
    const bookingId = req.params["bookingId"];
    
    const deletedIdBooking = deleteBooking(bookingId);

    res.send({ status: "OK", data: {id: deletedIdBooking} });
  } catch(e:any){
    res.status(400).send({ status: "FAILED", data: { error: e.message } })
  }
};




