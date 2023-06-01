import { Router } from "express";
import {getUsersController, getSingleUserController, updateUserController, deleteUserController, createUserController } from "../controllers/usersController";
import { validateCreateUser, validateUpdateUser } from "../validators/usersValidator";


const usersRouter = Router();
usersRouter.get("/", getUsersController );
usersRouter.get("/:userId", getSingleUserController);
usersRouter.post("/", validateCreateUser, createUserController);
usersRouter.put("/:userId", validateUpdateUser, updateUserController);
usersRouter.delete("/:userId", deleteUserController);


export {usersRouter}