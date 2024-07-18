// Importing necessary modules
import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import Totaldonation from '@/lib/database/models/totaldonation.model';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET_DONATION!, {
  apiVersion: '2024-06-20',
});

// Define the handler for POST requests
export async function POST(request: Request) {
  // Read the request body
  const body = await request.text();

  // Retrieve the Stripe signature from the headers
  const sig = request.headers.get('stripe-signature') as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_DONATION!;

  let event;

  try {
    // Construct the Stripe event
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    // Return an error response if the webhook verification fails
    return NextResponse.json({ message: 'Webhook error', error: err }, { status: 400 });
  }

  // Get the event type

  // Handle the 'checkout.session.completed' event
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

  // Return a success response for all other event types
  return new Response('', { status: 200 });
}
