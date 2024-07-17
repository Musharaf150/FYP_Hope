import { Document, Schema, model, models } from "mongoose";

export interface ICompaign extends Document {
    _id: string,
    title: string;
    description?: string;
    createdAt: Date;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    goal: string;
    isZakatEligible: boolean;
    comCategory:  {_id: string, name: string};
    organizer: {_id: string, firstName:string, lastName: string};
  }

const CompaignSchema = new Schema({
    title: {type:String, required: true},
    description: {type: String},
    createdAt: {type: Date, default: Date.now},
    imageUrl: {type: String, required: true},
    startDateTime: {type: Date, default: Date.now},
    endDateTime: {type: Date, default: Date.now},
    goal: {type: String},
    isZakatEligible: {type: Boolean, default: false},
    comCategory: {type: Schema.Types.ObjectId, ref: 'ComCategory'},
    organizer: {type: Schema.Types.ObjectId, ref: 'User'},
    
})

const Compaign = models.Compaign || model('Compaign', CompaignSchema);

export default Compaign;