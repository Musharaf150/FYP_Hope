"use server"

import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import { CheckoutTotalDonationParams, CreateTotalDonationParams} from '@/types';
import Totaldonation from '../database/models/totaldonation.model';
import mongoose from 'mongoose';
import { startOfMonth, endOfMonth } from 'date-fns';


export const checkoutTotalDonation = async (totaldonation: CheckoutTotalDonationParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = await stripe.prices.create({
    currency: 'pkr',
    custom_unit_amount: {
      enabled: true,
    },
    product: 'prod_QcSIqMztYP13wr',
  });

  try {
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
            price:price.id,
            quantity: 1,
          },
      ],
      metadata: {
        type: "donation",
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

    return JSON.parse(JSON.stringify(newtotaldonation));
    
  } catch (error) {
    console.error('Error creating total donation record:', error);
    handleError(error);
    throw error; 
  }
}


//GET ALL DONATION BY A USER
export async function getAllDonationByUser(donorId:string) {
  try {
    await connectToDatabase();

    // Fetch donations by user ID and populate donor details
    const donations = await Totaldonation.find({ donor: donorId }).populate('donor').sort({ createdAt: -1 });


    if (!donations || donations.length === 0) {
      console.log('No donations found for this user');
      return { donations: [], totalAmount: 0 };
    }

    // Calculate total amount of donations by the user
    const totalAmount = donations.reduce((sum, donation) => {
      const amount = parseFloat(donation.amount);
      if (isNaN(amount)) {
        console.error(`Invalid amount found: ${donation.amount}`);
        return sum;
      }
      return sum + amount;
    }, 0);

    // Format donations data
    const formattedDonations = donations.map(donation => ({
      createdAt: donation.createdAt,
      stripeId: donation.stripeId,
      amount: donation.amount,
      donor: {
        id: donation.donor._id.toString(), // Ensure IDs are strings
        name: `${donation.donor.firstName} ${donation.donor.lastName}`,
      },
    }));


    return {
      donations: formattedDonations,
      totalAmount,
    };
  } catch (error) {
    console.error('Error in getAllDonationByUser:', error);
    throw new Error('Failed to fetch donations by user');
  }
}

//for current month
export async function getDonationsForCurrentMonth(donorId: string) {
  try {
    await connectToDatabase();

    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());

    const donations = await Totaldonation.find({
      donor: donorId,
      createdAt: {
        $gte: start,
        $lte: end,
      },
    }).populate('donor').sort({ createdAt: -1 }); // Sort by createdAt in descending order;

    const totalAmount = donations.reduce((sum, donation) => {
      const amount = parseFloat(donation.amount);
      return isNaN(amount) ? sum : sum + amount;
    }, 0);

    return {
      donations: donations.map(donation => ({
        createdAt: donation.createdAt,
        stripeId: donation.stripeId,
        amount: donation.amount,
        donor: {
          id: donation.donor._id.toString(),
          name: `${donation.donor.firstName} ${donation.donor.lastName}`,
        },
      })),
      totalAmount,
    };
  } catch (error) {
    console.error('Error in getDonationsForCurrentMonth:', error);
    throw new Error('Failed to fetch donations for the current month');
  }
}

export async function getTotalDonationsByMonthAndUser(
  createdAfter: Date | null,
  createdBefore: Date | null
) {
  const donationQuery: any = {};
  if (createdAfter) donationQuery.createdAt = { $gte: createdAfter };
  if (createdBefore) donationQuery.createdAt = { ...donationQuery.createdAt, $lte: createdBefore };

  console.log('Donation Query:', donationQuery);

  const donations = await Totaldonation.aggregate([
    {
        $project: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
            amount: { $toDouble: '$amount' },
        },
    },
    {
        $group: {
            _id: { month: '$month', year: '$year' },
            totalAmount: { $sum: '$amount' },
        },
    },
    {
        $sort: { '_id.year': 1, '_id.month': 1 },
    },
]);

  console.log('Total Donations Data:', donations);

  // Format data for use in graphs
  return donations.map(donation => ({
    userId: donation._id.userId,
    month: `${donation._id.year}-${donation._id.month}`,
    totalDonations: donation.totalDonations,
  }));
}
