import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Event name is required.",
  }),
  description: z.string().trim().optional(),
});