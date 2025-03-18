"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const router = require("express").Router();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  const { priceId, selectedLanguage } = req.body;

  if (!priceId) {
    return res.status(400).json({ error: "Missing priceId in request body" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: "https://localhost:5173/success",
      cancel_url: "https://localhost:5173/cancel",
      locale: selectedLanguage,
    });
    res.json({ sessionId: session.id });
  } catch (error) {
    console.log("Error creating session:", error);
    return res.status(500).json({ error: error.message });
  }
});

router.get("/success", (req, res) => {
  res.send("Successful!");
});

router.get("/cancel", (req, res) => {
  res.send("Cancel!");
});

module.exports = router;
