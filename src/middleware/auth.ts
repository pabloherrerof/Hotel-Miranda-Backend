
import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTstrategy} from 'passport-jwt';
import {ExtractJwt as ExtractJWT} from 'passport-jwt';
import "dotenv/config"
import { queryDb } from '../database/mysqlConnector';
import { User } from '../types/interfaces';
import bcrypt from "bcrypt";

passport.use(
  'login',
  new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email: string, password: string, done) => {
    try {
      const user = await queryDb("SELECT * FROM users WHERE email=?", [email]) as User[]
      if(user.length > 0){
        let result = await comparePasswords(password, user[0].password);
        if (result) {
          console.log('¡Contraseña válida!');
          return done(null, {email: email});
        } else {
          return done(new Error("Invalid password!"), false);
        }
    
    } else return done(new Error("Invalid credentials!"), false);
    } catch (error: any) {
        return done(error);
    }
    }
  )
);
passport.use(
  new JWTstrategy(
    {
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
    try {
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
    }
  )
);


export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}





