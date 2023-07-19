"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoomController = exports.updateRoomController = exports.createRoomController = exports.getSingleRoomController = exports.getRoomsController = void 0;
const express_validator_1 = require("express-validator");
const roomsServices_1 = require("../services/roomsServices");
const getRoomsController = async (req, res) => {
    try {
        const allRooms = await (0, roomsServices_1.getRooms)();
        res.status(200).send({ status: "200", data: allRooms });
    }
    catch (e) {
        res.status(500).send({ status: "500", e });
    }
};
exports.getRoomsController = getRoomsController;
const getSingleRoomController = async (req, res) => {
    try {
        const roomId = req.params["roomId"];
        const singleRoom = await (0, roomsServices_1.getSingleRoom)(roomId);
        res.status(200).send({ status: "200", data: singleRoom });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ status: "500", error: e.message });
    }
};
exports.getSingleRoomController = getSingleRoomController;
const createRoomController = async (req, res) => {
    try {
        const room = req.body;
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            res.status(422).json({ errors: result.array() });
            return;
        }
        const createdRoom = await (0, roomsServices_1.createRoom)(room);
        res.status(201).send({ status: "201", data: createdRoom });
    }
    catch (e) {
        res.status(400).send({ status: "400", data: { error: e.message } });
    }
};
exports.createRoomController = createRoomController;
const updateRoomController = async (req, res) => {
    try {
        const room = req.body;
        const roomId = req.params["roomId"];
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            res.status(422).json({ errors: result.array() });
            return;
        }
        const updatedRoom = await (0, roomsServices_1.updateRoom)(room, roomId);
        res.status(200).send({ status: "204", data: updatedRoom });
    }
    catch (e) {
        res.status(400).send({ status: "400", data: { error: e.message } });
    }
};
exports.updateRoomController = updateRoomController;
const deleteRoomController = async (req, res) => {
    try {
        const roomId = req.params["roomId"];
        const deletedIdRoom = await (0, roomsServices_1.deleteRoom)(roomId);
        res.send({ status: "200", data: { deletedRoom: deletedIdRoom } });
    }
    catch (e) {
        res.status(400).send({ status: "400", data: { error: e.message } });
    }
};
exports.deleteRoomController = deleteRoomController;
