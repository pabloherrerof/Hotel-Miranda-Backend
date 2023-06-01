import { Router } from "express";
import { archiveToggleContacts, getContactsController } from "../controllers/contactsController";
import { validateArchiveContact } from "../validators/contactsValidator";


const contactsRouter = Router();
contactsRouter.get("/", getContactsController );
contactsRouter.patch("/:contactId", validateArchiveContact, archiveToggleContacts);

export {contactsRouter}