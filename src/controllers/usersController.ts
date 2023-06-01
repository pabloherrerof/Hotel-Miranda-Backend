import { Request, Response } from "express";
import db from "../database/db.json";
import { User } from "../types/interfaces";
import { validationResult } from "express-validator";
import {
  getUsers,
  getSingleUser,
  updateUser,
  createUser,
  deleteUser,
} from "../services/usersServices";

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const allUsers = await getUsers();
    res.status(200).send({ status: "200", data: allUsers });
  } catch (e) {
    res.status(500).send({ status: "500", e });
  }
};

export const getSingleUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params["userId"];

    const singleUser = await getSingleUser(userId);
    res.status(200).send({ status: "200", data: singleUser });
  } catch (e: any) {
    console.log(e);
    res.status(500).send({ status: "500", error: e.message });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = validationResult(req);

    if (!result.isEmpty()) {
      res.status(422).json({ errors: result.array() });
      return;
    }
    const createdUser = await createUser(user);
    res.status(201).send({ status: "201", data: createdUser });
  } catch (e: any) {
    res.status(400).send({ status: "400", data: { error: e.message } });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const user = req.body;
  const userId = req.params["userId"];

  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(422).json({ errors: result.array() });
    return;
  }

  const updatedUser = await updateUser(user, userId);

  res.status(201).send({ status: "204", data: updatedUser });
  } catch (e: any) {
    res.status(400).send({ status: "400", data: { error: e.message } })
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params["userId"];

    const deletedIdUser = await deleteUser(userId);

    res.send({ status: "200", data: { deletedUserId: deletedIdUser } });
  } catch (e: any) {
    res.status(400).send({ status: "400", data: { error: e.message } });
  }
};
