import { Schema, model, models, Document } from 'mongoose';

export interface IComRaised extends Document {
  createdAt: Date;
  stripeId: string;
  raisedAmount: string;
  compaign: {
    _id: string;
    title: string;
  };
  donor: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

export type IComRaisedItem = {
  _id: string;
  raisedAmount: string;
  createdAt: Date;
  compaignTitle: string;
  compaignId: string;
  donor: string;
};

const ComRaisedSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  raisedAmount: {
    type: String,
    required: true,
  },
  compaign: {
    type: Schema.Types.ObjectId,
    ref: 'Compaign',
    required: true,
  },
  donor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const ComRaised = models.ComRaised || model('ComRaised', ComRaisedSchema);

export default ComRaised;
