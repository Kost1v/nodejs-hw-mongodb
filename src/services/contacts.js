import ContactsCollection from "../db/models/Contacts.js"

export const getContacts = () => ContactsCollection.find();

export const getContactsById = (id) => ContactsCollection.findById(id);

export const addContact = data => ContactsCollection.create(data);

export const deleteContact = (filter) => ContactsCollection.findOneAndDelete(filter);

export const updateContact = async (_id, payload, options = {}) => {
  const { upsert = false } = options;
  const result = await ContactsCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
    upsert,
    includeResultMetadata: true,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return {
    isNew,
    data: result.value,
  }
}
