import { Schema, model } from 'mongoose';

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
});

const UserModel = model('User', UserSchema);

export default UserModel;
