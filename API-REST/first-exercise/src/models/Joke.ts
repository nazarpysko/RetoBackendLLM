import mongoose, { Document, Schema } from 'mongoose';

export interface Joke extends Document {
  text: string;
}

const JokeSchema = new Schema<Joke>({
  text: { type: String, required: true }
});

export default mongoose.model<Joke>('Joke', JokeSchema);
