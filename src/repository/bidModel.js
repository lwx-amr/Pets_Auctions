import { Schema, model } from 'mongoose';

const { ObjectId } = Schema;

const BidSchema = Schema({
  petId: {
    type: ObjectId,
    required: true,
  },
  userId: {
    type: ObjectId,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const BidModel = model('Bid', BidSchema);

export default BidModel;
