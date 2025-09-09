import request from "supertest";
import app from "../src/app.js";

describe("Donation API", () => {
  it("should block unauthenticated donation creation", async () => {
    const res = await request(app).post("/api/donations").send({
      amount: 50,
      areaId: "64a7a1fbc1c2c3d9a8f5a123",
    });
    expect(res.statusCode).toBe(401);
  });
});
