import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  id: String,
  name: String,
  count: Number
});

export default mongoose.model('Role', RoleSchema);
