import { Schema, model } from 'mongoose';
import { typeList } from '../../constants/contacts.js';

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
  },
  { versionKey: false, timestamps: true },
);

const ContactsCollection = model('contact', contactsSchema);

contactsSchema.post('save', (error, doc, next) => {
  error.status = 400;
  next();
});

// contactsSchema.pre("findOneAndUpdate", function (next) {
//   this.options.new = true;
//   this.options.runValidators = true;
//   next()
// })

contactsSchema.post('findOneAndUpdate', (error, doc, next) => {
  error.status = 400;
  next();
});

export const sortByList = ['_id', 'name', 'phoneNumber'];

export default ContactsCollection;
