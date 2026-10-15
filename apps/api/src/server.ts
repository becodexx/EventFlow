
import express from "express";

const app = express();

const PORT = 3000;

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "EventFlow API is running",
  });
});

app.listen(PORT, () => {
  console.log(`EventFlow API running at http://localhost:${PORT}`);
});
