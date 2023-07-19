"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateArchiveContact = void 0;
const express_validator_1 = require("express-validator");
exports.validateArchiveContact = [
    (0, express_validator_1.check)("archived")
        .exists().withMessage("Archived must exists.")
        .notEmpty().withMessage("Archived can`t be empty.")
        .isBoolean().withMessage("Archived must be true or false.")
];
