import ContactsCollection from "../db/models/Contacts.js"

export const getContacts = () => ContactsCollection.find();

export const getContactsById = (id) => ContactsCollection.findById(id);
