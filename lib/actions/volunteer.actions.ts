'use server'

import { CreateVolunteerParams,  GetVolunteersByUserParams } from "@/types";
import { connectToDatabase } from "../database";
import Volunteer from "../database/models/volunteer.model";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import { sendVolunteerEmail } from '@/lib/email.service';

export const createVolunteer = async (participant:CreateVolunteerParams) => {
    try {
      await connectToDatabase();
      
      const newVolunteer = await Volunteer.create({
        ...participant,
        event: participant.eventId,
        participant: participant.participantId,
      });

      console.log(newVolunteer)
  
    
      await sendVolunteerEmail(participant.participantEmail, participant.eventTitle, participant.startDateTime);
      return JSON.parse(JSON.stringify(newVolunteer));
      

      
    } catch (error) {
      handleError(error);
    }
  }

  export const hasVolunteered = async (userId: string, eventId: string): Promise<boolean> => {
    try {
      await connectToDatabase();
      
      const volunteer = await Volunteer.findOne({ participant: userId, event: eventId });
      
      return !!volunteer;
    
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  // GET ORDERS BY USER
export async function getVolunteerByUser({ userId, limit = 3, page }: GetVolunteersByUserParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { participant: userId }

    const volunteers = await Volunteer.distinct('event._id')
      .find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'event',
        model: Event,
        populate: {
          path: 'organizer',
          model: User,
          select: '_id firstName lastName',
        },
      })
      

    const volunteersCount = await Volunteer.distinct('event._id').countDocuments(conditions)

    

    return { data: JSON.parse(JSON.stringify(volunteers)), totalPages: Math.ceil(volunteersCount / limit),volunteersCount }
  } catch (error) {
    handleError(error)
  }
}