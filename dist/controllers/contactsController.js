"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveToggleContacts = exports.getContacts = void 0;
const contacts_json_1 = __importDefault(require("../data/contacts.json"));
const getContacts = (req, res) => {
    res.send(contacts_json_1.default);
};
exports.getContacts = getContacts;
const archiveToggleContacts = (req, res) => {
    res.send("Archive or unarchive contact");
};
exports.archiveToggleContacts = archiveToggleContacts;
