"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassword = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const passport_jwt_2 = require("passport-jwt");
require("dotenv/config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_1 = require("../models/users");
passport_1.default.use("login", new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
}, async (email, password, done) => {
    try {
        const user = await users_1.User.findOne({
            email: email
        }).exec();
        if (user) {
            let result = await comparePasswords(password, user.password);
            if (result) {
                console.log("Valid credentials!");
                return done(null, { id: user.id, email: email });
            }
            else {
                return done(new Error("Invalid password!"), false);
            }
        }
        else
            return done(new Error("Invalid credentials!"), false);
    }
    catch (error) {
        return done(error);
    }
}));
passport_1.default.use(new passport_jwt_1.Strategy({
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: passport_jwt_2.ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async (token, done) => {
    try {
        return done(null, token.user);
    }
    catch (error) {
        done(error);
    }
}));
async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcryptjs_1.default.hash(password, saltRounds);
    return hashedPassword;
}
exports.hashPassword = hashPassword;
async function comparePasswords(password, hashedPassword) {
    const isMatch = await bcryptjs_1.default.compare(password, hashedPassword);
    return isMatch;
}
exports.comparePasswords = comparePasswords;
