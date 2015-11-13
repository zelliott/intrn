import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SortSchema = new Schema({
  id: String,
  name: String,
  displayName: String,
  active: Boolean,
  direction: Boolean
});

export default mongoose.model('Sort', SortSchema);
