import { Schema, model } from 'mongoose';

const PetSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'pending', 'sold'],
    default: 'available',
  },
  owner: {
    type: Schema.ObjectId,
    required: true,
  },
});

const PetModel = model('Pet', PetSchema);

export default PetModel;
