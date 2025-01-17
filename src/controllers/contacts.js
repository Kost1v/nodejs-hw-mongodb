import createHttpError from 'http-errors';
import {
  addContact,
  deleteContact,
  getContact,
  getContacts,
  getContactsById,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortByList } from '../db/models/Contacts.js';
import { parseFilterParams } from '../utils/filters/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const filter = parseFilterParams(req.query);
  filter.userId = req.user._id;

  const data = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId: _id } = req.params;

  const data = await getContact({ _id, userId });

  if (!data) {
    throw createHttpError(404, `Contact with id=${_id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${_id}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;

  const data = await addContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const upsertContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId: _id } = req.params;
  const { data, isNew } = await updateContact({ _id, userId }, req.body, {
    upsert: true,
  });

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully update a contact!',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId: _id } = req.params;
  const result = await updateContact({ _id, userId }, req.body);

  if (!result) {
    throw createHttpError(404, `Contact with id=${_id} not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully update a contact!',
    data: result.data,
  });
};

export const deleteContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId: _id } = req.params;

  const data = await deleteContact({ _id, userId });

  if (!data) {
    throw createHttpError(404, `Contact with id=${_id} not found`);
  }

  res.status(204).send();
};
