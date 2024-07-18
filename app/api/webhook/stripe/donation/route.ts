// pages/api/stripe-webhook.ts

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/database';
import Totaldonation from '@/lib/database/models/totaldonation.model';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_DONATION!;

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sig = req.headers['stripe-signature'];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const donorId = paymentIntent.metadata.donorId;
      const amount = paymentIntent.amount_received;

      await connectToDatabase();

      // Update the donation record in your database
      await Totaldonation.findOneAndUpdate(
        { stripeId: paymentIntent.id },
        { totalDonation: amount / 100 }, // Stripe amount is in cents
        { new: true }
      );

      console.log(`PaymentIntent for ${amount} was successful!`);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
};

export default webhookHandler;

export const config = {
  api: {
    bodyParser: false,
  },
};
