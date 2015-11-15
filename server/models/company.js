import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  id: String,
  name: String,
  rating: Number,
  salary: {
    type: Schema.ObjectId,
    ref: 'Metric'
  },
  funness: {
    type: Schema.ObjectId,
    ref: 'Metric'
  },
  perks: {
    type: Schema.ObjectId,
    ref: 'Metric'
  },
  difficulty: {
    type: Schema.ObjectId,
    ref: 'Metric'
  },
  location: String,
  classSize: Number,
  length: Number,
  roles: [{
    type: Schema.ObjectId,
    ref: 'Role'
  }]
});

export default mongoose.model('Company', CompanySchema);
