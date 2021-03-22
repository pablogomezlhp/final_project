import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/Users/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UpdateUserAvatarService from '../services/Users/UpdateUserAvatarService';
import UpdateUserService from '../services/Users/UpdateUserService';

import CreateCreditService from '../services/Credits/CreateCreditService';

import User from '../models/User';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);

  const listUsers = await userRepository.find();

  const userWithoutPassword = listUsers.map(
    ({ password, ...keepAttrs }) => keepAttrs,
  );

  response.json(userWithoutPassword);
});

usersRouter.post('/', async (request, response) => {
  const { username, email, password, mobile, role_ID } = request.body;

  const createUser = new CreateUserService();
  const user = await createUser.execute({
    username,
    email,
    password,
    mobile,
    role_ID,
  });

  const createUserCredit = new CreateCreditService();
  const balance = 0;
  const userCredit = await createUserCredit.execute({
    driver_id: user.id,
    balance,
  });


  // Com a atualização do TypeScript, isso se faz necessário
  const userWithoutPassword = {
    id: user.id,
    username: user.username,
    email: user.email,
    mobile: user.mobile,
    role_ID: user.role_ID,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  //  delete user.password;

  return response.json({userWithoutPassword, userCredit});
});

usersRouter.put('/', ensureAuthenticated, async (request, response) => {
  const { username, password, mobile } = request.body;

  const updateUserData = new UpdateUserService();
  const user = await updateUserData.execute({
    user_id: request.user.id,
    username,
    password,
    mobile
  });

  // Com a atualização do TypeScript, isso se faz necessário
  const userWithoutPassword = {
    id: user.id,
    username: user.username,
    email: user.email,
    mobile: user.mobile,
    role_ID: user.role_ID,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  //  delete user.password;

  return response.json(userWithoutPassword);
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(user);
  },
);

export default usersRouter;
