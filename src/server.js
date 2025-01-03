import express from 'express';
import cors from 'cors';

import { getEnvVar } from './utils/getEnvVar.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { logger } from './utils/logger.js';

const PORT = +getEnvVar('PORT', 3000);

const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(logger);

  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
