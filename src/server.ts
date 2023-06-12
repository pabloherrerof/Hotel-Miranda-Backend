import  express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import { bookingsRouter } from "./routes/bookingsRoutes";
import {contactsRouter} from "./routes/contactsRoutes"
import { roomsRouter } from "./routes/roomsRoutes";
import { usersRouter } from "./routes/usersRoutes";
import "./middleware/auth"
import passport from 'passport';
import { authRouter } from './routes/authRoutes';
import "dotenv/config"
import mongoose from 'mongoose';


const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());



app.use("/login", cors(), authRouter )
app.use("/api/bookings",cors(), passport.authenticate('jwt', { session: false }), bookingsRouter);
app.use("/api/contacts",cors(), passport.authenticate('jwt', { session: false }), contactsRouter);
app.use("/api/rooms",cors(), passport.authenticate('jwt', { session: false }), roomsRouter);
app.use("/api/users",cors(), passport.authenticate('jwt', { session: false }), usersRouter);

mongoose.connect(String(process.env.MONGO_DB));



export const server = app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}/`)
}) 

