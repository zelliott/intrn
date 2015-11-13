import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FilterSchema = new Schema({
  id: String,
  name: String,
  displayName: String,
  range: [Number],
  values: [Number],
  step: Number,
  description: String
});

export default mongoose.model('Filter', FilterSchema);
