import ContactsCollection from "../db/models/Contacts.js"
import { calcPaginationData } from "../utils/calcPaginationData.js";

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {}
}) => {

  console.log(filter);

  const skip = (page - 1) * perPage;
  const limit = perPage;

  const contactsQuery = ContactsCollection.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').in(filter.isFavourite);
  }

  const data = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });
  const totalItems = await ContactsCollection.find().merge(contactsQuery).countDocuments();

  const PaginationData = calcPaginationData({ totalItems, page, perPage });

  return {
    data,
    ...PaginationData,
  };
};

export const getContactsById = (id) => ContactsCollection.findById(id);

export const addContact = data => ContactsCollection.create(data);

export const updateContact = async (_id, payload, options = {}) => {
  const { upsert = false } = options;
  const result = await ContactsCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
    upsert,
    runValidators: true,
    includeResultMetadata: true,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return {
    isNew,
    data: result.value,
  }
}

export const deleteContact = (filter) => ContactsCollection.findOneAndDelete(filter);
