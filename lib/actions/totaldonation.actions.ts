"use server"

import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import { CheckoutTotalDonationParams, CreateTotalDonationParams } from '@/types';
import Totaldonation from '../database/models/totaldonation.model';

export const checkoutTotalDonation = async (totaldonation: CheckoutTotalDonationParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = await stripe.prices.create({
    currency: 'pkr',
    custom_unit_amount: {
      enabled: true,
    },
    product: 'prod_QUvQ5wVWsE4a0D',
  });

  try {
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
            price: 'price_1Pe05ODhRKC72IWJKSQk0G0g',
            quantity: 1,
          },
      ],
      metadata: {
        donorId: totaldonation.donorId,
      },
      after_completion: {
        type: 'redirect',
        redirect: {
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
        },
    }
    });

    console.log(paymentLink)

    redirect(paymentLink.url!)
  } catch (error) {
    throw error;
  }

  
}

export const createTotalDonation= async (totaldonation: CreateTotalDonationParams) => {
  try {
    await connectToDatabase();
    
    const newtotaldonation = await Totaldonation.create({
      ...totaldonation,
      donor: totaldonation.donorId,
    });

    console.log( newtotaldonation)

    return JSON.parse(JSON.stringify(newtotaldonation));
    
  } catch (error) {
    handleError(error);
  }
}