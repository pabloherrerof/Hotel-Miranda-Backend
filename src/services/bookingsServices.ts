import { IBooking } from "../types/interfaces";
import mysql, {OkPacket, RowDataPacket } from "mysql2/promise";
import { ResultSetHeader } from "mysql2";
import { Booking } from "../models/booking";
import { connect, disconnect } from "../database/mondoDBConnection";
import { Room } from "../models/rooms";




export const getBookings = async () => {
  try {
    await connect();
    let bookings: IBooking[] = await Booking.find().exec();
    await disconnect();
    if(bookings.length > 0){
      console.log(bookings)
      return bookings
    } else throw new Error("Couldn`t find bookings on the database.")
    
  } catch (e) {
    throw e;
  }
};

export const getSingleBooking = async (bookingId: IBooking["id"]) => {
  try {
    await connect();
    let booking = await Booking.findOne({ id: bookingId }).exec();
    await disconnect();
    if (booking) {
      console.log(booking);
      return booking;
    } else
      throw new Error(
        `Booking with ID ${bookingId} could not be found in the database.`
      );
  } catch (error) {
    throw error;
  }
};

export const updateBooking = async (
  updatedBooking: IBooking,
  bookingId: IBooking["id"]
  
) => {
  
  try {
     await connect();
    let {id}  = updatedBooking
    id = bookingId;

    let booking = await Booking.findOneAndUpdate({id: bookingId}, { 
      $set: updatedBooking }, {new: true}).exec();
    console.log(booking)
    await disconnect();
    if (booking) {
      console.log(booking);
      return booking;
    } else
      throw new Error(
        `Booking with ID ${bookingId} could not be found in the database.`
      );

  } catch (e) {
    throw e;
  }
};

export const createBooking = async (newbooking: IBooking) => {
  try {
    await connect()
    const lastBooking = await Booking.findOne().sort({id: -1 }).exec() as IBooking;
    const lastId = parseInt(lastBooking.id.slice(2))
    if (!lastBooking) {
      throw Error("Couldn't find bookings on the database");
    } else {
      
    const {name, checkIn, checkOut, room, id,  specialRequest} = newbooking
    const findRoom = await Room.findOne({id : room}).exec();

    if(findRoom){
      let booking = await new Booking({
        id: "B-" + (lastId + 1).toString().padStart(4, "0"),
        name: name,
        orderDate: new Date().toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }
        ),
        checkIn: checkIn,
        checkOut:checkOut,
        room: room,
        specialRequest: specialRequest,
    })
    
    await booking.save()
    .then(() => {
      console.log("Booking saved!");
      console.log(booking)
      
    })
    .catch((error) => {
      throw new Error("Error saving the booking");
    });
    await disconnect();
    return booking;
    } else{
      throw new Error("The room could not be found in the database")
    }
}
  } catch (e) {
    throw e;
  }
};

export const deleteBooking = async (bookingId: IBooking["id"]) => {
  try {
    await connect();
    let booking = await Booking.findOneAndDelete({ id: bookingId }).exec();
    await disconnect();
    if (booking) {
      console.log(booking);
      return booking;
    } else
      throw new Error(
        `Booking with ID ${bookingId} could not be found in the database.`
      );
  } catch (error) {
    throw error;
  }
}; 
