import express from "express";
import "dotenv/config";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;
import webhookRoute from "./routes/webhook.js";
import paymentRoutes from "./routes/payment.js";

app.get("/", (req, res) => {
  res.send("Payment Service is running");
});

app.use(cors({ 
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
 }));

app.use("/api/payment", webhookRoute);
app.use(express.json());

app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
