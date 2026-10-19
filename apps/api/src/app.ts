import express from "express";
import {testRequestSchema} from "./schemas/test.schema.js";
import {validateBody} from "./middleware/validate-body.js";

import testRoutes from "./routes/test.routes.js";
import eventRoutes from "./routes/event.routes.js";
import { notFoundHandler } from "./middleware/not-found.js";
import { errorHandler } from "./middleware/error-handler.js";

import swaggerUi from "swagger-ui-express";
import { openApiDocument } from "./docs/openapi.js";

import { prisma } from "./lib/prisma.js";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {

    res.status(200).json({
        success: true,
        message: "EventFlow API is running",
    });

});

app.get("/health/database", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      message: "Database connection successful",
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(503).json({
      success: false,
      message: "Database connection unavailable",
    });
  }
});
// Register test routes under the API v1 prefix
app.use("/api/v1", testRoutes);
// Register event routes under the API v1 prefix
app.use("/api/v1", eventRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(openApiDocument),
);


// Handle routes that do not exist
app.use(notFoundHandler);

// Handle errors passed through Express
app.use(errorHandler);

export default app;