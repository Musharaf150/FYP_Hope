// Importing necessary modules
import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/actions/order.actions';
import { handleError } from '@/lib/utils';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET!, {
  apiVersion: '2024-06-20',
});

// Define the handler for POST requests
export async function POST(request: Request) {
  // Read the request body
  const body = await request.text();

  // Retrieve the Stripe signature from the headers
  const sig = request.headers.get('stripe-signature') as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    // Construct the Stripe event
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    // Return an error response if the webhook verification fails
    return NextResponse.json({ message: 'Webhook error', error: err }, { status: 400 });
  }

  // Get the event type
  const eventType = event.type;

  // Handle the 'checkout.session.completed' event
  if (eventType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = event.data.object;

    // Create an order object
    const order = {
      stripeId: id,
      eventId: metadata?.eventId || '',
      buyerId: metadata?.buyerId || '',
      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
      createdAt: new Date(),
    };

    try {
      // Save the new order to your database
      const newOrder = await createOrder(order);
      console.log(newOrder);
      // Return a success response
      return NextResponse.json({ message: 'OK', order: newOrder });
    } catch (error) {
      // Return an error response if order creation fails
      handleError(error)
    }
  }

  // Return a success response for all other event types
  return new Response('', { status: 200 });
}
