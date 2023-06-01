
import { ResultSetHeader } from "mysql2";
import { queryDb } from "../database/mysqlConnector";
import { saveToDatabase } from "../database/utils";
import { Contact } from "../types/interfaces";

export const getContacts = async () => {
  try {
    const query = "SELECT * from contacts";

    return await queryDb(query, null);
  } catch (e) {
    throw e;
  }
  };

  export const getSingleContact = async (contactId: Contact["id"]) => {
    try {
      const query = "SELECT * from contacts WHERE id= ?;";
      const contact = (await queryDb(query, [contactId])) as Contact[];
  
      if (contact.length === 0) {
        throw new Error("Contact not found!");
      } else {
        return contact;
      }
    } catch (error) {
      throw error;
    }
  };

  export const toggleArchiveContacts = async (updatedInfo: Contact["archived"], contactId: Contact["id"]) => {
try {
  const query = "UPDATE contacts SET archived=? WHERE id=?";
  const contactDb = await queryDb(query, [updatedInfo, contactId]) as ResultSetHeader;

  if (contactDb.affectedRows === 0) {
    throw new Error("Couldn't update the contact.");

  } else return getSingleContact(contactId); 
} catch (e) {
  throw e
}
  }