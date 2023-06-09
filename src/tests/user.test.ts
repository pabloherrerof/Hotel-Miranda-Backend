import { describe } from "node:test";
import request from "supertest";
import  app, { server }  from "../server";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIn0sImlhdCI6MTY4NTQ1MjgzNH0.6E2E0hVSdQQ8GsUvgERKAUP_wPAzZ58QKE6SF7YYAHo";

describe("Users endpoints", async () => {
beforeAll(()=>{
    server.close()
})
  it("Get User without token should return Unauthorized", async () => {
    const res = await request(app).get("/api/users");
    expect(res.text).toEqual("Unauthorized");
  });
  it("Get users without token should return 400 code status", async () => {
    const res = await request(app).get("/api/users");

     expect(res.statusCode).toEqual(401);
  });
  it("Get users with valid token should return data", async () => {
    const res = await request(app)
      .get("/api/users")
      .auth(token, { type: "bearer" });
    expect(res.body).toHaveProperty("data");
  });
  it("Get single user that does not exists with valid token should return 400 code status", async () => {
    const res = await request(app)
      .get("/api/users/U-00232")
      .auth(token, { type: "bearer" });
    expect(res.statusCode).toEqual(500);
    expect(res.text).toContain(
      "User with ID U-00232 could not be found in the database."
    );
  });
  it("Get single user with valid token should return 200 code status and body must contain property data", async () => {
    const res = await request(app)
      .get("/api/users/U-0002")
      .auth(token, { type: "bearer" });
    expect(res.body).toHaveProperty("data");
  });
  it("Delete a single user that does not exists with valid token should return error and status code must be equal to 400", async () => {
    const res = await request(app)
      .delete("/api/users/U-0017")
      .auth(token, { type: "bearer" });
    expect(res.statusCode).toBe(400);
    expect(res.body.data).toHaveProperty("error");
    expect(res.body.data.error).toBe(
      "User with ID U-0017 could not be found in the database."
    );
  });

  it("Delete a single user that does exists with valid token should return the user and status code must be equal to 200", async () => {
    const res = await request(app)
      .delete("/api/users/U-0014")
      .auth(token, { type: "bearer" });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("deletedUser");
    expect(res.body.data.deletedUser.id).toBe("U-0014");
  });

  it("Post a single user with valid token should return the new user and status code must be equal to 201", async () => {
    const res = await request(app)
      .post("/api/users/")
      .auth(token, { type: "bearer" })
      .send({
        photo:
          "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png",
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
    const res = await request(app)
      .put("/api/users/U-0014")
      .auth(token, { type: "bearer" })
      .send({
        photo:
          "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png",
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
    expect(res.body.data.id).toBe("U-0014")
    expect(res.body.data)
  });
  afterAll(()=>{
    server.closeAllConnections()
})
});
