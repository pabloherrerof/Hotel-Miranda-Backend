export interface Booking {
    name: string ;
    id: string;
    orderDate: string;
    checkIn: string;
    checkOut: string;
    room: string;
    specialRequest: string;
  }

  export interface User{
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

  export interface Room{
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

  type customer = {
    name: string;
    phone: string;
    email: string;
  }

  export interface Contact {
    date: string;
    archived: boolean;
    customer: customer;
    id: string;
    subject: string;
    comment: string;
  }