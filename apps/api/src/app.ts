import express from "express";
import {testRequestSchema} from "./schemas/test.schema.js";
import {validateBody} from "./middleware/validate-body.js";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {

    res.status(200).json({
        success: true,
        message: "EventFlow API is running",
    });

});

app.post("/api/v1/test", validateBody(testRequestSchema), (req,res)=>{
    const {message} = req.body;
    if(typeof message !== "string" || message.trim() === ""){
        res.status(400).json({
            success: false,
            message: "A non-empty message is required."
        });
        return;
    }
    res.status(201).json({
        success: true,
        data:{
            message: message.trim(),
        },
    });
});

export default app;