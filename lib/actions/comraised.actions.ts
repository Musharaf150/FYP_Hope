"use server"

import Stripe from 'stripe';
import { CheckoutComRaisedParams, CreateComRaisedParams, GetComRaisedByUserParams, GetDonorsByUserParams } from "@/types";
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import ComRaised from '../database/models/comraised.model';
import Compaign from '../database/models/compaign.model';
import User from '../database/models/user.model';
import {ObjectId} from 'mongodb';


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


// GET COMRAISED BY USER
export async function getRaisedByUser({ userId, limit = 3, page }: GetComRaisedByUserParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { donor: userId }

    const comraised = await ComRaised.distinct('compaign._id')
      .find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'compaign',
        model: Compaign,
        populate: {
          path: 'organizer',
          model: User,
          select: '_id firstName lastName',
        },
      })

    const raisedCount = await ComRaised.distinct('compaign._id').countDocuments(conditions)
   
   

    return { data: JSON.parse(JSON.stringify(comraised)),
       totalPages: Math.ceil(raisedCount/ limit), 
       raisedCount}

  } catch (error) {
    handleError(error)
  }
}

//GET DONORS BY users
export async function getDonorsByUser({ donorId, searchString = '' }: GetDonorsByUserParams) {
  try {
    await connectToDatabase();

    if (!donorId) throw new Error('Donor ID is required');
    const donorObjectId = new ObjectId(donorId);

    const comraised = await ComRaised.aggregate([
      {
        $lookup: {
          from: 'compaigns',
          localField: 'compaign',
          foreignField: '_id',
          as: 'compaign',
        },
      },
      {
        $unwind: '$compaign',
      },
      {
        $lookup: {
          from: 'users',
          localField: 'donor',
          foreignField: '_id',
          as: 'donor',
        },
      },
      {
        $unwind: '$donor',
      },
      {
        $match: {
          'donor._id': donorObjectId,
          'donor.firstName': { $regex: new RegExp(searchString, 'i') }
        },
      },
      {
        $project: {
          _id: 1,
          raisedAmount: 1,
          createdAt: 1,
          compaignTitle: '$compaign.title',
          compaignId: '$compaign._id',
          donor: {
            name: { $concat: ['$donor.firstName', ' ', '$donor.lastName'] },
            email: '$donor.email',
          },
        },
      },
    ]);

    return JSON.parse(JSON.stringify(comraised));
  } catch (error) {
    console.error('Error fetching donors by user:', error);
    throw new Error('Failed to fetch donors by user');
  }
}

//GET DONATION BY CAMPAIGN
export async function getDonationByCampaign(compaignId:string) {
  try {
    await connectToDatabase()

    if (!compaignId) throw new Error('compaign ID is required')
    const compaignObjectId = new ObjectId(compaignId)

    const comraised = await ComRaised.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'donor',
          foreignField: '_id',
          as: 'donor',
        },
      },
      {
        $unwind: '$donor',
      },
      {
        $lookup: {
          from: 'compaigns',
          localField: 'compaign',
          foreignField: '_id',
          as: 'compaign',
        },
      },
      {
        $unwind: '$compaign',
      },
      {
        $project: {
          _id: 1,
          raisedAmount: 1,
          createdAt: 1,
          compaignTitle: '$compaign.title',
          compaignId: '$compaign._id',
          donor: {
            $concat: ['$donor.firstName', ' ', '$donor.lastName'],
          },
          donorEmail: '$donor.email',
        },
      },
      {
        $match: {
          $and: [{ compaignId: compaignObjectId }],
        },
      },
    ])

    return JSON.parse(JSON.stringify(comraised))
  } catch (error) {
    handleError(error)
  }
}

