import { Request, Response } from "express";
import db from "../database/db.json";
import {  Room } from "../types/interfaces";
import {validationResult} from "express-validator";
import { getRooms, getSingleRoom, updateRoom, createRoom, deleteRoom } from "../services/roomsServices";

export const getRoomsController = (req: Request, res: Response) => {
  try {
    const allRooms = getRooms();
    res.status(200).send({ status: "OK", data: allRooms });
  } catch (e) {
    res.status(500).send({ status: "FAILED", e });
  }
};

export const getSingleRoomController = (req: Request, res: Response) => {
  try {
    const roomId = req.params["roomId"];

    const singleRoom = getSingleRoom(roomId);
    res.status(200).send({ status: "OK", data: singleRoom });
  } catch (e: any) {
    console.log(e);
    res.status(500).send({ status: "FAILED", error: e.message });
  }
};

export const createRoomController = (req: Request, res: Response) => {
  try {
    const { roomType, roomNumber, description, price, discount, cancellation, amenities, thumbnail, images, status } = req.body;
    const result = validationResult(req);
    
    if (!result.isEmpty()) {
      res.status(422).json({ errors: result.array() });
      return;
    }
    
    if (db && db.rooms && db.rooms.length > 0) {
        const lastRoomId = parseInt(db.rooms[db.rooms.length - 1].id.slice(2));
        const newRoom : Room = {
            roomType: roomType,
            roomNumber: roomNumber,
            id:  "R-" + (lastRoomId + 1).toString().padStart(4, "0"),
            description: description,
            price: price,
            discount: discount,
            cancellation: cancellation,
            amenities: amenities,
            thumbnail: thumbnail,
            images: images,
            status: status
          };
          const createdRoom = createRoom(newRoom);
          res.status(201).send({ status: "OK", data: createdRoom });
      } else {
        throw new Error("There's no data for rooms in the database.")
      }
  } catch (e: any) {
    res.status(400).send({ status: "FAILED", data: { error: e.message } });
  }
};

export const updateRoomController = (req: Request, res: Response) => {
  const room = req.body
  const roomId = req.params["roomId"];

  const result = validationResult(req);
    
  if (!result.isEmpty()) {
    res.status(422).json({ errors: result.array() });
    return;
  }

  const updatedRoom = updateRoom(room, roomId);

  res.status(201).send({ status: "OK", data: updatedRoom });
};

export const deleteRoomController = (req: Request, res: Response) => {
  try{
    const roomId = req.params["roomId"];
    
    const deletedIdRoom = deleteRoom(roomId);

    res.send({ status: "OK", data: {id: deletedIdRoom} });
  } catch(e:any){
    res.status(400).send({ status: "FAILED", data: { error: e.message } })
  }
};

