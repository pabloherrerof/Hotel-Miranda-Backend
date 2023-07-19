"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobDescriptionChooser = exports.deleteUser = exports.createUser = exports.updateUser = exports.getSingleUser = exports.getUsers = void 0;
const auth_1 = require("../middleware/auth");
const users_1 = require("../models/users");
const getUsers = async () => {
    try {
        let users = await users_1.User.find().sort({ id: 1 }).exec();
        if (users.length > 0) {
            ;
            return users;
        }
        else
            throw new Error("Couldn`t find users in the database.");
    }
    catch (e) {
        throw e;
    }
};
exports.getUsers = getUsers;
const getSingleUser = async (userId) => {
    try {
        let user = await users_1.User.findOne({ id: userId }).exec();
        if (user) {
            return user;
        }
        else
            throw new Error(`User with ID ${userId} could not be found in the database.`);
    }
    catch (error) {
        throw error;
    }
};
exports.getSingleUser = getSingleUser;
const updateUser = async (updatedUser, userId) => {
    try {
        updatedUser.id = userId;
        updatedUser.jobDescription = (0, exports.jobDescriptionChooser)(updatedUser.position);
        if (updatedUser.password) {
            updatedUser.password = await (0, auth_1.hashPassword)(updatedUser.password);
        }
        let user = await users_1.User.findOneAndUpdate({ id: userId }, {
            $set: updatedUser,
        }, { new: true }).exec();
        console.log(user);
        if (user) {
            console.log(user);
            return user;
        }
        else
            throw new Error(`User with ID ${userId} could not be found in the database.`);
    }
    catch (e) {
        throw e;
    }
};
exports.updateUser = updateUser;
const createUser = async (newUser) => {
    try {
        const lastUser = (await users_1.User.findOne().sort({ id: -1 }).exec());
        const lastId = parseInt(lastUser.id.slice(2));
        if (!lastUser) {
            throw Error("Couldn't find users on the database");
        }
        else {
            let { id, name, photo, password, state, email, phone, startDate, position, } = newUser;
            id = "U-" + (lastId + 1).toString().padStart(4, "0");
            password = await (0, auth_1.hashPassword)(newUser.password);
            let jobDescription = (0, exports.jobDescriptionChooser)(newUser.position);
            const user = new users_1.User({
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
    }
    catch (e) {
        throw e;
    }
};
exports.createUser = createUser;
const deleteUser = async (userId) => {
    try {
        let user = await users_1.User.findOneAndDelete({ id: userId }).exec();
        if (user) {
            console.log(user);
            return user;
        }
        else
            throw new Error(`User with ID ${userId} could not be found in the database.`);
    }
    catch (error) {
        throw error;
    }
};
exports.deleteUser = deleteUser;
const jobDescriptionChooser = (position) => {
    if (position === "Manager") {
        return "Responsible for the hotel's daily management.";
    }
    else if (position === "Receptionist") {
        return "Responsible for greeting guests and checking them in and out of the hotel.";
    }
    else if (position === "Room Service") {
        return "Responsible for preparing and delivering food and beverages to guest rooms.";
    }
    else
        return "Administrator";
};
exports.jobDescriptionChooser = jobDescriptionChooser;
