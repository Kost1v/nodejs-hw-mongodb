import { Schema, model } from 'mongoose';
import { typeList } from '../../constants/contacts.js';
import { handleSaveError } from './hooks.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      required: true,
    },
    contactType: {
      type: String,
      enum: typeList,
      default: 'personal',
      required: true,
    },
    createdAt: {
      type: String,
      timestamps: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    }
  },
  { versionKey: false, timestamps: true },
);

const ContactsCollection = model('contact', contactsSchema);

contactsSchema.post('save', handleSaveError);

contactsSchema.post('findOneAndUpdate', handleSaveError);

export const sortByList = ['_id', 'name', 'phoneNumber'];

export default ContactsCollection;
