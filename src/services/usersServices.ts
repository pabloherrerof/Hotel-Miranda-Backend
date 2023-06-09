import { IUser } from "../types/interfaces";
import { ResultSetHeader } from "mysql2";
import { hashPassword } from "../middleware/auth";
import { connect, disconnect } from "../database/mondoDBConnection";
import { User } from "../models/users";

export const getUsers = async () => {
  try {
    await connect();
    let users: IUser[] = await User.find().exec();
    if (users.length > 0) {
      console.log(users);
      return users;
    } else throw new Error("Couldn`t find users in the database.");
  } catch (e) {
    throw e;
  } finally {
    await disconnect();
  }
};

export const getSingleUser = async (userId: IUser["id"]) => {
  try {
    await connect();
    let user = await User.findOne({ id: userId }).exec();
    if (user) {
      console.log(user);
      return user;
    } else
      throw new Error(
        `User with ID ${userId} could not be found in the database.`
      );
  } catch (error) {
    throw error;
  } finally {
    await disconnect();
  }
};

export const updateUser = async (updatedUser: IUser, userId: IUser["id"]) => {
  try {
    await connect();

    updatedUser.id = userId;
    updatedUser.jobDescription = jobDescriptionChooser(updatedUser.position);

    if (updatedUser.password) {
      console.log(updatedUser.password);
      updatedUser.password = await hashPassword(updatedUser.password);
    }

    let user = await User.findOneAndUpdate(
      { id: userId },
      {
        $set: updatedUser,
      },
      { new: true }
    ).exec();
    console.log(user);
    if (user) {
      console.log(user);
      return user;
    } else
      throw new Error(
        `User with ID ${userId} could not be found in the database.`
      );
  } catch (e) {
    throw e;
  } finally {
    await disconnect();
  }
};

export const createUser = async (newUser: IUser) => {
  try {
    await connect();
    const lastUser = (await User.findOne().sort({ id: -1 }).exec()) as IUser;
    const lastId = parseInt(lastUser.id.slice(2));

    if (!lastUser) {
      throw Error("Couldn't find users on the database");
    } else {
      let {
        id,
        name,
        photo,
        password,
        state,
        email,
        phone,
        startDate,
        position,
      } = newUser;
      id = "U-" + (lastId + 1).toString().padStart(4, "0");
      password = await hashPassword(newUser.password);
      let jobDescription = jobDescriptionChooser(newUser.position);

      const user = new User({
        id: id,
        name: name,
        password: password,
        jobDescription: jobDescription,
        position: position,
        email: email,
        state: state,
        phone: phone,
        startDate: startDate,
        photo: photo,
      });

      await user
        .save()
        .then(() => {
          console.log("User saved!");
        })
        .catch((error) => {
          throw new Error("Error saving the user " + error);
        });
      console.log(await user);
      return user;
    }
  } catch (e) {
    throw e;
  } finally {
    await disconnect();
  }
};

export const deleteUser = async (userId: IUser["id"]) => {
  try {
    await connect();
    let user = await User.findOneAndDelete({ id: userId }).exec();
    if (user) {
      console.log(user);
      return user;
    } else
      throw new Error(
        `User with ID ${userId} could not be found in the database.`
      );
  } catch (error) {
    throw error;
  } finally {
    await disconnect();
  }
};

export const jobDescriptionChooser = (position: string) => {
  if (position === "Manager") {
    return "Responsible for the hotel's daily management.";
  } else if (position === "Receptionist") {
    return "Responsible for greeting guests and checking them in and out of the hotel.";
  } else if (position === "Room Service") {
    return "Responsible for preparing and delivering food and beverages to guest rooms.";
  } else return "Administrator";
};
