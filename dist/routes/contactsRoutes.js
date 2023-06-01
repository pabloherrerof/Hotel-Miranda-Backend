"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactsRouter = void 0;
const express_1 = require("express");
const contactsController_1 = require("../controllers/contactsController");
const contactsRouter = (0, express_1.Router)();
exports.contactsRouter = contactsRouter;
contactsRouter.get("/", contactsController_1.getContacts);
contactsRouter.patch("/:contactId", contactsController_1.archiveToggleContacts);
