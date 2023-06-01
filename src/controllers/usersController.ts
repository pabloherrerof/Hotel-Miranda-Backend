import { Request, Response } from "express";
import db from "../database/db.json";
import { User } from "../types/interfaces";
import {validationResult} from "express-validator";
import { getUsers, getSingleUser, updateUser, createUser, deleteUser } from "../services/usersServices";


export const getUsersController = (req: Request, res: Response) => {
  try {
    const allUsers = getUsers();
    res.status(200).send({ status: "OK", data: allUsers });
  } catch (e) {
    res.status(500).send({ status: "FAILED", e });
  }
};

export const getSingleUserController = (req: Request, res: Response) => {
  try {
    const userId = req.params["userId"];

    const singleUser = getSingleUser(userId);
    res.status(200).send({ status: "OK", data: singleUser });
  } catch (e: any) {
    console.log(e);
    res.status(500).send({ status: "FAILED", error: e.message });
  }
};

export const createUserController = (req: Request, res: Response) => {
  try {
    const { photo, name, position, email, phone, startDate, jobDescription, state, password } = req.body;
    const result = validationResult(req);
    
    if (!result.isEmpty()) {
      res.status(422).json({ errors: result.array() });
      return;
    }
    
    if (db && db.users && db.users.length > 0) {
        const lastUserId = parseInt(db.users[db.users.length - 1].id.slice(2));
        const newUser : User = {
            photo: photo,
            name: name,
            position: position,
            id:  "U-" + (lastUserId + 1).toString().padStart(4, "0"),
            email: email,
            phone: phone,
            startDate: startDate,
            jobDescription: jobDescription,
            state: state,
            password: password
          };
          const createdUser = createUser(newUser);
          res.status(201).send({ status: "OK", data: createdUser });
      } else {
        throw new Error("There's no data for users in the database.")
      }
  } catch (e: any) {
    res.status(400).send({ status: "FAILED", data: { error: e.message } });
  }
};

export const updateUserController = (req: Request, res: Response) => {
  const user = req.body
  const userId = req.params["userId"];

  const result = validationResult(req);
    
  if (!result.isEmpty()) {
    res.status(422).json({ errors: result.array() });
    return;
  }

  const updatedUser = updateUser(user, userId);

  res.status(201).send({ status: "OK", data: updatedUser });
};

export const deleteUserController = (req: Request, res: Response) => {
  try{
    const userId = req.params["userId"];
    
    const deletedIdUser = deleteUser(userId);

    res.send({ status: "OK", data: {id: deletedIdUser} });
  } catch(e:any){
    res.status(400).send({ status: "FAILED", data: { error: e.message } })
  }
};


