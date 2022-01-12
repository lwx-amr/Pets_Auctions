import { Schema, model } from 'mongoose';

const BidSchema = Schema({
  petId: {
    type: Schema.ObjectId,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const BidModel = model('Bid', BidSchema);

export default BidModel;
