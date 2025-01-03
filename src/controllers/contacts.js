import createHttpError from 'http-errors';
import { addContact, deleteContact, getContacts, getContactsById, updateContact } from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const data = await getContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;

  const data = await getContactsById(contactId);

  if (!data) {
    throw createHttpError(404, `Contact with id=${contactId} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};

export const addContactController = async (req, res) => {

  const data = await addContact(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data,
  });
}
export const upsertContactController = async (req, res) => {

  const { contactId } = req.params;
  const {data, isNew} = await updateContact(contactId, req.body, {upsert: true});

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully update a contact!',
    data,
  });
}

export const patchContactController = async (req, res) => {

  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    throw createHttpError(404, `Contact with id=${contactId} not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully update a contact!',
    data: result.data,
  });
}

export const deleteContactsController = async (req, res) => {
  const { contactId } = req.params;

  const data = await deleteContact({ _id: contactId });

  if (!data) {
    throw createHttpError(404, `Contact with id=${contactId} not found`);
  }

  res.status(204).send()
};



