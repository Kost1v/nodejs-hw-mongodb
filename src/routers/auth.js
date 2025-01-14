import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { authLoginSchema, authRegisterSchema } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrlWrapper(registerController),
);
authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(loginController),
);
authRouter.post('/refresh', ctrlWrapper(refreshTokenController));
authRouter.post('/logout', ctrlWrapper(logoutController));

export default authRouter;
