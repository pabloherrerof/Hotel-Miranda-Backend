"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const bookingsRoutes_1 = require("./routes/bookingsRoutes");
const contactsRoutes_1 = require("./routes/contactsRoutes");
const roomsRoutes_1 = require("./routes/roomsRoutes");
const usersRoutes_1 = require("./routes/usersRoutes");
require("./middleware/auth");
const passport_1 = __importDefault(require("passport"));
const authRoutes_1 = require("./routes/authRoutes");
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/login", authRoutes_1.authRouter);
app.get('/', (req, res) => res.send({
    name: "HOTEL MIRANDA REST API",
    endpoints: [{
            bookings: {
                methods: "GET/GET(single)/POST/PUT/DELETE",
                path: "/api/bookings"
            },
            rooms: { methods: "GET/GET(single)/POST/PUT/DELETE",
                path: "api/rooms" },
            contacts: {
                methods: "GET/PUT",
                path: "/api/contacts"
            },
            users: {
                methods: "GET/GET(single)/POST/PUT/DELETE",
                path: "/api/users"
            }
        }]
}));
app.use("/api/bookings", passport_1.default.authenticate('jwt', { session: false }), bookingsRoutes_1.bookingsRouter);
app.use("/api/contacts", passport_1.default.authenticate('jwt', { session: false }), contactsRoutes_1.contactsRouter);
app.use("/api/rooms", passport_1.default.authenticate('jwt', { session: false }), roomsRoutes_1.roomsRouter);
app.use("/api/users", passport_1.default.authenticate('jwt', { session: false }), usersRoutes_1.usersRouter);
mongoose_1.default.connect(String(process.env.MONGO_DB));
const db = mongoose_1.default.connection;
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
exports.handler = (0, serverless_http_1.default)(app);
