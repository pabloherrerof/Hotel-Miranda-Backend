"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const usersRouter = (0, express_1.Router)();
exports.usersRouter = usersRouter;
usersRouter.get("/", usersController_1.getUsers);
usersRouter.get("/:userId", usersController_1.getSingleUser);
usersRouter.post("/:userId", usersController_1.createUser);
usersRouter.patch("/:userId", usersController_1.updateUser);
usersRouter.delete("/:userId", usersController_1.deleteUser);
