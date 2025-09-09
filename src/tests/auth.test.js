import request from "supertest";
import app from "../src/app.js";

describe("Auth API", () => {
  it("should register a user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "robocoder42@gmail.com",
      password: "password123",
      role: "Donor",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it("should login a user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "robocoder42@gmail.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
  });
});
