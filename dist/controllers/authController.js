"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const passport = require('passport');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const authController = async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = err ? new Error(err) : new Error('Invalid credentials');
                return next(error);
            }
            req.login(user, { session: false }, async (error) => {
                if (error)
                    return next(error);
                const body = { id: user.id, email: user.email };
                console.log(user.id);
                const token = jsonwebtoken_1.default.sign({ user: body }, process.env.SECRET_KEY);
                return res.json({ token: token, id: user.id });
            });
        }
        catch (error) {
            return next(error);
        }
    })(req, res, next);
};
exports.authController = authController;
