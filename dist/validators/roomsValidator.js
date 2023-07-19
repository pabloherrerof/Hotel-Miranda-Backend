"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateRoom = exports.validateCreateRoom = void 0;
const express_validator_1 = require("express-validator");
exports.validateCreateRoom = [
    (0, express_validator_1.check)("roomType")
        .exists()
        .withMessage("Room Type must exists")
        .notEmpty()
        .withMessage("Room Type can't be empty")
        .isString()
        .withMessage("Room Type must be a string.")
        .custom((value) => {
        if (value !== 'Single Bed' && value !== 'Double Bed' && value !== 'Suite' && value !== 'Double Superior' && value !== 'NO DATA') {
            throw new Error("RoomType must be equal to Single Bed, Double Bed, Double Superior or Suite");
        }
        return true;
    }),
    (0, express_validator_1.check)("roomNumber")
        .exists()
        .withMessage("Room Number must exists")
        .notEmpty()
        .withMessage("Room Number can't be empty")
        .isString()
        .withMessage("Room Number must be a string."),
    (0, express_validator_1.check)("description")
        .exists()
        .withMessage("Description must exists")
        .notEmpty()
        .withMessage("Description can't be empty")
        .isString()
        .withMessage("Description must be a string."),
    (0, express_validator_1.check)("price")
        .exists()
        .withMessage("Price must exists")
        .isNumeric()
        .withMessage("Price must be a number.")
        .custom((value) => value >= 0)
        .withMessage("Price must be greater than 0.")
        .notEmpty()
        .withMessage("Price can't be empty"),
    (0, express_validator_1.check)("discount")
        .exists()
        .withMessage("Discount must exists")
        .isInt({ gt: -1, lt: 100 })
        .withMessage("Discount must be smaller than or equal to 100.")
        .notEmpty()
        .withMessage("Discount can't be empty.")
        .withMessage("Discount must be a number and no empty"),
];
exports.validateUpdateRoom = [
    (0, express_validator_1.check)("roomType")
        .exists()
        .withMessage("Room Type must exists")
        .notEmpty()
        .withMessage("Room Type can't be empty")
        .isString()
        .withMessage("Room Type must be a string.")
        .custom((value) => {
        if (value !== 'Single Bed' && value !== 'Double Bed' && value !== 'Suite' && value !== 'Double Superior') {
            throw new Error("RoomType must be equal to Single Bed, Double Bed, Double Superior or Suite");
        }
        return true;
    }),
    (0, express_validator_1.check)("roomNumber")
        .exists()
        .withMessage("Room Number must exists")
        .notEmpty()
        .withMessage("Room Number can't be empty")
        .isString()
        .withMessage("Room Number must be a string."),
    (0, express_validator_1.check)("description")
        .exists()
        .withMessage("Description must exists")
        .notEmpty()
        .withMessage("Description can't be empty")
        .isString()
        .withMessage("Description must be a string."),
    (0, express_validator_1.check)("price")
        .exists()
        .withMessage("Price must exists")
        .isNumeric()
        .withMessage("Price must be a number.")
        .custom((value) => value >= 0)
        .withMessage("Price must be greater than 0.")
        .notEmpty()
        .withMessage("Price can't be empty"),
    (0, express_validator_1.check)("discount")
        .exists()
        .withMessage("Discount must exists")
        .isInt({ gt: -1, lt: 100 })
        .withMessage("Discount must be smaller than or equal to 100.")
        .notEmpty()
        .withMessage("Discount can't be empty.")
        .withMessage("Discount must be a number and no empty"),
];