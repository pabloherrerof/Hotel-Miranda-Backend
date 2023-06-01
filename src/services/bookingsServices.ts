import { Booking } from "../types/interfaces";
import { queryDb } from "../database/mysqlConnector";
import mysql, {OkPacket, RowDataPacket } from "mysql2/promise";
import { ResultSetHeader } from "mysql2";



export const getBookings = async () => {
  try {
    const query = "SELECT * from bookings";

    return await queryDb(query, null);
  } catch (e) {
    throw e;
  }
};

export const getSingleBooking = async (bookingId: Booking["id"]) => {
  try {
    const query = "SELECT * from bookings WHERE id= ?;";
    const booking = (await queryDb(query, [bookingId])) as Booking[];

    if (booking.length === 0) {
      throw new Error("Booking not found!");
    } else {
      return booking;
    }
  } catch (error) {
    throw error;
  }
};

export const updateBooking = async (
  updatedBooking: Booking,
  bookingId: Booking["id"]
) => {
  try {
      const sql = "UPDATE bookings SET id=?, name=?, orderDate=?, checkIn=?, checkOut=?, room=?, specialRequest=? WHERE id=?";
      const values = [
        updatedBooking.id,
        updatedBooking.name,
        updatedBooking.orderDate,
        updatedBooking.checkIn,
        updatedBooking.checkOut,
        updatedBooking.room,
        updatedBooking.specialRequest,
        bookingId,
      ];
      
      const result = await queryDb(sql, values) as ResultSetHeader;


    if (result.affectedRows === 0) {
      throw new Error("Couldn't update the booking.");
    } else return getSingleBooking(bookingId); 
  } catch (e) {
    throw e;
  }
};

export const createBooking = async (booking: Booking) => {
  try {
    const lastBooking = (await queryDb(
      "SELECT id FROM bookings ORDER BY ID DESC LIMIT 1;",
      null
    )) as Booking[];

    if (lastBooking.length === 0) {
      throw Error("Couldn't find bookings on the database");
    } else {
      const lastId = parseInt(lastBooking[0].id.slice(2));
      const newBooking = [
        "B-" + (lastId + 1).toString().padStart(4, "0"),
        booking.name,
        new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        booking.checkIn,
        booking.checkOut,
        booking.room,
        booking.specialRequest,
      ];
      const createdBooking = await queryDb(
        "INSERT INTO `bookings` (id, name, orderDate, checkIn, checkOut, room, specialRequest) VALUES (?, ?, ?, ?, ?, ?, ?)",
        newBooking
      ) as ResultSetHeader;

    if (createdBooking.affectedRows === 0) {
        throw new Error("Booking not found!");
      } else return await getSingleBooking(newBooking[0]); 
    }
  } catch (e) {
    throw e;
  }
};

export const deleteBooking = async (bookingId: Booking["id"]) => {
  try {
    const query = "DELETE FROM bookings WHERE id= ?;";
    const booking = await queryDb(query, [bookingId]) ;
    /* if(booking.affectedRows === 0){
      throw new Error ("Couldn't delete the booking.")
    } else {
      return bookingId;
    } */
  } catch (error) {
    throw error;
  }
}; 
