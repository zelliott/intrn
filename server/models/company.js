import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  id: String,
  name: String,
  rating: Number,
  salary: Number,
  funness: Number,
  perks: Number,
  location: String,
  classSize: Number,
  length: Number,
  difficulty: Number,
  roles: [{
    type: Schema.ObjectId,
    ref: 'Role'
  }]
});

export default mongoose.model('Company', CompanySchema);
