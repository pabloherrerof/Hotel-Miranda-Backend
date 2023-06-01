import { NextFunction, Request, Response } from "express";
import db from "../database/db.json"
import { getContacts, toggleArchiveContacts } from "../services/contactsServices";
import { validationResult } from "express-validator";

export const getContactsController = (req: Request, res: Response) => {
    try {
      const allContacts = getContacts();
      res.status(200).send({ status: "OK", data: allContacts });
    } catch (e) {
      res.status(500).send({ status: "FAILED", e });
    }
  };

export const archiveToggleContacts = (req: Request, res: Response) => {
    const updatedInfo = req.body
    const contactId = req.params["contactId"];
  
    const result = validationResult(req);
      
    if (!result.isEmpty()) {
      res.status(422).json({ errors: result.array() });
      return;
    }
  
    const updatedContact= toggleArchiveContacts(updatedInfo, contactId);
  
    res.status(201).send({ status: "OK", data: updatedContact });
  };


