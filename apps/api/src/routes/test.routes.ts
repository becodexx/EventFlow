import { Router } from "express";
import { testRequestSchema } from "../schemas/test.schema.js";
import { validateBody } from "../middleware/validate-body.js";

const router = Router();

router.post(
  "/test",
  validateBody(testRequestSchema),
  (req, res) => {
    res.status(200).json({
      success: true,
      data: req.body,
    });
  },
);

export default router;