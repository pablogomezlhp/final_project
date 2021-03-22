import { Router } from 'express';
import AuthenticateUserService from '../services/Users/AuthenticateUserService';



const sessionsRouter = Router();

// Rota: Receber a requisição, chamar um arquivo, devolver uma resposta.

sessionsRouter.post('/', async (request, response) => {

// const typeOfUser = new CheckingUserTypeService();
// const {user }= typeOfUser.execute({email})
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    const userWithoutPassword = {
      id: user.id,
      username: user.username,
      email: user.email,
      mobile: user.mobile,
      roleId: user.role_ID,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json({ user: userWithoutPassword, token });
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default sessionsRouter;
