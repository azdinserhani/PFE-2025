import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import courseRoute from "./routes/courseRoute.js";
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/course", courseRoute);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Course Service API",
    status: "Active",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong on the server",
  });
});

// Not found middleware
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Course service running on port ${PORT}`);
});

export default app;
