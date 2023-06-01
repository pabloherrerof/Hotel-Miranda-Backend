import db from "../database/db.json";
import { User } from "../types/interfaces";
import { saveToDatabase } from "../database/utils";

export const getUsers = () => {
  if(!db.users || db.users.length === 0){
    throw new Error("Users not found!")
  }
  return db.users;
};


export const getSingleUser = (userId: User["id"]) => {
  const user = db.users.find((user) => user.id === userId);

  if (!user) {
    throw new Error("User not found!");
  }
  return user;
};

export const updateUser = (updatedUser : User, userId: User["id"]) => {
  const indexToUpdate = db.users.findIndex((user) => user.id === userId);
 
 if (indexToUpdate < 0) {
  throw new Error("User not found!");
}
  db.users[indexToUpdate] = updatedUser;
  saveToDatabase(db);
  return db.users[indexToUpdate];
};


export const createUser = (newUser: User) => {
  db.users.push(newUser);
  saveToDatabase(db);
  return newUser;
};

export const deleteUser = (userId: User["id"]) => {
 const indexToDelete = db.users.findIndex((user) => user.id === userId);
 
 if (indexToDelete === -1) {
  throw new Error("User not found!");
}
const idUser = db.users[indexToDelete].id;
  db.users.splice(indexToDelete, 1);
  saveToDatabase(db);
  return idUser;
};
