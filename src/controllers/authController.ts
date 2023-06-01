import { NextFunction, Request, Response } from "express";
import { User } from "../types/interfaces";
const passport = require('passport');
import jwt from "jsonwebtoken"
require('dotenv').config();

export const authController = async (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate(
  	'login',
  	async (err: Error, user: User, info: any) => {
    	try {
      	if (err || !user) {
        	const error = new Error(err.message);
        	return next(error);
      	}

      	req.login(
        	user,
        	{ session: false },
        	async (error) => {
          	if (error) return next(error);

          	const body = {id: user.id, email: user.email };
			
				const token = jwt.sign({ user: body }, process.env.SECRET_KEY!);
				return res.json({ token });
			
        	}
      	);
    	} catch (error) {
      	return next(error);
    	}
  	}
	)(req, res, next);
  };
