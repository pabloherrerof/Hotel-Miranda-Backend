import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  getRooms,
  getSingleRoom,
  updateRoom,
  createRoom,
  deleteRoom,
} from "../services/roomsServices";

export const getRoomsController = async (req: Request, res: Response) => {
  try {
    const allRooms = await getRooms();
    res.status(200).send({ status: "200", data: allRooms });
  } catch (e) {
    res.status(500).send({ status: "500", e });
  }
};

export const getSingleRoomController = async (req: Request, res: Response) => {
  try {
    const roomId = req.params["roomId"];

    const singleRoom = await getSingleRoom(roomId);
    res.status(200).send({ status: "200", data: singleRoom });
  } catch (e: any) {
    console.log(e);
    res.status(500).send({ status: "500", error: e.message });
  }
};

export const createRoomController = async (req: Request, res: Response) => {
  try {
    const room = req.body;
    const result = validationResult(req);

    if (!result.isEmpty()) {
      res.status(422).json({ errors: result.array() });
      return;
    }

    const createdRoom = await createRoom(room);
    res.status(201).send({ status: "201", data: createdRoom });
  } catch (e: any) {
    res.status(400).send({ status: "400", data: { error: e.message } });
  }
};

export const updateRoomController = async (req: Request, res: Response) => {
 try{
  const room = req.body;
  const roomId = req.params["roomId"];

  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(422).json({ errors: result.array() });
    return;
  }
  const updatedRoom = await updateRoom(room, roomId);

  res.status(200).send({ status: "204", data: updatedRoom });
 } catch(e: any){
  res.status(400).send({ status: "400", data: { error: e.message } })
 }
};

export const deleteRoomController = async (req: Request, res: Response) => {
  try {
    const roomId = req.params["roomId"];

    const deletedIdRoom = await deleteRoom(roomId);

    res.send({ status: "200", data: { deletedRoom: deletedIdRoom} });
  } catch (e: any) {
    res.status(400).send({ status: "400", data: { error: e.message } });
  }
};

