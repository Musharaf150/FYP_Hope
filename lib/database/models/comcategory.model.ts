import { Document, Schema, model, models } from "mongoose";

export interface IComCategory extends Document {
  _id: string;
  name: string;
}

const ComCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
})

const ComCategory = models.ComCategory || model('ComCategory', ComCategorySchema);

export default ComCategory;
