import { Document, model, models, Schema } from "mongoose";

export interface IVolunteer extends Document{
    _id: string;
    createdAt: Date;
    event: {
        _id: string;
        title: string;
      }
      participant: {
        _id: string
        email:string
        firstName: string
        lastName: string
      }
}

export type IVolunteerItem = {
    _id: string
    createdAt: Date
    eventTitle: string
    eventId: string
    participant: {
      _id: string
      email: string
      firstName: string
      lastName: string
    }
  }

const VolunteerSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
      },
      event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
      },
      participant: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    
})


const Volunteer = models.Volunteer  || model('Volunteer', VolunteerSchema)

export default Volunteer;