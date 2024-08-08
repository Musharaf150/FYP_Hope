import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/actions/order.actions';
import { handleError } from '@/lib/utils';
import { createComRaised } from '@/lib/actions/comraised.actions';
import { createTotalDonation } from '@/lib/actions/totaldonation.actions';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature') as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    // Construct the event from the request body and signature
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Error verifying webhook signature:', err);
    return NextResponse.json({ message: 'Webhook error', error: err }, { status: 400 });
  }

  const eventType = event.type;

  try {
    if (eventType === 'checkout.session.completed') {
      const { id, amount_total, metadata } = event.data.object as any;

      // Check for missing metadata
      if (!metadata || !metadata.type) {
        console.error('Missing metadata or required fields:', metadata);
        return NextResponse.json({ message: 'Missing metadata or required fields' }, { status: 400 });
      }

      const { type } = metadata;

      if (type === "campaign") {
        if (!metadata.compaignId || !metadata.donorId) {
          console.error('Missing metadata or required fields:', metadata);
          return NextResponse.json({ message: 'Missing metadata or required fields' }, { status: 400 });
        }
        const comraised = {
          stripeId: id,
          compaignId: metadata.compaignId || '',
          donorId: metadata.donorId || '',
          raisedAmount: amount_total ? (amount_total / 100).toString() : '0',
          createdAt: new Date(),
        };

        console.log("Campaign data:", comraised);

        const newComraised = await createComRaised(comraised);
        console.log("New Comraised record:", newComraised);
        return NextResponse.json({ message: 'OK', comraised: newComraised });
      }

      if (type === "event") {
        const order = {
          stripeId: id,
          eventId: metadata.eventId || '',
          buyerId: metadata.buyerId || '',
          totalAmount: amount_total ? (amount_total / 100).toString() : '0',
          createdAt: new Date(),
        };

        console.log("Order data:", order);

        const newOrder = await createOrder(order);
        console.log("New Order record:", newOrder);
        return NextResponse.json({ message: 'OK', order: newOrder });
      }

      if (type === "donation") {
        if (!metadata.donorId) {
          console.error('Missing metadata or required fields:', metadata);
          return NextResponse.json({ message: 'Missing metadata or required fields' }, { status: 400 });
        }
        const totaldonation = {
          stripeId: id,
          donorId: metadata?.donorId || '',
          amount: amount_total ? (amount_total / 100) : 0,
          createdAt: new Date(),
        };

        try {
          // Save the new order to your database
          const newTotaldonation = await createTotalDonation(totaldonation);
          console.log(newTotaldonation);
          // // Return a success response
          return NextResponse.json({ message: 'OK', totaldonation: newTotaldonation });
        } catch (error) {
          // Return an error response if order creation fails
          handleError(error)
        }
      }
    }

    // Respond to other events or ignore
    return new Response('', { status: 200 });

  } catch (error) {
    console.error('Error processing event:', error);
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}
