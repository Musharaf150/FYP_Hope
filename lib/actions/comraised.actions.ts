"use server"

import Stripe from 'stripe';
import { CheckoutComRaisedParams, CreateComRaisedParams} from "@/types"
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import ComRaised from '../database/models/comraised.model';

export const checkoutComRaised = async (comraised: CheckoutComRaisedParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = await stripe.prices.create({
    currency: 'pkr',
    custom_unit_amount: {
      enabled: true,
    },
    product: 'prod_QUdPTjVzwxOUxF',
  });

  try {
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
            price: 'price_1Pdg96DhRKC72IWJNbgc3K31',
            quantity: 1,
          },
      ],
      metadata: {
        compaignId: comraised.compaignId,
        donorId: comraised.donorId,
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

export const createComRaised = async (comraised: CreateComRaisedParams) => {
  try {
    await connectToDatabase();
    
    const newComraised = await ComRaised.create({
      ...comraised,
      compaign: comraised.compaignId,
      donor: comraised.donorId,
    });

    console.log( newComraised)

    return JSON.parse(JSON.stringify(newComraised));
    
  } catch (error) {
    handleError(error);
  }
}