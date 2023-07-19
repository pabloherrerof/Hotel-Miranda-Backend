"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUser = exports.validateCreateUser = void 0;
const express_validator_1 = require("express-validator");
const moment_1 = __importDefault(require("moment"));
exports.validateCreateUser = [
    (0, express_validator_1.check)("photo")
        .exists()
        .withMessage("Photo must exists")
        .notEmpty()
        .withMessage("Photo can't be empty")
        .isURL()
        .withMessage("Photo must be a valid URL."),
    (0, express_validator_1.check)("name")
        .exists()
        .withMessage("Name must exists")
        .notEmpty()
        .withMessage("Name can't be empty.")
        .isString()
        .withMessage("Name must be a string."),
    (0, express_validator_1.check)("position")
        .exists()
        .withMessage("Position must exists")
        .isString()
        .withMessage("Position must be a string")
        .custom((value) => {
        if (value !== 'Manager' && value !== 'Receptionist' && value !== 'Room Service' && value !== 'Administrator') {
            throw new Error("Position must be equal to Manager, Receptionist, Room Service or Administrator");
        }
        return true;
    }),
    (0, express_validator_1.check)("email")
        .exists()
        .withMessage("Email must exists")
        .isEmail()
        .withMessage("Email must be a valid email.")
        .notEmpty()
        .withMessage("Email can't be empty"),
    (0, express_validator_1.check)("phone")
        .exists()
        .withMessage("Phone must exists.")
        .notEmpty()
        .withMessage("Phone can't be empty")
        .isMobilePhone("any")
        .withMessage("Phone must be a valid phone number."),
    (0, express_validator_1.check)("startDate")
        .notEmpty()
        .withMessage("The start date cannot be empty.")
        .custom((value) => {
        if (!(0, moment_1.default)(value, "MM/DD/YYYY", true).isValid()) {
            throw new Error("The end date is not valid.");
        }
        return true;
    }),
    (0, express_validator_1.check)("state")
        .exists()
        .withMessage("State must exists.")
        .isString()
        .withMessage("State must be a string.")
        .notEmpty()
        .withMessage("State can't be empty")
        .custom((value) => {
        if (value !== 'ACTIVE' && value !== 'INACTIVE') {
            throw new Error("State must be ACTIVE or INACTIVE");
        }
        return true;
    }),
    (0, express_validator_1.check)("password")
        .exists()
        .withMessage("Password must exists.")
        .isString()
        .withMessage("Password must be a string.")
        .notEmpty()
        .withMessage("Password can't be empty.")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long."),
];
exports.validateUpdateUser = [
    (0, express_validator_1.check)("photo")
        .exists()
        .withMessage("Photo must exists")
        .notEmpty()
        .withMessage("Photo can't be empty")
        .isURL()
        .withMessage("Photo must be a valid URL."),
    (0, express_validator_1.check)("name")
        .exists()
        .withMessage("Name must exists")
        .notEmpty()
        .withMessage("Name can't be empty.")
        .isString()
        .withMessage("Name must be a string."),
    (0, express_validator_1.check)("position")
        .exists()
        .withMessage("Position must exists")
        .isString()
        .withMessage("Position must be a string")
        .custom((value) => {
        if (value !== 'Manager' && value !== 'Receptionist' && value !== 'Room Service' && value !== 'Administrator') {
            throw new Error("Position must be equal to Manager, Receptionist, Room Service or Administrator");
        }
        return true;
    }),
    (0, express_validator_1.check)("email")
        .exists()
        .withMessage("Email must exists")
        .isEmail()
        .withMessage("Email must be a valid email.")
        .notEmpty()
        .withMessage("Email can't be empty"),
    (0, express_validator_1.check)("phone")
        .exists()
        .withMessage("Phone must exists.")
        .notEmpty()
        .withMessage("Phone can't be empty")
        .isMobilePhone("any")
        .withMessage("Phone must be a valid phone number."),
    (0, express_validator_1.check)("startDate")
        .notEmpty()
        .withMessage("The start date cannot be empty.")
        .custom((value) => {
        if (!(0, moment_1.default)(value, "MM/DD/YYYY", true).isValid()) {
            throw new Error("The end date is not valid.");
        }
        return true;
    }),
    (0, express_validator_1.check)("state")
        .exists()
        .withMessage("State must exists.")
        .isString()
        .withMessage("State must be a string.")
        .notEmpty()
        .withMessage("State can't be empty")
        .custom((value) => {
        if (value !== 'ACTIVE' && value !== 'INACTIVE') {
            throw new Error("State must be ACTIVE or INACTIVE");
        }
        return true;
    }),
    (0, express_validator_1.check)("password")
        .optional()
        .isString()
        .withMessage("Password must be a string.")
        .notEmpty()
        .withMessage("Password can't be empty.")
];
