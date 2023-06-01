import db from "../database/db.json";
import { Booking, Room } from "../types/interfaces";
import { saveToDatabase } from "../database/utils";
import { queryDb, } from "../database/mysqlConnector";
import { ResultSetHeader } from "mysql2";


export const getRooms = async () => {
  try {
    const query = "SELECT * from rooms";

    return await queryDb(query, null);
  } catch (e) {
    throw e;
  }
};

export const getSingleRoom = async (roomId: Room["id"]) => {
  try {
    const query = "SELECT * from rooms WHERE id= ?;";
    const room = (await queryDb(query, [roomId])) as Room[];

    if (room.length === 0) {
      throw new Error("Room not found!");
    } else {
      return room;
    }
  } catch (error) {
    throw error;
  }
};

export const updateRoom = async (updatedRoom: Room, roomId: Room["id"]) => {
  try {
    const {
      roomType,
      roomNumber,
      description,
      price,
      discount,
      cancellation,
      amenities,
      thumbnail,
      images,
      status,
    } = updatedRoom;
    
    const query =
      "UPDATE rooms SET roomType=?, roomNumber=?, description=?, price=?, discount=?, cancellation=?, thumbnail=?, amenities=?, images=?, status=? WHERE id=?";

    const roomDb = await queryDb(query, [
      roomType,
      roomNumber,
      description,
      price,
      discount,
      roomInfoChooser(roomType).cancelattion,
      roomInfoChooser(roomType).thumbnail,
      JSON.stringify(roomInfoChooser(roomType).amenities),
      JSON.stringify(roomInfoChooser(roomType).images),
      status,
      roomId
    ]) as ResultSetHeader;

    if(roomDb.affectedRows === 0){
      throw new Error("Couldn't create the Room.")
    } else return getSingleRoom(roomId);
  } catch (e) {
    throw e;
  }
};

export const createRoom = async (newRoom: Room) => {
  try {
    const lastRoom = (await queryDb(
      "SELECT id FROM rooms ORDER BY ID DESC LIMIT 1;",
      null
    )) as Room[];

    if (lastRoom.length === 0) {
      throw Error("Couldn't find rooms on the database");
    } else {
      const lastId = parseInt(lastRoom[0].id.slice(2));
      const id = "R-" + (lastId + 1).toString().padStart(4, "0")
    
    const roomDb = await queryDb("INSERT INTO rooms (id, roomType, roomNumber, description, price, discount, cancellation, amenities, thumbnail, images, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
      id,
      newRoom.roomType,
      newRoom.roomNumber,
      newRoom.description,
      newRoom.price,
      newRoom.discount,
      roomInfoChooser(newRoom.roomType).cancelattion,
      JSON.stringify(roomInfoChooser(newRoom.roomType).amenities),
      roomInfoChooser(newRoom.roomType).thumbnail,
      JSON.stringify(roomInfoChooser(newRoom.roomType).images),
      newRoom.status,
    ]) as ResultSetHeader;
      
    if(roomDb.affectedRows === 0){
      throw new Error("Couldn't create the Room.")
    } else return getSingleRoom(id); 
    } 
  } catch (e) {
    throw e;
  }
};

export const deleteRoom = async (roomId: Room["id"]) => {
  try {
    const query = "DELETE FROM rooms WHERE id= ?;";
    const room = await queryDb(query, [roomId]) as ResultSetHeader ;
    if(room.affectedRows === 0){
      throw new Error ("Couldn't delete the room.")
    } else {
      return roomId;
    }
  } catch (e) {
    throw e;
  }
}; 


export const roomInfoChooser = (roomType: string) => {
  switch (roomType) {
    case "Single Bed":
      return {
        cancelattion:
          "You can cancel up to 24 hours before check-in without penalty.",
        amenities: ["Wi-Fi", "TV", "Air conditioning"],
        thumbnail: "https://images.unsplash.com/photo-1619011502686-b512e3989a33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80",
        images: [
          "https://images.unsplash.com/photo-1619011502686-b512e3989a33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80",
          "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
          "https://images.unsplash.com/photo-1486946255434-2466348c2166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        ]
      };
    case "Double Bed":
      return {
        cancelattion:
          "You can cancel up to 48 hours before check-in without penalty.",
        amenities: ["Wi-Fi", "TV", "A/C", "Air conditioning", "Safe"],
        thumbnail: "https://images.unsplash.com/photo-1576354302919-96748cb8299e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=658&q=80",
        images: [
          "https://images.unsplash.com/photo-1576354302919-96748cb8299e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=658&q=80",
          "https://images.unsplash.com/photo-1604014237256-11d475e2a2d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
          "https://plus.unsplash.com/premium_photo-1676320514027-c3259eb9a73a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        ]
      };
    case "Double Superior":
      return {
        cancelattion:
          "You can cancel up to 72 hours before check-in without penalty.",
        amenities: ["Wi-Fi", "TV", "Safe", "Bathtub", "Air conditioning"],
        thumbnail: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        images: [
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
          "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1558&q=80"
        ]
      };
    case "Suite":
      return {
        cancelattion:
          "You can cancel up to 1 week before check-in without penalty.",
        amenities: [
          "Wi-Fi",
          "TV",
          "Kitchen",
          "Hair dryer",
          "Air conditioning",
          "Bathtub",
          "Safe",
        ],
        thumbnail: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        images: [
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
          "https://images.unsplash.com/photo-1580229080435-1c7e2ce835c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
          "https://images.unsplash.com/photo-1600566752229-250ed79470f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2039&q=80"

        ]
      };

    default:
      return{
        cancellation: "",
        amenities: "",
        thumbnail: "",
        images: []
      };
  }
};