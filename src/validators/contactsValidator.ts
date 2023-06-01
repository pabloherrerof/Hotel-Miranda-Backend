import { check, } from "express-validator";

export const validateArchiveContact = [
    check("archived")
    .exists().withMessage("Archived must exists.")
    .notEmpty().withMessage("Archived can`t be empty.")
    .isBoolean().withMessage("Archived must be true or false.")
]