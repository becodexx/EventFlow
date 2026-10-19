
import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import app from "./app.js";
import { prisma } from "./lib/prisma.js";

// Mock Prisma so automated tests don't write to the real database.
vi.mock("./lib/prisma.js", () => ({
  prisma: {
    event: {
      create: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));

const mockEvent = {
  id: "123e4567-e89b-42d3-a456-426614174000",
  name: "Tech Conference 2026",
  description: "A conference for developers.",
  createdAt: new Date("2026-10-19T10:00:00.000Z"),
  updatedAt: new Date("2026-10-19T10:00:00.000Z"),
};

beforeEach(() => {
  vi.clearAllMocks();
});

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

describe("POST /api/v1/events", () => {
  it("should create an event when the request is valid", async () => {
    vi.mocked(prisma.event.create).mockResolvedValueOnce(
      mockEvent as never,
    );

    const response = await request(app)
      .post("/api/v1/events")
      .send({
        name: "Tech Conference 2026",
        description: "A conference for developers.",
      });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      success: true,
      data: {
        id: mockEvent.id,
        name: mockEvent.name,
        description: mockEvent.description,
      },
    });

    expect(prisma.event.create).toHaveBeenCalledWith({
      data: {
        name: "Tech Conference 2026",
        description: "A conference for developers.",
      },
    });
  });

  it("should reject an empty event name", async () => {
    const response = await request(app)
      .post("/api/v1/events")
      .send({
        name: "   ",
        description: "A conference for developers.",
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(prisma.event.create).not.toHaveBeenCalled();
  });

  it("should handle a database error", async () => {
    vi.mocked(prisma.event.create).mockRejectedValueOnce(
      new Error("Database unavailable"),
    );

    const response = await request(app)
      .post("/api/v1/events")
      .send({
        name: "Tech Conference 2026",
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: "Internal server error",
    });
  });
});

describe("GET /api/v1/events", () => {
  it("should return all events", async () => {
    vi.mocked(prisma.event.findMany).mockResolvedValueOnce(
      [mockEvent] as never,
    );

    const response = await request(app).get("/api/v1/events");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);

    expect(response.body.data[0]).toMatchObject({
      id: mockEvent.id,
      name: mockEvent.name,
      description: mockEvent.description,
    });

    expect(prisma.event.findMany).toHaveBeenCalledWith({
      orderBy: {
        createdAt: "desc",
      },
    });
  });

  it("should return an empty array when no events exist", async () => {
    vi.mocked(prisma.event.findMany).mockResolvedValueOnce([]);

    const response = await request(app).get("/api/v1/events");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: [],
    });
  });
});

describe("Unknown routes", () => {
  it("should return 404 for an unknown route", async () => {
    const response = await request(app).get("/api/v1/unknown");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });
});
