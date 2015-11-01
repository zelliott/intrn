import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PositionSchema = new Schema({
  id: String,
  name: String
});

export default mongoose.model('Position', PositionSchema);
