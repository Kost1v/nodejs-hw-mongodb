import { Schema, model } from 'mongoose';

const contactsSchema = new Schema({
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
    enum: ['work', 'home', 'personal'],
    default: 'personal',
    required: true,
  },
  createdAt: {
    type: String,
    timestamps: true,
  },
});

const ContactsCollection = model('contact', contactsSchema);

export default ContactsCollection;
