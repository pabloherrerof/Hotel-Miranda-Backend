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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importStar(require("../server"));
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIn0sImlhdCI6MTY4NTQ1MjgzNH0.6E2E0hVSdQQ8GsUvgERKAUP_wPAzZ58QKE6SF7YYAHo";
(0, node_test_1.describe)("Users endpoints", async () => {
    beforeAll(() => {
        server_1.server.close();
    });
    it("Get User without token should return Unauthorized", async () => {
        const res = await (0, supertest_1.default)(server_1.default).get("/api/users");
        expect(res.text).toEqual("Unauthorized");
    });
    it("Get users without token should return 400 code status", async () => {
        const res = await (0, supertest_1.default)(server_1.default).get("/api/users");
        expect(res.statusCode).toEqual(401);
    });
    it("Get users with valid token should return data", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .get("/api/users")
            .auth(token, { type: "bearer" });
        expect(res.body).toHaveProperty("data");
    });
    it("Get single user that does not exists with valid token should return 400 code status", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .get("/api/users/U-00232")
            .auth(token, { type: "bearer" });
        expect(res.statusCode).toEqual(500);
        expect(res.text).toContain("User with ID U-00232 could not be found in the database.");
    });
    it("Get single user with valid token should return 200 code status and body must contain property data", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .get("/api/users/U-0002")
            .auth(token, { type: "bearer" });
        expect(res.body).toHaveProperty("data");
    });
    it("Delete a single user that does not exists with valid token should return error and status code must be equal to 400", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .delete("/api/users/U-0017")
            .auth(token, { type: "bearer" });
        expect(res.statusCode).toBe(400);
        expect(res.body.data).toHaveProperty("error");
        expect(res.body.data.error).toBe("User with ID U-0017 could not be found in the database.");
    });
    it("Delete a single user that does exists with valid token should return the user and status code must be equal to 200", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .delete("/api/users/U-0014")
            .auth(token, { type: "bearer" });
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toHaveProperty("deletedUser");
        expect(res.body.data.deletedUser.id).toBe("U-0014");
    });
    it("Post a single user with valid token should return the new user and status code must be equal to 201", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post("/api/users/")
            .auth(token, { type: "bearer" })
            .send({
            photo: "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png",
            name: "Test",
            email: "admin@test.com",
            phone: "294778192",
            startDate: "03/15/1900",
            state: "ACTIVE",
            password: "test123456",
            jobDescription: "Dashboard Managing Account",
            position: "Administrator",
        });
        expect(res.statusCode).toBe(201);
    });
    it("Put a single user with valid token should return the new user and status code must be equal to 201", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .put("/api/users/U-0014")
            .auth(token, { type: "bearer" })
            .send({
            photo: "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png",
            name: "TestEdit",
            email: "admin@test.com",
            phone: "294778192",
            startDate: "03/15/1900",
            state: "ACTIVE",
            password: "test123456",
            jobDescription: "Dashboard Managing Account",
            position: "Administrator",
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.data.id).toBe("U-0014");
        expect(res.body.data);
    });
    afterAll(() => {
        server_1.server.closeAllConnections();
    });
});
