import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import "dotenv/config";
import cors from "cors";
import { services } from "./services.js";
import { limiter } from "./middleware/rateLimiter.js";
const app = express();
services.forEach(({ route, target }) => {
  // Proxy options
  const proxyOptions = {
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${route}`]: "",
    },
  };

  // Apply rate limiting and timeout middleware before proxying
  app.use(route, createProxyMiddleware(proxyOptions));
});

// Middleware
app.use(cors(
  {
    origin: "*", // Allow all origins, adjust as needed
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "API Gateway is running",
    status: "Active",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`API Gateway is running on port ${process.env.PORT}`);
  console.log(`Proxying requests to: ${JSON.stringify(services, null, 2)}`);
});
