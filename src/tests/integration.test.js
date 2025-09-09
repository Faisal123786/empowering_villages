import request from "supertest";
import app from "../src/app.js";

describe("Integration Tests", () => {
  it("should return metrics", async () => {
    const res = await request(app).get("/metrics");
    expect(res.statusCode).toBe(200);
  });
});
