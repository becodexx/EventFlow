import {z} from "zod";

export const testRequestSchema = z.object({
    message: z.string().trim().min(1,{message: "A non-empty message is required.",}),
});