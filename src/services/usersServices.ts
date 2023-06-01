import db from "../database/db.json";
import { User } from "../types/interfaces";
import { saveToDatabase } from "../database/utils";
import { queryDb } from "../database/mysqlConnector";
import { ResultSetHeader } from "mysql2";
import { hashPassword } from "../middleware/auth";

export const getUsers = async() => {
  try {
    const query = "SELECT * from users";
    return await queryDb(query, null);
  } catch (e) {
    throw e;
  }
};


export const getSingleUser = async (userId: User["id"]) => {
  try {
    const query = "SELECT * from users WHERE id= ?;";
    const booking = (await queryDb(query, [userId])) as User[];

    if (booking.length === 0) {
      throw new Error("User not found!");
    } else {
      return booking;
    }
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (updatedUser : User, userId: User["id"]) => {
  try {
    if(updatedUser.password != ""){
      updatedUser.password = await hashPassword(updatedUser.password);
      const query = "UPDATE users SET photo=?, name=?, email=?, phone=?, startDate=?, state=?, password=?, jobDescription=?, position= ? WHERE id=?";
      const userDb = (await queryDb(query, [
        updatedUser.photo, 
        updatedUser.name,
        updatedUser.email,
        updatedUser.phone,
        updatedUser.startDate,
        updatedUser.state,
        updatedUser.password,
        jobDescriptionChooser(updatedUser.position),
        updatedUser.position,
        userId
      ])) as ResultSetHeader;
  
  
     if (userDb.affectedRows === 0) {
        throw new Error("Couldn't update the user.");
      } else return getSingleUser(userId); 
    } else {
      const query = "UPDATE users SET photo=?, name=?, email=?, phone=?, startDate=?, state=?,jobDescription=?, position= ? WHERE id=?";
      const userDb = (await queryDb(query, [
        updatedUser.photo, 
        updatedUser.name,
        updatedUser.email,
        updatedUser.phone,
        updatedUser.startDate,
        updatedUser.state,
        jobDescriptionChooser(updatedUser.position),
        updatedUser.position,
        userId
      ])) as ResultSetHeader;
  
  
     if (userDb.affectedRows === 0) {
        throw new Error("Couldn't update the user.");
      } else return getSingleUser(userId); 
    }
  } catch (e) {
    throw e;
  }
};


export const createUser = async (user: User) => {
  try {
    const lastUser = (await queryDb(
      "SELECT id FROM users ORDER BY ID DESC LIMIT 1;",
      null
    )) as User[];

    if (lastUser.length === 0) {
      throw Error("Couldn't find users on the database");
    } else {
      const lastId = parseInt(lastUser[0].id.slice(2));
      const newUser = [
        "U-" + (lastId + 1).toString().padStart(4, "0"),
        user.photo,
        user.name,
        user.email,
        user.phone,
        user.startDate,
        user.state,
        await hashPassword(user.password),
        jobDescriptionChooser(user.position),
        user.position
      ];
      const createdUser = await queryDb(
        'INSERT INTO `users` (id, photo, name, email, phone, startDate, state, password, jobDescription, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        newUser
      ) as ResultSetHeader ;

     if (createdUser.affectedRows === 0) {
        throw new Error("User not found!");
      } else return await getSingleUser(newUser[0]);
    }
  } catch (e) {
    throw e;
  }
};

export const deleteUser = async (userId: User["id"]) => {
  try {
    const query = "DELETE FROM users WHERE id= ?;";
    const user = await queryDb(query, [userId]) as ResultSetHeader;
   if(user.affectedRows === 0){
      throw new Error ("Couldn't delete the user.")
    } else {
      return userId;
    } 
  } catch (error) {
    throw error;
  }
};

export const jobDescriptionChooser = (position: string) => {
  if (position === "Manager") {
    return "Responsible for the hotel's daily management.";
  } else if (position === "Receptionist") {
    return "Responsible for greeting guests and checking them in and out of the hotel.";
  } else if (position === "Room Service") {
    return "Responsible for preparing and delivering food and beverages to guest rooms.";
  } else return "";
} 