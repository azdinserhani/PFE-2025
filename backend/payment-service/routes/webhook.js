import express from "express";
const router = express.Router();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import * as db from "../config/db.js";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error("Webhook signature verification failed.", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata.userId;
      const courseId = session.metadata.courseId;

      try {
        // Save enrollment in database
        await db.query(
          "INSERT INTO enrolment (course_id, user_id) VALUES ($1, $2)",
          [courseId, userId]
        );
        console.log(`✅ User ${userId} enrolled in course ${courseId}`);
      } catch (err) {
        console.error("Error saving enrollment:", err.message);
      }
    }

    res.status(200).send("Webhook received");
  }
);

export default router;
