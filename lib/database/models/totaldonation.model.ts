import { Schema, model, models, Document } from 'mongoose'
import { ReactNode } from 'react'

export interface ITotaldonation extends Document {
  createdAt: Date
  stripeId: string
  amount: string
  donor: {
    _id: string
    email: string
    firstName: string
    lastName: string
  }
}

export type ITotaldonationItem = {
  stripeId: ReactNode
  _id: string
  amount: string
  createdAt: Date
  donor: {
    _id: string
    email: string
    firstName: string
    lastName: string
  }
}

const TotaldonationSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: String,
  },
  donor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Totaldonation = models.Totaldonation || model('Totaldonation', TotaldonationSchema)

export default Totaldonation