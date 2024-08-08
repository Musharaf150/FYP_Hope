"use server"

import Stripe from 'stripe';
import { CheckoutComRaisedParams, CreateComRaisedParams } from "@/types";
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import ComRaised from '../database/models/comraised.model';

export const checkoutComRaised = async (comraised: CheckoutComRaisedParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = await stripe.prices.create({
    currency: 'usd',
    custom_unit_amount: {
      enabled: true,
    },
    product: 'prod_Qb2yXUOuDL9PU1',
  });

  try {
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      metadata: {
        type: "campaign",
        compaignId: comraised.compaignId,
        donorId: comraised.donorId,
      },
      after_completion: {
        type: 'redirect',
        redirect: {
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
        },
      },
    });

    console.log(paymentLink);

    redirect(paymentLink.url!);
  } catch (error) {
    throw error;
  }
}
export const createComRaised = async (comraised: CreateComRaisedParams) => {
  try {
    // Ensure database connection
    await connectToDatabase();

    // Create a new ComRaised record
    const newComraised = await ComRaised.create({
      ...comraised,
      compaign: comraised.compaignId,
      donor: comraised.donorId,
    });

    // Log the newly created record for debugging
    console.log('Created ComRaised record:', newComraised);

    // Return the created record
    return newComraised;
  } catch (error) {
    console.error('Error creating comraised record:', error);
    handleError(error);
    throw error; // Ensure the error is propagated for further handling
  }
}
// export const createComRaised = async (comraised: CreateComRaisedParams) => {
//   try {
//     await connectToDatabase();

//     const newComraised = await ComRaised.create({
//       ...comraised,
//       compaign: comraised.compaignId,
//       donor: comraised.donorId,
//     });

//     console.log(newComraised);

//     return JSON.parse(JSON.stringify(newComraised));
//   } catch (error) {
//     console.error('Error creating comraised record:', error);
//     handleError(error);
//     throw error; // Ensure the error is thrown to handle it in the webhook
//   }
// }
