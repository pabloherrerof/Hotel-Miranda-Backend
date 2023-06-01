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




const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(bodyParser.json());


app.use("/login", authRouter )
app.use("/api/bookings", passport.authenticate('jwt', { session: false }), bookingsRouter);
app.use("/api/contacts", passport.authenticate('jwt', { session: false }), contactsRouter);
app.use("/api/rooms", passport.authenticate('jwt', { session: false }), roomsRouter);
app.use("/api/users", passport.authenticate('jwt', { session: false }), usersRouter);


app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}/`)
}) 