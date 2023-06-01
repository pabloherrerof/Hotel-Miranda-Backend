"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const app = express();
const bookingsRoutes_1 = require("./routes/bookingsRoutes");
const contactsRoutes_1 = require("./routes/contactsRoutes");
const roomsRoutes_1 = require("./routes/roomsRoutes");
const usersRoutes_1 = require("./routes/usersRoutes");
const PORT = process.env.PORT || 3000;
app.use("/bookings", bookingsRoutes_1.bookingsRouter);
app.use("/contacts", contactsRoutes_1.contactsRouter);
app.use("/rooms", roomsRoutes_1.roomsRouter);
app.use("/users", usersRoutes_1.usersRouter);
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
