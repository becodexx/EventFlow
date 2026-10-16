export const openApiDocument = {
  openapi: "3.0.3",

  info: {
    title: "EventFlow API",
    version: "1.0.0",
    description:
      "API documentation for the EventFlow Smart Event and Ticketing Platform.",
  },

  servers: [
    {
      url: "/",
      description: "Current server",
    },
  ],

  tags: [
    {
      name: "Health",
      description: "API health checks",
    },
    {
      name: "Test",
      description: "Endpoints used to verify API behavior",
    },
  ],

  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Check API health",
        responses: {
          "200": {
            description: "API is running",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "EventFlow API is running",
                    },
                  },
                  required: ["success", "message"],
                },
              },
            },
          },
        },
      },
    },

    "/api/v1/test": {
      post: {
        tags: ["Test"],
        summary: "Validate a test message",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["message"],
                properties: {
                  message: {
                    type: "string",
                    minLength: 1,
                    example: "Hello EventFlow",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Request accepted",
          },
          "400": {
            description: "Invalid request body",
          },
        },
      },
    },
  },
};