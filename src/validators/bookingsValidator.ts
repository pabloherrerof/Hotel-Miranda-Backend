import { check, body } from "express-validator";
import moment from "moment";
import db from "../database/db.json";

export const validateCreateBooking = [
    check("name")
        .exists().withMessage("Name must exists.")
        .notEmpty().withMessage("Name field can't be empty.")
        .isString().withMessage("Name must be a string"),
    check("specialRequest")
        .exists().withMessage("Special request must exists.")
        .isString().withMessage("Special Request must be a string"),
    check("room")
        .exists().withMessage("Room must exists.")
        .isString().withMessage("Room must be a string.")
        .notEmpty().withMessage("Room cannot be empty."),
    check("checkIn")
        .exists().withMessage("Check in must exists.")
        .notEmpty().withMessage("Check in can't be empty.")
        .custom((value) => {
            const checkIn = new Date(value)
            if (!moment(value, "MM/DD/YYYY", true).isValid()) {
                throw new Error("The start date is not valid.");
            }
            return true;
        }),
    check("checkOut")
        .exists().withMessage("Check out must exists.")
        .notEmpty().withMessage("The end date cannot be empty.")
        .custom((value) => {
            if (!moment(value, "MM/DD/YYYY", true).isValid()) {
                throw new Error("The end date is not valid.");
            }
            return true;
        }),
    check("checkIn").custom((value, { req }) => {
        const actualDate = new Date();
        const startDate = new Date(value);
        const endDate = new Date(req.body.checkOut);
        if (startDate < actualDate) {
            throw new Error("The start date must be after the current date.");
        }
        if (startDate > endDate) {
            throw new Error(
                "The start date must be earlier than or equal to the end date."
            );
        }
        return true;
    }),
];

export const validateUpdateBooking = [
    check("name")
    .exists().withMessage("Name must exists.")
    .notEmpty().withMessage("Name field can't be empty.")
    .isString().withMessage("Name must be a string"),
check("specialRequest")
    .exists().withMessage("Special request must exists.")
    .isString().withMessage("Special Request must be a string"),
check("checkIn")
    .exists().withMessage("Check in must exists.")
    .notEmpty().withMessage("Check in can't be empty.")
    .custom((value) => {
        const checkIn = new Date(value)
        if (!moment(value, "MM/DD/YYYY", true).isValid()) {
            throw new Error("The start date is not valid.");
        }
        return true;
    }),
check("checkOut")
    .exists().withMessage("Check out must exists.")
    .notEmpty().withMessage("The end date cannot be empty.")
    .custom((value) => {
        if (!moment(value, "MM/DD/YYYY", true).isValid()) {
            throw new Error("The end date is not valid.");
        }
        return true;
    }),
check("orderDate")
    .exists().withMessage("Order Date must exists.")
    .notEmpty().withMessage("The orderDate date cannot be empty.")
    .custom((value) => {
        if (!moment(value, "MM/DD/YYYY", true).isValid()) {
            throw new Error("The end date is not valid.");
        }
        return true;
    }),
check("checkIn").custom((value, { req }) => {
    const orderDate = new Date(req.body.orderDate);
    const startDate = new Date(value);
    const endDate = new Date(req.body.checkOut);
    if (startDate < orderDate) {
        throw new Error("The start date must be after the order date.");
    }
    if (startDate > endDate) {
        throw new Error(
            "The start date must be earlier than or equal to the end date."
        );
    }
    return true;
})
]