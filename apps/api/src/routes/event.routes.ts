import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { validateBody } from "../middleware/validate-body.js";
import { createEventSchema } from "../schemas/event.schema.js";

const router = Router();

router.post(
  "/events",
  validateBody(createEventSchema),
  async (req, res, next) => {
    try {
      const event = await prisma.event.create({
        data: req.body,
      });

      res.status(201).json({
        success: true,
        data: event,
      });
    } catch (error) {
      next(error);
    }
  },
);


router.get("/events", async (_req, res, next) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    next(error);
  }
});


export default router;