"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateBooking = exports.validateCreateBooking = void 0;
const express_validator_1 = require("express-validator");
const moment_1 = __importDefault(require("moment"));
exports.validateCreateBooking = [
    (0, express_validator_1.check)("name")
        .exists().withMessage("Name must exists.")
        .notEmpty().withMessage("Name field can't be empty.")
        .isString().withMessage("Name must be a string"),
    (0, express_validator_1.check)("specialRequest")
        .exists().withMessage("Special request must exists.")
        .isString().withMessage("Special Request must be a string"),
    (0, express_validator_1.check)("room")
        .exists().withMessage("Room must exists.")
        .isString().withMessage("Room must be a string.")
        .notEmpty().withMessage("Room cannot be empty."),
    (0, express_validator_1.check)("checkIn")
        .exists().withMessage("Check in must exists.")
        .notEmpty().withMessage("Check in can't be empty.")
        .custom((value) => {
        const checkIn = new Date(value);
        if (!(0, moment_1.default)(value, "MM/DD/YYYY", true).isValid()) {
            throw new Error("The start date is not valid.");
        }
        return true;
    }),
    (0, express_validator_1.check)("checkOut")
        .exists().withMessage("Check out must exists.")
        .notEmpty().withMessage("The end date cannot be empty.")
        .custom((value) => {
        if (!(0, moment_1.default)(value, "MM/DD/YYYY", true).isValid()) {
            throw new Error("The end date is not valid.");
        }
        return true;
    }),
    (0, express_validator_1.check)("checkIn").custom((value, { req }) => {
        const actualDate = new Date();
        const startDate = new Date(value);
        const endDate = new Date(req.body.checkOut);
        if (startDate < actualDate) {
            throw new Error("The start date must be after the current date.");
        }
        if (startDate > endDate) {
            throw new Error("The start date must be earlier than or equal to the end date.");
        }
        return true;
    }),
];
exports.validateUpdateBooking = [
    (0, express_validator_1.check)("name")
        .exists().withMessage("Name must exists.")
        .notEmpty().withMessage("Name field can't be empty.")
        .isString().withMessage("Name must be a string"),
    (0, express_validator_1.check)("specialRequest")
        .exists().withMessage("Special request must exists.")
        .isString().withMessage("Special Request must be a string"),
    (0, express_validator_1.check)("checkIn")
        .exists().withMessage("Check in must exists.")
        .notEmpty().withMessage("Check in can't be empty.")
        .custom((value) => {
        const checkIn = new Date(value);
        if (!(0, moment_1.default)(value, "MM/DD/YYYY", true).isValid()) {
            throw new Error("The start date is not valid.");
        }
        return true;
    }),
    (0, express_validator_1.check)("checkOut")
        .exists().withMessage("Check out must exists.")
        .notEmpty().withMessage("The end date cannot be empty.")
        .custom((value) => {
        if (!(0, moment_1.default)(value, "MM/DD/YYYY", true).isValid()) {
            throw new Error("The end date is not valid.");
        }
        return true;
    }),
    (0, express_validator_1.check)("orderDate")
        .exists().withMessage("Order Date must exists.")
        .notEmpty().withMessage("The orderDate date cannot be empty.")
        .custom((value) => {
        if (!(0, moment_1.default)(value, "MM/DD/YYYY", true).isValid()) {
            throw new Error("The end date is not valid.");
        }
        return true;
    }),
    (0, express_validator_1.check)("checkIn").custom((value, { req }) => {
        const orderDate = new Date(req.body.orderDate);
        const startDate = new Date(value);
        const endDate = new Date(req.body.checkOut);
        if (startDate < orderDate) {
            throw new Error("The start date must be after the order date.");
        }
        if (startDate > endDate) {
            throw new Error("The start date must be earlier than or equal to the end date.");
        }
        return true;
    })
];
