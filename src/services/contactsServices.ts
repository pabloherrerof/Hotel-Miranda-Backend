import db from "../database/db.json";
import { Contact } from "../types/interfaces";
import { saveToDatabase } from "../database/utils";

export const getContacts = () => {
    if(!db.contacts || db.contacts.length === 0){
      throw new Error("Contacts not found!")
    }
    return db.contacts;
  };

  export const toggleArchiveContacts = (updatedInfo: Contact["archived"], contactId: Contact["id"]) => {
    const indexToUpdate = db.contacts.findIndex((contact) => contact.id === contactId);
    
 
 if (indexToUpdate < 0) {
  throw new Error("Contact not found!");
}
    const contactToModify = db.contacts[indexToUpdate]
    Object.assign(contactToModify, updatedInfo)
    saveToDatabase(db);
    return db.contacts[indexToUpdate];
  }