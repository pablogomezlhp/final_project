import { Router } from 'express';
// import { parseISO} from 'date-fns'
import { getRepository } from 'typeorm';
// import AppointmentRepository from '../repositories/AppointmentsRepository'
import CreateCreditService from '../services/Credits/CreateCreditService';
import UpdateCreditService from '../services/Credits/UpdateCreditService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Credit from '../models/Credit';

const creditsRouter = Router();

//Rota: Receber a requisição, chamar um arquivo, devolver uma resposta.

//Middleware que ira ser executado em todas as rotas do Cars
creditsRouter.use(ensureAuthenticated);

// creditsRouter.get('/allCars', async (request, response) => {
//     // console.log(request.user);
//     const carRepository = getRepository(Car);

//     const cars = await carRepository.find();

//     return response.json(cars);
// });

creditsRouter.get('/', async (request, response) => {
    // console.log(request.user);
    const creditRepository = getRepository(Credit);

    const credit = await creditRepository.find({
        where: {driver_id: request.user.id}
    });

    return response.json(credit);
})

creditsRouter.post('/', async (request, response) => {
    const { balance } = request.body;

    const createCredit = new CreateCreditService();
    const credit = await createCredit.execute({
        driver_id: request.user.id,
        balance,
    });

    return response.json(credit);
});

creditsRouter.put('/:id', async (request, response) => {
    // const { id } = request.params;
    const { balance, isPaid } = request.body;
    console.log('isPaid', isPaid);
    const updateCredit = new UpdateCreditService();
    const credit = await updateCredit.execute({
        driver_id: request.user.id,
        balance,
        isPaid
    });

    return response.json(credit);
})

export default creditsRouter;
