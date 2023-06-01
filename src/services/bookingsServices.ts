import db from "../database/db.json";
import { Booking } from "../types/interfaces";
import { saveToDatabase } from "../database/utils";

export const getBookings = () => {
  if(!db.bookings || db.bookings.length === 0){
    throw new Error("Bookings not found!")
  }
  return db.bookings;
};


export const getSingleBooking = (bookingId: Booking["id"]) => {
  const booking = db.bookings.find((booking) => booking.id === bookingId);

  if (!booking) {
    throw new Error("Booking not found!");
  }
  return booking;
};

export const updateBooking = (updatedBooking : Booking, bookingId: Booking["id"]) => {
  const indexToUpdate = db.bookings.findIndex((booking) => booking.id === bookingId);
 
 if (indexToUpdate < 0) {
  throw new Error("Booking not found!");
}
  db.bookings[indexToUpdate] = updatedBooking;
  saveToDatabase(db);
  return db.bookings[indexToUpdate];
};


export const createBooking = (newBooking: Booking) => {
  db.bookings.push(newBooking);
  saveToDatabase(db);
  return newBooking;
};

export const deleteBooking = (bookingId: Booking["id"]) => {
 const indexToDelete = db.bookings.findIndex((booking) => booking.id === bookingId);
 
 if (indexToDelete === -1) {
  throw new Error("Booking not found!");
}
const idBooking = db.bookings[indexToDelete].id;
  db.bookings.splice(indexToDelete, 1);
  saveToDatabase(db);
  return idBooking;
};


