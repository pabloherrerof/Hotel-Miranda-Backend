import { ObjectId } from "mongoose";

export interface IBooking {
    name: string ;
    id: string;
    orderDate: string;
    checkIn: string;
    checkOut: string;
    room: string;
    specialRequest: string;
  }

  export interface IUser{
    photo: string;
    name: string;
    id: string;
    email: string;
    phone: string;
    startDate: string;
    jobDescription: string;
    state: string;
    password: string;
    position: string;
  }

  export interface IRoom{
    roomType: string;
    roomNumber: string;
    id: string;
    description: string;
    price: number;
    discount: number;
    cancellation: string;
    amenities: string[];
    thumbnail: string;
    images: string[];
    status: string;
  }

  export type customer = {
    name: string;
    phone: string;
    email: string;
  }

  export interface IContact {
    date: string;
    archived: boolean;
    customer: {
      name: string;
      phone: string;
      email: string;
    };
    id: string;
    subject: string;
    comment: string;
  }