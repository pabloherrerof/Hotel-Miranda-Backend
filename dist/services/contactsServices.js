"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleArchiveContacts = exports.getSingleContact = exports.getContacts = void 0;
const contacts_1 = require("../models/contacts");
const getContacts = async () => {
    try {
        let contacts = await contacts_1.Contact.find().sort({ id: 1 }).exec();
        if (contacts.length > 0) {
            console.log(contacts);
            return contacts;
        }
        else
            throw new Error("Couldn`t find contacts on the database.");
    }
    catch (e) {
        throw e;
    }
};
exports.getContacts = getContacts;
const getSingleContact = async (contactId) => {
    try {
        let contact = await contacts_1.Contact.findOne({ id: contactId }).exec();
        if (contact) {
            console.log(contact);
            return contact;
        }
        else
            throw new Error(`Contact with ID ${contactId} could not be found in the database.`);
    }
    catch (error) {
        throw error;
    }
};
exports.getSingleContact = getSingleContact;
const toggleArchiveContacts = async (updatedInfo, contactId) => {
    try {
        const contact = await contacts_1.Contact.findOneAndUpdate({ id: contactId }, { archived: updatedInfo }, { new: true }).exec();
        if (contact) {
            console.log(contact);
            return contact;
        }
        else
            throw new Error(`Contact with ID ${contactId} could not be found in the database.`);
    }
    catch (e) {
        throw e;
    }
};
exports.toggleArchiveContacts = toggleArchiveContacts;
