import { Router } from "express";
import {getRoomsController, getSingleRoomController, createRoomController, updateRoomController, deleteRoomController } from "../controllers/roomsController";
import { validateCreateRoom, validateUpdateRoom } from "../validators/roomsValidator";


const roomsRouter = Router();
roomsRouter.get("/", getRoomsController );
roomsRouter.get("/:roomId", getSingleRoomController);
roomsRouter.post("/", validateCreateRoom, createRoomController);
roomsRouter.put("/:roomId", validateUpdateRoom, updateRoomController);
roomsRouter.delete("/:roomId", deleteRoomController);


export {roomsRouter}