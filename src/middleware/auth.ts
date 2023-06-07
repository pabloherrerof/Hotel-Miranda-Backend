import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { Strategy as JWTstrategy } from "passport-jwt";
import { ExtractJwt as ExtractJWT } from "passport-jwt";
import "dotenv/config";
import { IUser } from "../types/interfaces";
import bcrypt from "bcrypt";
import { User } from "../models/users";
import { connect, disconnect } from "../database/mondoDBConnection";

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        await connect();
        const user = await User.findOne({
          email: email}).exec();
          console.log(user);
        if (user) {
          let result = await comparePasswords(password, user.password);
          await disconnect();
          if (result) {
            console.log("Valid credentials!");
            return done(null, { email: email });
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
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
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

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}
