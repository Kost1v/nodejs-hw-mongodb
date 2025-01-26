import { readFileSync } from 'node:fs';
import { SWAGGER_PATH } from '../constants/index.js';
import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';

export const swaggerDocs = () => {
  try {
    const docs = JSON.parse(readFileSync(SWAGGER_PATH, 'utf-8'));
    return [...swaggerUI.serve, swaggerUI.setup(docs)];
  } catch (error) {
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
