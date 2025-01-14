import { Schema, model } from 'mongoose';
import { emailRegexp } from '../../constants/users.js';
import { handleSaveError } from './hooks.js';

const authSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      timestamps: true,
    },
    updatedAt: {
      type: String,
      timestamps: true,
    },
  },
  { versionKey: false, timestamps: true },
);

authSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

authSchema.post('save', handleSaveError);
authSchema.post('findOneAndUpdate', handleSaveError);

const UserCollection = model('auth', authSchema);

export default UserCollection;
