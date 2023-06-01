import { faker } from "@faker-js/faker";
import { Booking, Contact, Room, User } from "./types/interfaces";
import db from "./database/db.json";
import { queryDb } from "./database/mysqlConnector";
import bcrypt, { hash } from "bcrypt";
import { jobDescriptionChooser } from "./services/usersServices";
import { roomInfoChooser } from "./services/roomsServices";
import { hashPassword } from "./middleware/auth";

const InsertJson = async () => {
 await insertFakerUsers(2);
};

const getRandomValue = (arr: any[]) => {
  const indiceAleatorio = Math.floor(Math.random() * arr.length);
  return arr[indiceAleatorio];
};

const insertJsonContacts = async () => {
  const query =
    "INSERT INTO `contacts` (id, date, customer, archived, subject, comment) VALUES (?, ?, ?, ?, ?, ?)";
  db.contacts.forEach((element) => {
    let contact: any = [
      element.id,
      element.date,
      JSON.stringify(element.customer),
      element.archived,
      element.subject,
      element.comment,
    ];
    queryDb(query, contact);
  });
};

const insertFakerContacts = async (count: number) => {
  const query =
    "INSERT INTO `contacts` (id, date, customer, archived, subject, comment) VALUES (?, ?, ?, ?, ?, ?)";

  for (let i = 0; i < count; i++) {
    const lastContact = (await queryDb(
      "SELECT id FROM contacts ORDER BY ID DESC LIMIT 1;",
      null
    )) as Contact[];

    if (lastContact.length === 0) {
      throw Error("Couldn't find contacts on the database");
    } else {
      const lastId = parseInt(lastContact[0].id.slice(2));

      const contact = [
        "C-" + (lastId + 1).toString().padStart(4, "0"),
        new Date(faker.date.past()).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        JSON.stringify({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
        }),
        getRandomValue([0, 1]),
        faker.lorem.sentence(5),
        faker.lorem.paragraph(4),
      ];
      await queryDb(query, contact);
    }
  }
};

const insertJsonUsers = async () => {
  const query =
    "INSERT INTO `users` (id, photo, name, email, phone, startDate, state, password, jobDescription, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.users.forEach(async (element) => {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(element.password, salt, (err, hash) => {
        element.password = hash;
        let user: any = [
          element.id,
          element.photo,
          element.name,
          element.email,
          element.phone,
          element.startDate,
          element.state,
          element.password,
          element.jobDescription,
          element.position,
        ];
        queryDb(query, user);
      });
    });
  });
};

const insertFakerUsers = async (count: number) => {
  const query =
    "INSERT INTO `users` (id, photo, name, email, phone, startDate, state, password, jobDescription, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  for (let i = 0; i < count; i++) {
      let password = faker.internet.password();
      const saltRounds = 10;
        
        const lastUser = (await queryDb(
          "SELECT id FROM users ORDER BY ID DESC LIMIT 1",
          null
        )) as User[];

        if (lastUser.length === 0) {
          throw Error("Couldn't find users on the database");
        } else {
          console.log(lastUser.length)
          let lastId = parseInt(lastUser[0].id.slice(2));
          let position = getRandomValue([
            "Manager",
            "Receptionist",
            "Room Service",
          ]);
          

            await queryDb(query, [
              "U-" + (lastId + 1).toString().padStart(4, "0"),
              faker.image.avatar(),
              faker.person.fullName(),
              faker.internet.email(),
              faker.phone.number(),
              new Date(faker.date.past()).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }),
              getRandomValue(["ACTIVE", "INACTIVE"]),
              await hashPassword(password) as string,
              jobDescriptionChooser(position),
              position,
            ]);
            ;
          };
    
         

        }
  }
;



const insertJsonRooms = async () => {
  const query =
    "INSERT INTO `rooms` (id, roomType, roomNumber, description, price, discount, cancellation, thumbnail, amenities, images, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.rooms.forEach((element) => {
    let room: any = [
      element.id,
      element.roomType,
      element.roomNumber,
      element.description,
      element.price,
      element.discount,
      element.cancellation,
      element.thumbnail,
      JSON.stringify(element.amenities),
      JSON.stringify(element.images),
      element.status,
    ];
    queryDb(query, room);
  });
};

const insertFakerRooms = async (count: number) => {
  const query =
    "INSERT INTO `rooms` (id, roomType, roomNumber, description, price, discount, cancellation, thumbnail, amenities, images, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  for (let i = 0; i < count; i++) {
    const lastRoom = (await queryDb(
      "SELECT id FROM rooms ORDER BY ID DESC LIMIT 1;",
      null
    )) as Room[];

    if (lastRoom.length === 0) {
      throw Error("Couldn't find rooms on the database");
    } else {
      const lastId = parseInt(lastRoom[0].id.slice(2));
      const roomType = getRandomValue([
        "Single Bed",
        "Double Bed",
        "Double Superior",
        "Suite",
      ]);
      const room = [
        "R-" + (lastId + 1).toString().padStart(4, "0"),
        roomType,
        faker.number.int({ min: 100, max: 500 }).toString(),
        faker.lorem.paragraph(3),
        faker.number.int({ min: 20, max: 500 }),
        faker.number.int({ min: 0, max: 50 }),
        roomInfoChooser(roomType).cancelattion,
        roomInfoChooser(roomType).thumbnail,
        roomInfoChooser(roomType).amenities,
        roomInfoChooser(roomType).images,
        getRandomValue(["AVAILABLE", "BOOKED"]),
      ];
      await queryDb(query, room);
    }
  }
};

const insertJsonBookings = async () => {
  const query =
    "INSERT INTO `bookings` (id, name, orderDate, checkIn, checkOut, room, specialRequest) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.bookings.forEach((element) => {
    let booking: any = [
      element.id,
      element.name,
      element.orderDate,
      element.checkIn,
      element.checkOut,
      element.room,
      element.specialRequest,
    ];
    queryDb(query, booking);
  });
};

const insertFakerBookings = async (count: number) => {
  const roomsId = (await queryDb("SELECT id FROM rooms", null)) as Room[];

  const query =
    "INSERT INTO `bookings` (id, name, orderDate, checkIn, checkOut, room, specialRequest) VALUES (?, ?, ?, ?, ?, ?, ?)";

  for (let i = 0; i < count; i++) {
    const lastBooking = (await queryDb(
      "SELECT id FROM bookings ORDER BY ID DESC LIMIT 1;",
      null
    )) as Booking[];
    if (lastBooking.length === 0) {
      throw Error("Couldn't find bookings on the database");
    } else {
      const lastId = parseInt(lastBooking[0].id.slice(2));
      const orderDate = new Date(faker.date.past()).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }
      );
      const checkIn = new Date(
        faker.date.between({ from: orderDate, to: "03/15/2023" })
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const checkOut = new Date(
        faker.date.between({ from: checkIn, to: "03/15/2024" })
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
   
      const booking = [
        "B-" + (lastId + 1).toString().padStart(4, "0"),
        faker.person.fullName(),
        orderDate,
        checkIn,
        checkOut,
        getRandomValue(roomsId).id,
        faker.lorem.paragraph(3),
      ];
      await queryDb(query, booking);
    }
  }
};

InsertJson();
