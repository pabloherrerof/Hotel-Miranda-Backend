import { Request, Response } from "express";
import { getContacts, toggleArchiveContacts } from "../services/contactsServices";
import { validationResult } from "express-validator";

export const getContactsController = async (req: Request, res: Response) => {
    try {
      const allContacts = await getContacts();
      res.status(200).send({ status: "200", data: allContacts });
    } catch (e) {
      res.status(500).send({ status: "500", e });
    }
  };

export const archiveToggleContacts = async (req: Request, res: Response) => {
try {
  const updatedInfo = req.body.archived
  const contactId = req.params["contactId"];

  const result = validationResult(req);
    
  if (!result.isEmpty()) {
    res.status(422).json({ errors: result.array() });
    return;
  }

  const updatedContact= await toggleArchiveContacts(updatedInfo, contactId);

  res.status(201).send({ status: "OK", data: updatedContact });
} catch (e: any) {
  res.status(400).send({ status: "400", data: { error: e.message } })
}
  };


