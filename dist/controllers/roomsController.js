"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.updateRoom = exports.createRoom = exports.getSingleRoom = exports.getRooms = void 0;
const rooms_json_1 = __importDefault(require("../data/rooms.json"));
const getRooms = (req, res) => {
    res.send(rooms_json_1.default);
};
exports.getRooms = getRooms;
const getSingleRoom = (req, res) => {
    const roomId = req.params.roomId;
    const room = rooms_json_1.default.find(room => room.id === roomId);
    if (!room) {
        return res.status(404).send(`Could not find user with id => ${roomId}.`);
    }
    res.send(room);
};
exports.getSingleRoom = getSingleRoom;
const createRoom = (req, res) => {
    res.send("Create room");
};
exports.createRoom = createRoom;
const updateRoom = (req, res) => {
    res.send("Update room");
};
exports.updateRoom = updateRoom;
const deleteRoom = (req, res) => {
    res.send("Delete room");
};
exports.deleteRoom = deleteRoom;
