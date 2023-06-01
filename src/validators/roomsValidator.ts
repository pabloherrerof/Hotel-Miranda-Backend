import { check } from "express-validator";
import db from "../database/db.json";

export const validateCreateRoom = [
  check("roomType")
    .exists()
    .withMessage("Room Type must exists")
    .notEmpty()
    .withMessage("Room Type can't be empty")
    .isString()
    .withMessage("Room Type must be a string."),
  check("roomNumber")
    .exists()
    .withMessage("Room Number must exists")
    .notEmpty()
    .withMessage("Room Number can't be empty")
    .isString()
    .withMessage("Room Number must be a string."),
  check("description")
    .exists()
    .withMessage("Description must exists")
    .notEmpty()
    .withMessage("Description can't be empty")
    .isString()
    .withMessage("Description must be a string."),
  check("price")
    .exists()
    .withMessage("Price must exists")
    .isNumeric()
    .withMessage("Price must be a number.")
    .custom((value) => value >= 0)
    .withMessage("Price must be greater than 0.")
    .notEmpty()
    .withMessage("Price can't be empty"),
  check("discount")
    .exists()
    .withMessage("Discount must exists")
    .isInt({ gt: -1, lt: 100 })
    .withMessage("Discount must be smaller than or equal to 100.")
    .notEmpty()
    .withMessage("Discount can't be empty.")
    .withMessage("Discount must be a number and no empty"),
  check("cancellation")
    .exists()
    .withMessage("Cancellation must exists")
    .notEmpty()
    .withMessage("Cancellation can't be empty")
    .isString()
    .withMessage("Cancellation must be a string."),
  check("amenities")
    .exists()
    .withMessage("Amenities must exists.")
    .isArray({min: 1})
    .withMessage("Amenities must be an array with at least 1 instance")
    .notEmpty()
    .withMessage("Amenities can't be empty."),
  check("thumbnail")
    .exists()
    .withMessage("Thumbnail must exists.")
    .notEmpty()
    .withMessage("Thumbnail can't be empty")
    .isURL()
    .withMessage("Thumbnail must be a valid URL.")
    .withMessage("Thumbnail must be a valid URL and not empty"),
  check("images")
    .exists()
    .withMessage("Images must exists")
    .notEmpty()
    .withMessage("Images can't be empty.")
    .isArray({min: 3})
    .withMessage("Images must be an array with at least 3 instance"),
];

export const validateUpdateRoom = [
  check("roomType")
    .exists()
    .withMessage("Room Type must exists")
    .notEmpty()
    .withMessage("Room Type can't be empty")
    .isString()
    .withMessage("Room Type must be a string."),
  check("roomNumber")
    .exists()
    .withMessage("Room Number must exists")
    .notEmpty()
    .withMessage("Room Number can't be empty")
    .isString()
    .withMessage("Room Number must be a string."),
  check("description")
    .exists()
    .withMessage("Description must exists")
    .notEmpty()
    .withMessage("Description can't be empty")
    .isString()
    .withMessage("Description must be a string."),
  check("price")
    .exists()
    .withMessage("Price must exists")
    .isNumeric()
    .withMessage("Price must be a number.")
    .custom((value) => value >= 0)
    .withMessage("Price must be greater than 0.")
    .notEmpty()
    .withMessage("Price can't be empty"),
  check("discount")
    .exists()
    .withMessage("Discount must exists")
    .isInt({ gt: -1, lt: 100 })
    .withMessage("Discount must be smaller than or equal to 100.")
    .notEmpty()
    .withMessage("Discount can't be empty.")
    .withMessage("Discount must be a number and no empty"),
  check("cancellation")
    .exists()
    .withMessage("Cancellation must exists")
    .notEmpty()
    .withMessage("Cancellation can't be empty")
    .isString()
    .withMessage("Cancellation must be a string."),
  check("amenities")
    .exists()
    .withMessage("Amenities must exists.")
    .isArray({min: 1})
    .withMessage("Amenities must be an array with at least 1 instance")
    .notEmpty()
    .withMessage("Amenities can't be empty."),
  check("thumbnail")
    .exists()
    .withMessage("Thumbnail must exists.")
    .notEmpty()
    .withMessage("Thumbnail can't be empty")
    .isURL()
    .withMessage("Thumbnail must be a valid URL.")
    .withMessage("Thumbnail must be a valid URL and not empty"),
  check("images")
    .exists()
    .withMessage("Images must exists")
    .notEmpty()
    .withMessage("Images can't be empty.")
    .isArray({min: 3})
    .withMessage("Images must be an array with at least 3 instance"),
  check("id")
    .exists()
    .notEmpty()
    .custom(async (value) => {
      const user = await db.users.find((user) => user.id === value); // Realiza la consulta a la base de datos para verificar la existencia de la habitación
      if (!user) {
        throw new Error("The booking does not exists on the database.");
      }
      return true;
    }),
];
