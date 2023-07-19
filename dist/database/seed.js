"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const db_json_1 = __importDefault(require("./db.json"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const usersServices_1 = require("../services/usersServices");
const roomsServices_1 = require("../services/roomsServices");
const auth_1 = require("../middleware/auth");
const contacts_1 = require("../models/contacts");
const mondoDBConnection_1 = require("./mondoDBConnection");
const users_1 = require("../models/users");
const rooms_1 = require("../models/rooms");
const booking_1 = require("../models/booking");
const InsertAll = async () => {
    await (0, mondoDBConnection_1.connect)();
    await insertJSON();
    await Promise.all([await insertFaker()]);
    await (0, mondoDBConnection_1.disconnect)();
};
const insertJSON = async () => {
    await insertJsonRooms();
    await Promise.all([
        await insertJsonContacts(),
        await insertJsonUsers(),
        await insertJsonBookings(),
    ]);
};
const insertFaker = async () => {
    await insertFakerRooms(10);
    await Promise.all([await insertFakerContacts(10), await insertFakerUsers(10), await insertFakerBookings(10)]);
};
const getRandomValue = (arr) => {
    const indiceAleatorio = Math.floor(Math.random() * arr.length);
    return arr[indiceAleatorio];
};
const insertJsonContacts = async () => {
    try {
        db_json_1.default.contacts.forEach(async (element) => {
            let contact = await new contacts_1.Contact({
                id: element.id,
                date: element.date,
                customer: element.customer,
                archived: element.archived,
                subject: element.subject,
                comment: element.comment,
            })
                .save()
                .then(() => {
                console.log("Contact saved!");
            })
                .catch((error) => {
                console.error("Error saving the contact: ", error);
            });
        });
    }
    catch (error) {
        console.error("Error saving the contacts: ", error);
    }
};
const insertFakerContacts = async (count) => {
    for (let i = 0; i < count; i++) {
        const lastContact = await contacts_1.Contact.findOne().sort({ id: -1 }).exec();
        if (!lastContact) {
            throw Error("Couldn't find contacts on the database");
        }
        else {
            let id = parseInt(lastContact.id.slice(2));
            let contact = await new contacts_1.Contact({
                id: "C-" + (id + 1).toString().padStart(4, "0"),
                date: new Date(faker_1.faker.date.past()).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }),
                customer: {
                    name: faker_1.faker.person.fullName(),
                    email: faker_1.faker.internet.email(),
                    phone: faker_1.faker.phone.number(),
                },
                archived: getRandomValue([true, false]),
                subject: faker_1.faker.lorem.sentence(5),
                comment: faker_1.faker.lorem.paragraph(4),
            })
                .save()
                .then(() => {
                console.log("Contact saved!");
            })
                .catch((error) => {
                console.error("Error saving the contact: ", error);
            });
        }
        ;
    }
};
const insertJsonUsers = async () => {
    db_json_1.default.users.forEach(async (element) => {
        const saltRounds = 10;
        bcrypt_1.default.genSalt(saltRounds, (err, salt) => {
            bcrypt_1.default.hash(element.password, salt, (err, hash) => {
                element.password = hash;
                let user = new users_1.User({
                    id: element.id,
                    photo: element.photo,
                    name: element.name,
                    email: element.email,
                    phone: element.phone,
                    startDate: element.startDate,
                    state: element.state,
                    password: element.password,
                    jobDescription: element.jobDescription,
                    position: element.position,
                })
                    .save()
                    .then(() => {
                    console.log("User saved!");
                })
                    .catch((error) => {
                    console.error("Error saving the user: ", error);
                });
            });
        });
    });
};
const insertFakerUsers = async (count) => {
    for (let i = 0; i < count; i++) {
        const lastUser = await users_1.User.findOne().sort({ id: -1 }).exec();
        let password = faker_1.faker.internet.password();
        if (!lastUser) {
            throw Error("Couldn't find users on the database");
        }
        else {
            let id = parseInt(lastUser.id.slice(2));
            let position = getRandomValue([
                "Manager",
                "Receptionist",
                "Room Service",
            ]);
            let user = await new users_1.User({
                id: "U-" + (id + 1).toString().padStart(4, "0"),
                photo: faker_1.faker.image.avatar(),
                name: faker_1.faker.person.fullName(),
                email: faker_1.faker.internet.email(),
                phone: faker_1.faker.phone.number(),
                startDate: new Date(faker_1.faker.date.past()).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }),
                state: getRandomValue(["ACTIVE", "INACTIVE"]),
                password: (await (0, auth_1.hashPassword)(password)),
                jobDescription: (0, usersServices_1.jobDescriptionChooser)(position),
                position: position,
            })
                .save()
                .then(() => {
                console.log("User saved!");
            })
                .catch((error) => {
                console.error("Error saving the user: ", error);
            });
        }
    }
};
const insertJsonRooms = async () => {
    db_json_1.default.rooms.forEach(async (element) => {
        let room = await new rooms_1.Room({
            id: element.id,
            roomType: element.roomType,
            roomNumber: element.roomNumber,
            description: element.description,
            price: element.price,
            discount: element.discount,
            cancellation: element.cancellation,
            thumbnail: element.thumbnail,
            amenities: element.amenities,
            images: element.images,
        }).save()
            .then(() => {
            console.log("Room saved!");
        })
            .catch((error) => {
            console.error("Error saving the room: ", error);
        });
    });
};
const insertFakerRooms = async (count) => {
    for (let i = 0; i < count; i++) {
        const lastRoom = await rooms_1.Room.findOne().sort({ id: -1 }).exec();
        if (!lastRoom) {
            throw Error("Couldn't find rooms on the database");
        }
        else {
            const lastId = parseInt(lastRoom.id.slice(2));
            const roomType = getRandomValue([
                "Single Bed",
                "Double Bed",
                "Double Superior",
                "Suite",
            ]);
            const room = await new rooms_1.Room({
                id: "R-" + (lastId + 1).toString().padStart(4, "0"),
                roomType: roomType,
                roomNumber: faker_1.faker.number.int({ min: 100, max: 500 }).toString(),
                description: faker_1.faker.lorem.paragraph(3),
                price: faker_1.faker.number.int({ min: 20, max: 500 }),
                discount: faker_1.faker.number.int({ min: 0, max: 50 }),
                cancellation: (0, roomsServices_1.roomInfoChooser)(roomType).cancellation,
                thumbnail: (0, roomsServices_1.roomInfoChooser)(roomType).thumbnail,
                amenities: (0, roomsServices_1.roomInfoChooser)(roomType).amenities,
                images: (0, roomsServices_1.roomInfoChooser)(roomType).images,
            }).save()
                .then(() => {
                console.log("Room saved!");
            })
                .catch((error) => {
                console.error("Error saving the room: ", error);
            });
        }
    }
};
const insertJsonBookings = async () => {
    db_json_1.default.bookings.forEach(async (element) => {
        let booking = await new booking_1.Booking({
            id: element.id,
            name: element.name,
            orderDate: element.orderDate,
            checkIn: element.checkIn,
            checkOut: element.checkOut,
            room: element.room,
            specialRequest: element.specialRequest,
        }).save()
            .then(() => {
            console.log("Booking saved!");
        })
            .catch((error) => {
            console.error("Error saving the booking: ", error);
        });
    });
};
const insertFakerBookings = async (count) => {
    const roomsId = await rooms_1.Room.find({}, 'id');
    roomsId.filter((room) => room.id !== "R-0000");
    for (let i = 0; i < count; i++) {
        const lastBooking = await booking_1.Booking.findOne().sort({ id: -1 }).exec();
        if (!lastBooking) {
            throw Error("Couldn't find bookings on the database");
        }
        else {
            const lastId = parseInt(lastBooking.id.slice(2));
            const orderDate = new Date(faker_1.faker.date.past()).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
            const checkIn = new Date(faker_1.faker.date.soon({})).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
            const checkOut = new Date(faker_1.faker.date.soon({ days: getRandomValue([3, 4, 5, 8, 9]), refDate: checkIn })).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
            const booking = await new booking_1.Booking({
                id: "B-" + (lastId + 1).toString().padStart(4, "0"),
                name: faker_1.faker.person.fullName(),
                orderDate: orderDate,
                checkIn: checkIn,
                checkOut: checkOut,
                room: getRandomValue(roomsId).id,
                specialRequest: faker_1.faker.lorem.paragraph(3),
            }).save()
                .then(() => {
                console.log("Booking saved!");
            })
                .catch((error) => {
                console.error("Error saving the booking: ", error);
            });
        }
    }
};
InsertAll();
