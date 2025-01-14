import { Router } from 'express';
import {
  addContactController,
  deleteContactsController,
  getContactsByIdController,
  getContactsController,
  patchContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactsByIdController),
);

contactsRouter.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.put(
  '/:contactId',
  isValidId,
  validateBody(contactAddSchema),
  ctrlWrapper(upsertContactController),
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactsController),
);

export default contactsRouter;
