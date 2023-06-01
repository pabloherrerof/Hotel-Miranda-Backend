"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.deleteUser = exports.updateUser = exports.getSingleUser = exports.getUsers = void 0;
const users_json_1 = __importDefault(require("../data/users.json"));
const getUsers = (req, res) => {
    res.send(users_json_1.default);
};
exports.getUsers = getUsers;
const getSingleUser = (req, res) => {
    const userId = req.params.userId;
    const user = users_json_1.default.find(user => user.id === userId);
    if (!user) {
        return res.status(404).send(`Could not find user with id => ${userId}.`);
    }
    res.send(user);
};
exports.getSingleUser = getSingleUser;
const createUser = (req, res) => {
    res.send("Create user");
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    res.send("Update user");
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    res.send("Delete user");
};
exports.deleteUser = deleteUser;
