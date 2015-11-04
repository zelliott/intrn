import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  id: String,
  name: String,
  rating: Number,
  salary: Number,
  location: String,
  classSize: Number,
  length: Number,
  difficulty: Number,
  positions: [{
    type: Schema.ObjectId,
    ref: 'Position'
  }]
});

export default mongoose.model('Company', CompanySchema);
