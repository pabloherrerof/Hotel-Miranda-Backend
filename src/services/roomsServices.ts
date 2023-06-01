import db from "../database/db.json";
import { Room } from "../types/interfaces";
import { saveToDatabase } from "../database/utils";

export const getRooms = () => {
  if(!db.rooms || db.rooms.length === 0){
    throw new Error("Rooms not found!")
  }
  return db.rooms;
};


export const getSingleRoom = (roomId: Room["id"]) => {
  const room = db.rooms.find((room) => room.id === roomId);

  if (!room) {
    throw new Error("Room not found!");
  }
  return room;
};

export const updateRoom = (updatedRoom : Room, roomId: Room["id"]) => {
  const indexToUpdate = db.rooms.findIndex((room) => room.id === roomId);
 
 if (indexToUpdate < 0) {
  throw new Error("Room not found!");
}
  db.rooms[indexToUpdate] = updatedRoom;
  saveToDatabase(db);
  return db.rooms[indexToUpdate];
};


export const createRoom = (newRoom: Room) => {
  db.rooms.push(newRoom);
  saveToDatabase(db);
  return newRoom;
};

export const deleteRoom = (roomId: Room["id"]) => {
 const indexToDelete = db.rooms.findIndex((room) => room.id === roomId);
 
 if (indexToDelete === -1) {
  throw new Error("Room not found!");
}
const idRoom = db.rooms[indexToDelete].id;
  db.rooms.splice(indexToDelete, 1);
  saveToDatabase(db);
  return idRoom;
};
