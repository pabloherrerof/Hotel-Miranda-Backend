import { NextFunction, Request, Response } from "express";
import { IUser } from "../types/interfaces";
const passport = require('passport');
import jwt from "jsonwebtoken"
require('dotenv').config();

export const authController = async (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate(
  	'login',
  	async (err: any, user: IUser, info: any) => {
    	try {
      	if (err || !user) {
        	const error = err ? new Error(err) : new Error('Invalid credentials');
        	return next(error);
      	}

      	req.login(
        	user,
        	{ session: false },
        	async (error) => {
          	if (error) return next(error);

          	const body = {id: user.id, email: user.email };
			console.log(user.id)
				const token = jwt.sign({ user: body }, process.env.SECRET_KEY!);
				return res.json({token: token, id: user.id});
			
        	}
      	);
    	} catch (error) {
      	return next(error);
    	}
  	}
	)(req, res, next);
  };
