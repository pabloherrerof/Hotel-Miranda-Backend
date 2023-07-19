"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const server_1 = __importStar(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
(0, node_test_1.describe)("Login", async () => {
    beforeAll(() => {
        server_1.server.closeAllConnections();
    });
    it("Valid credential should return token", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post("/login")
            .send({ email: "admin@admin.com", password: "admin" });
        expect(res.body).toHaveProperty("token");
    });
    it("Valid credential should return 200 code status", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post("/login")
            .send({ email: "admin@admin.com", password: "admin" });
        expect(res.statusCode).toEqual(200);
    });
    it("Invalid credential should return 400 code status", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post("/login")
            .send({ email: "admin@admin.com", password: "admassin" });
        expect(res.statusCode).toEqual(500);
    });
    it("Invalid password should return an Invalid password!.", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post("/login")
            .send({ email: "admin@admin.com", password: "admassin" });
        expect(res.text).toContain("Invalid password!");
    });
    it("Invalid email should return an Invalid credentials!.", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post("/login")
            .send({ email: "admin@admiythyn.com", password: "admassin" });
        expect(res.text).toContain("Invalid credentials!");
    });
    afterAll(() => {
        server_1.server.closeAllConnections();
    });
});
