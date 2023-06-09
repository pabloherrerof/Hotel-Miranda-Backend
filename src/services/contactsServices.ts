import { connect, disconnect } from "../database/mondoDBConnection";
import { Contact } from "../models/contacts";
import { IContact } from "../types/interfaces";

export const getContacts = async () => {
  try {
    await connect();
    let contacts: IContact[] = await Contact.find().exec();
    if (contacts.length > 0) {
      console.log(contacts);
      return contacts;
    } else throw new Error("Couldn`t find contacts on the database.");
  } catch (e) {
    throw e;
  } finally {
    await disconnect();
  }
};

export const getSingleContact = async (contactId: IContact["id"]) => {
  try {
    await connect();
    let contact = await Contact.findOne({ id: contactId }).exec();
    if (contact) {
      console.log(contact);
      return contact;
    } else
      throw new Error(
        `Contact with ID ${contactId} could not be found in the database.`
      );
  } catch (error) {
    throw error;
  } finally {
    await disconnect();
  }
};

export const toggleArchiveContacts = async (
  updatedInfo: IContact["archived"],
  contactId: IContact["id"]
) => {
  try {
    await connect();

    const contact = await Contact.findOneAndUpdate(
      { id: contactId },
      { archived: updatedInfo },
      { new: true }
    ).exec();

    if (contact) {
      console.log(contact);
      return contact;
    } else
      throw new Error(
        `Contact with ID ${contactId} could not be found in the database.`
      );
  } catch (e) {
    throw e;
  } finally {
    await disconnect();
  }
};
