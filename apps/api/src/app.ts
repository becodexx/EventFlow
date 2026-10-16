import express from "express";
import {testRequestSchema} from "./schemas/test.schema.js";
import {validateBody} from "./middleware/validate-body.js";

import testRoutes from "./routes/test.routes.js";
import { notFoundHandler } from "./middleware/not-found.js";
import { errorHandler } from "./middleware/error-handler.js";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {

    res.status(200).json({
        success: true,
        message: "EventFlow API is running",
    });

});

// Register test routes under the API v1 prefix
app.use("/api/v1", testRoutes);

// Handle routes that do not exist
app.use(notFoundHandler);

// Handle errors passed through Express
app.use(errorHandler);

export default app;