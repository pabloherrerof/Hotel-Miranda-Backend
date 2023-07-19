"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getSingleUserController = exports.getUsersController = void 0;
const express_validator_1 = require("express-validator");
const usersServices_1 = require("../services/usersServices");
const getUsersController = async (req, res) => {
    try {
        const allUsers = await (0, usersServices_1.getUsers)();
        res.status(200).send({ status: "200", data: allUsers });
    }
    catch (e) {
        res.status(500).send({ status: "500", e });
    }
};
exports.getUsersController = getUsersController;
const getSingleUserController = async (req, res) => {
    try {
        const userId = req.params["userId"];
        const singleUser = await (0, usersServices_1.getSingleUser)(userId);
        res.status(200).send({ status: "200", data: singleUser });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ status: "500", error: e.message });
    }
};
exports.getSingleUserController = getSingleUserController;
const createUserController = async (req, res) => {
    try {
        const user = req.body;
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            res.status(422).json({ errors: result.array() });
            return;
        }
        const createdUser = await (0, usersServices_1.createUser)(user);
        res.status(201).send({ status: "201", data: createdUser });
    }
    catch (e) {
        res.status(400).send({ status: "400", data: { error: e.message } });
    }
};
exports.createUserController = createUserController;
const updateUserController = async (req, res) => {
    try {
        const user = req.body;
        const userId = req.params["userId"];
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            res.status(422).json({ errors: result.array() });
            return;
        }
        const updatedUser = await (0, usersServices_1.updateUser)(user, userId);
        res.status(201).send({ status: "204", data: updatedUser });
    }
    catch (e) {
        res.status(400).send({ status: "400", data: { error: e.message } });
    }
};
exports.updateUserController = updateUserController;
const deleteUserController = async (req, res) => {
    try {
        const userId = req.params["userId"];
        const deletedIdUser = await (0, usersServices_1.deleteUser)(userId);
        res.send({ status: "200", data: { deletedUser: deletedIdUser } });
    }
    catch (e) {
        res.status(400).send({ status: "400", data: { error: e.message } });
    }
};
exports.deleteUserController = deleteUserController;
