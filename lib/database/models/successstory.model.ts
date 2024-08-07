import { Document, Schema, model, models } from "mongoose";

export interface IStory extends Document {
    _id: string,
    title: string;
    description?: string;
    createdAt: Date;
    imageUrl: string;
    comCategory:  {_id: string, name: string};
    organizer: {_id: string, firstName:string, lastName: string};
  }

const StorySchema = new Schema({
    title: {type:String, required: true},
    description: {type: String},
    createdAt: {type: Date, default: Date.now},
    imageUrl: {type: String, required: true},
    comCategory: {type: Schema.Types.ObjectId, ref: 'ComCategory'},
    organizer: {type: Schema.Types.ObjectId, ref: 'User'},
    
})

const Story = models.Story || model('Story', StorySchema);

export default Story;