import { check } from "express-validator";
import moment, { locale } from "moment";
import db from "../database/db.json";

export const validateCreateUser = [
  check("photo")
    .exists()
    .withMessage("Photo must exists")
    .notEmpty()
    .withMessage("Photo can't be empty")
    .isURL()
    .withMessage("Photo must be a valid URL."),
  check("name")
    .exists()
    .withMessage("Name must exists")
    .notEmpty()
    .withMessage("Name can't be empty.")
    .isString()
    .withMessage("Name must be a string."),
  check("position")
    .exists()
    .withMessage("Position must exists")
    .isString()
    .withMessage("Position must be a string")
    .custom((value) => {if (value !== 'Manager' && value !== 'Receptionist' && value !== 'Room Service' && value !== 'Administrator') {
      throw new Error("Position must be equal to Manager, Receptionist, Room Service or Administrator");
    }
    return true;
  }),
  check("email")
    .exists()
    .withMessage("Email must exists")
    .isEmail()
    .withMessage("Email must be a valid email.")
    .notEmpty()
    .withMessage("Email can't be empty"),
  check("phone")
    .exists()
    .withMessage("Phone must exists.")
    .notEmpty()
    .withMessage("Phone can't be empty")
    .isMobilePhone("any")
    .withMessage("Phone must be a valid phone number."),
  check("startDate")
    .notEmpty()
    .withMessage("The start date cannot be empty.")
    .custom((value) => {
      if (!moment(value, "MM/DD/YYYY", true).isValid()) {
        throw new Error("The end date is not valid.");
      }
      return true;
    }),
  check("state")
    .exists()
    .withMessage("State must exists.")
    .isString()
    .withMessage("State must be a string.")
    .notEmpty()
    .withMessage("State can't be empty")
    .custom((value) => {if (value !== 'ACTIVE' && value !== 'INACTIVE') {
      throw new Error("State must be ACTIVE or INACTIVE");
    }
    return true;
  }),
  check("password")
    .exists()
    .withMessage("Password must exists.")
    .isString()
    .withMessage("Password must be a string.")
    .notEmpty()
    .withMessage("Password can't be empty.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
];

export const validateUpdateUser = [
  check("photo")
    .exists()
    .withMessage("Photo must exists")
    .notEmpty()
    .withMessage("Photo can't be empty")
    .isURL()
    .withMessage("Photo must be a valid URL."),
  check("name")
    .exists()
    .withMessage("Name must exists")
    .notEmpty()
    .withMessage("Name can't be empty.")
    .isString()
    .withMessage("Name must be a string."),
  check("position")
    .exists()
    .withMessage("Position must exists")
    .isString()
    .withMessage("Position must be a string")
    .custom((value) => {if (value !== 'Manager' && value !== 'Receptionist' && value !== 'Room Service' && value !== 'Administrator') {
      throw new Error("Position must be equal to Manager, Receptionist, Room Service or Administrator");
    }
    return true;
  }),
  check("email")
    .exists()
    .withMessage("Email must exists")
    .isEmail()
    .withMessage("Email must be a valid email.")
    .notEmpty()
    .withMessage("Email can't be empty"),
  check("phone")
    .exists()
    .withMessage("Phone must exists.")
    .notEmpty()
    .withMessage("Phone can't be empty")
    .isMobilePhone("any")
    .withMessage("Phone must be a valid phone number."),
  check("startDate")
    .notEmpty()
    .withMessage("The start date cannot be empty.")
    .custom((value) => {
      if (!moment(value, "MM/DD/YYYY", true).isValid()) {
        throw new Error("The end date is not valid.");
      }
      return true;
    }),
  check("state")
    .exists()
    .withMessage("State must exists.")
    .isString()
    .withMessage("State must be a string.")
    .notEmpty()
    .withMessage("State can't be empty")
    .custom((value) => {if (value !== 'ACTIVE' && value !== 'INACTIVE') {
      throw new Error("State must be ACTIVE or INACTIVE");
    }
    return true;
  }),
  check("password")
    .optional()
    .isString()
    .withMessage("Password must be a string.")
    .notEmpty()
    .withMessage("Password can't be empty.")
];
