import { Request, Response } from "express";
import {validationResult} from "express-validator";
import { getBookings, getSingleBooking, updateBooking, createBooking, deleteBooking  } from "../services/bookingsServices";

export const getBookingsController = async (req: Request, res: Response) => {
  try {
    const allBookings = await getBookings();
    res.status(200).send({ status: "200", data: allBookings });
  } catch (e: any) {
    res.status(500).send({ status: "500", error: e.message });
  }
};

export const getSingleBookingController = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params["bookingId"];

    const singleBooking = await getSingleBooking(bookingId);
    res.status(200).send({ status: "200", data: singleBooking });

  } catch (e: any) {
    res.status(500).send({ status: "500", error: e.message });
  }
};

export const createBookingController = async (req: Request, res: Response) => {
  try {
    const booking = req.body;
    const result = validationResult(req);
    
    if (!result.isEmpty()) {
      res.status(422).send({ errors: result.array() });
      return;
    }
    
    const createdBooking = await createBooking(booking);
    console.log(createdBooking)
    res.status(201).send({ status: "201", data: createdBooking });
      
  } catch (e: any) {
    res.status(400).send({ status: "400", data: { error: e.message } });
  }
};

export const updateBookingController = async (req: Request, res: Response) => {
  try{
    const booking = req.body;
    const bookingId = req.params["bookingId"];
  
    const result = validationResult(req);
      
    if (!result.isEmpty()) {
      res.status(422).json({ errors: result.array() });
      return;
    }
  
    const updatedBooking = await updateBooking(booking, bookingId);
  
    res.status(201).send({ status: "204", data: updatedBooking });
  } catch(e: any){
    res.status(400).send({ status: "400", data: { error: e.message } })
  }
 
};

export const deleteBookingController = async (req: Request, res: Response) => {
  try{
    const bookingId = req.params["bookingId"];
    
    const deletedIdBooking = await deleteBooking(bookingId);

    res.send({ status: "200", data: {deletedBooking: deletedIdBooking} });
  } catch(e:any){
    res.status(400).send({ status: "400", data: { error: e.message } })
  }
};




