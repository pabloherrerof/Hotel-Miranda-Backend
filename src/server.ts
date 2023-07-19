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
import awsServerlessExpress from "aws-serverless-express";
import serverless from 'serverless-http';


const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use(cors());

app.use("/login", authRouter )
app.get('/', (req, res) => res.send({
    name: "HOTEL MIRANDA REST API",
    endpoints: [{
        bookings: {
            methods: "GET/GET(single)/POST/PUT/DELETE",
            path: "/api/bookings"
        },
        rooms: {methods: "GET/GET(single)/POST/PUT/DELETE",
                path: "api/rooms" },
        contacts: {
            methods: "GET/PUT",
            path: "/api/contacts"},
            
        users: {
            methods: "GET/GET(single)/POST/PUT/DELETE",
            path: "/api/users"}
            
    }]
}))
app.use("/api/bookings", passport.authenticate('jwt', { session: false }), bookingsRouter);
app.use("/api/contacts", passport.authenticate('jwt', { session: false }), contactsRouter);
app.use("/api/rooms", passport.authenticate('jwt', { session: false }), roomsRouter);
app.use("/api/users", passport.authenticate('jwt', { session: false }), usersRouter);

mongoose.connect(String(process.env.MONGO_DB));
const db = mongoose.connection;

db.once('open', () => {
    console.log('Successfully connected to the database!');
  });

/* export const server = awsServerlessExpress.createServer(app);
exports.handler = (event: any, context: any) =>{
    awsServerlessExpress.proxy(server, event, context);
}   */ 

/* export const server = app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}/`)
})    */

export const handler = serverless(app);

