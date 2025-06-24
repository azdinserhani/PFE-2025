import express from "express";
import Stripe from "stripe";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Example middleware to protect the route and get user info

router.post("/create-checkout-session", authenticate, async (req, res) => {
  const { cartItems } = req.body; // cartItems: [{ id, name, price, quantity }, ...]
  const userId = req.user.id;
  const line_items = cartItems.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: { name: item.name },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: line_items,
      metadata: {
        userId: userId,
        cart: JSON.stringify(cartItems.map((item) => item.id)), // save cart product IDs
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
