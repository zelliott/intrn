import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MetricSchema = new Schema({
  statistics: [{
    timestamp: Date,
    size: Number,
    mean: Number
  }],
  values: [{
    timestamp: Date,
    value: Number
  }]
});

export default mongoose.model('Metric', MetricSchema);
