import {describe } from "node:test";
import app, { server } from "../server";
import request from "supertest";



describe("Login", async () => {
    beforeAll(()=>{
        server.closeAllConnections()
    })
  it("Valid credential should return token", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "admin@admin.com", password: "admin" });

    expect(res.body).toHaveProperty("token");
  });
  it("Valid credential should return 200 code status", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "admin@admin.com", password: "admin" });

    expect( res.statusCode).toEqual(200);
  });
  it("Invalid credential should return 400 code status", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "admin@admin.com", password: "admassin" });

    expect(res.statusCode).toEqual(500);
  });
  it("Invalid password should return an Invalid password!.", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "admin@admin.com", password: "admassin" });
    expect(res.text).toContain("Invalid password!");
  });
  it("Invalid email should return an Invalid credentials!.", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "admin@admiythyn.com", password: "admassin" });
    expect(res.text).toContain("Invalid credentials!");
  });
  afterAll(()=>{
     server.closeAllConnections()
})
});
