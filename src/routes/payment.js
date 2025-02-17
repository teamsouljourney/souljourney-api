const router = require("express").Router();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
    const {priceId} = req.body

    if (!priceId) {
        return res.status(400).json({ error: "Missing priceId in request body" });
      }

  try {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
         price: priceId, //"price_1QsAUOP6ONB2IDlqrxmCfsS3",
         quantity: 1,
       }
    //   {
    //      price: "price_1QsATcP6ONB2IDlq8IPG3Ubl",
    //      quantity: 1,
    //    },
    //   {
    //      price: "price_1QsAQkP6ONB2IDlqiMwUcvQS",
    //      quantity: 1,
    //    },
    //   {
    //      price: "price_1QsAPGP6ONB2IDlqFgbc5PMm",
    //      quantity: 1,
    //    },
    ],
    mode: 'subscription',
    success_url: 'http://localhost:5173/success',
    cancel_url: 'http://localhost:5173/cancel',
  })
  res.json({ sessionId: session.id });
  } catch (error) {
    console.log("Error creating session:", error);
    return res.status(500).json({ error: error.message }); 
  }
});
  
router.get('/success', (req, res) => {
  res.send('Successful!')
})

router.get('/cancel', (req, res) => {
  res.send('Cancel!')
})


module.exports = router