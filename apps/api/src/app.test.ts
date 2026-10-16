import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./app.js";

describe("GET /health", () => {
  it("should return 200 when the API is healthy", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "EventFlow API is running",
    });
  });
});

describe("POST /api/v1/test", () => {
  it("should accept a valid message", async () => {
    const response = await request(app)
      .post("/api/v1/test")
      .send({ message: "Hello EventFlow" });

    expect(response.status).toBe(200);
    expect(response.body.data.message).toBe("Hello EventFlow");
  });

  it("should reject an empty message", async () => {
    const response = await request(app)
      .post("/api/v1/test")
      .send({ message: "   " });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

    it("should reject malformed JSON", async () => {
        const response = await request(app)
        .post("/api/v1/test")
        .set("Content-Type", "application/json")
        .send('{"message":');

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Invalid request body");
    });
});

describe("Unknown routes", () => {
  it("should return 404 for an unknown route", async () => {
    const response = await request(app).get("/api/v1/unknown");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });
});
