"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveToggleContacts = exports.getContactsController = void 0;
const contactsServices_1 = require("../services/contactsServices");
const express_validator_1 = require("express-validator");
const getContactsController = async (req, res) => {
    try {
        const allContacts = await (0, contactsServices_1.getContacts)();
        res.status(200).send({ status: "200", data: allContacts });
    }
    catch (e) {
        res.status(500).send({ status: "500", e });
    }
};
exports.getContactsController = getContactsController;
const archiveToggleContacts = async (req, res) => {
    try {
        const updatedInfo = req.body.archived;
        const contactId = req.params["contactId"];
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            res.status(422).json({ errors: result.array() });
            return;
        }
        const updatedContact = await (0, contactsServices_1.toggleArchiveContacts)(updatedInfo, contactId);
        res.status(201).send({ status: "OK", data: updatedContact });
    }
    catch (e) {
        res.status(400).send({ status: "400", data: { error: e.message } });
    }
};
exports.archiveToggleContacts = archiveToggleContacts;
