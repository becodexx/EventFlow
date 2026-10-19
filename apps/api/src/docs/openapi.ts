
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
    {
      name: "Events",
      description: "Manage EventFlow events",
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


"/api/v1/events": {
  get: {
    tags: ["Events"],
    summary: "Retrieve all events",
    description:
      "Returns all events stored in the database, newest first.",
    responses: {
      "200": {
        description: "Events retrieved successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["success", "data"],
              properties: {
                success: {
                  type: "boolean",
                  example: true,
                },
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        format: "uuid",
                        example:
                          "123e4567-e89b-42d3-a456-426614174000",
                      },
                      name: {
                        type: "string",
                        example: "Tech Conference 2026",
                      },
                      description: {
                        type: "string",
                        nullable: true,
                        example: "A conference for developers.",
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                      },
                      updatedAt: {
                        type: "string",
                        format: "date-time",
                      },
                    },
                    required: [
                      "id",
                      "name",
                      "createdAt",
                      "updatedAt",
                    ],
                  },
                },
              },
            },
          },
        },
      },
      "500": {
        description: "Unexpected server or database error",
      },
    },
  },

  // Keep your existing post definition here.
},

  },
};
