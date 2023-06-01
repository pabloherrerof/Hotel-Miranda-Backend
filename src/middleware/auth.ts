
import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTstrategy} from 'passport-jwt';
import {ExtractJwt as ExtractJWT} from 'passport-jwt';
import "dotenv/config"

passport.use(
  'login',
  new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email: string, password: string, done) => {
    try {
        if (email === 'admin@admin.com' && password === 'admin')
            return done(null, {email: 'admin@admin.com'});
        return done(new Error("Invalid credentials!"), false);
    } catch (error) {
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






