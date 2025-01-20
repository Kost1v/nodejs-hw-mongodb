import * as fs from 'node:fs/promises';
import { UPLOADS_DIR } from '../constants/index.js';
import path from 'node:path';

export const saveFileToUploadDir = async file => {
  const newPath = path.join(UPLOADS_DIR, file.filename)
  await fs.rename(file.path, newPath);
  return `/${file.filename}`
};
