import type {RequestHandler} from "express";
import type {z} from "zod";

export function validateBody <T extends z.ZodType>(schema: T,):RequestHandler{
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if(!result.success){
            res.status(400).json({
                success:false,
                message:"Invalid request body",
                errors: result.error.issues.map((issue)=>({
                    path:issue.path.join("."),
                    message:issue.message,
                })),
            });
            return;
        }
        req.body =result.data;
        next();
    };
}