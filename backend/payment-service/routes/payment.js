import express from "express";
import Stripe from "stripe";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Example middleware to protect the route and get user info

router.post("/create-checkout-session", authenticate, async (req, res) => {
  const { courseId, courseName, coursePrice } = req.body;
  const userId = req.user.id;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: courseName },
            unit_amount: coursePrice * 100, // price in cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
        courseId: courseId,
      },
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

export default router;
