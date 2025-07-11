import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminRoute from "./routes/admin.js";
import userRoute from "./routes/user.js";
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", adminRoute);
app.use("/", userRoute);

app.get("/", (req, res) => {
  res.json({
    message: "user Service API",
    status: "Active",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong on the server",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Admin service running on port ${PORT}`);
});

export default app;
