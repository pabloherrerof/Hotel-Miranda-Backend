"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const connect = async () => {
    try {
        console.log("connected");
        await mongoose_1.default.connect(String(process.env.MONGO_DB));
    }
    catch (error) {
        console.log("MongoDB connection error: ", error);
    }
};
exports.connect = connect;
const disconnect = async () => {
    try {
        console.log("disconnected");
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.log("MongoDB disconnection error: ", error);
    }
};
exports.disconnect = disconnect;
