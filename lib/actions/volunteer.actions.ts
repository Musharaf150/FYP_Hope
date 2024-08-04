import { CreateVolunteerParams } from "@/types";
import { connectToDatabase } from "../database";
import Volunteer from "../database/models/volunteer.model";
import { handleError } from "../utils";

export const createVolunteer = async (volunteer:CreateVolunteerParams) => {
    try {
      await connectToDatabase();
      
      const newVolunteer = await Volunteer.create({
        ...volunteer,
        event: volunteer.eventId,
        volunteer: volunteer.volunteerId,
      });
  
      console.log(newVolunteer)
  
      return JSON.parse(JSON.stringify(newVolunteer));
      
    } catch (error) {
      handleError(error);
    }
  }