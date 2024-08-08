// Importing necessary modules
import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { handleError } from '@/lib/utils';
import { createComRaised } from '@/lib/actions/comraised.actions';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET_COMPAIGN!, {
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
  console.log(endpointSecret)

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

  if(eventType === 'checkout.session.completed')
    {
    const { id, amount_total, metadata } = event.data.object;

    if(metadata?.type === "campaign"){
        // Create an order object
    const comraised = {
      stripeId: id,
      compaignId: metadata?.compaignId || '',
      donorId: metadata?.donorId || '',
      raisedAmount: amount_total ? (amount_total / 100).toString() : '0',
      createdAt: new Date(),
    };

    console.log("campaign",comraised)

    try {
      // Save the new order to your database
      const newComraised = await createComRaised(comraised)
      console.log(newComraised);
      // Return a success response
      return NextResponse.json({ message: 'OK', comraised: newComraised });
    } catch (error) {
      // Return an error response if order creation fails
      handleError(error)
    }
  }
 

  // Return a success response for all other event types
  return new Response('', { status: 200 });
}
    
}


