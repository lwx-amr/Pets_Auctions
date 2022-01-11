import { model, Schema } from 'mongoose';

const SchemaTypes = Schema.Types;

const BidSchema = Schema({
  _id: {
    type: SchemaTypes.long,
  },
  petId: {
    type: SchemaTypes.long,
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
