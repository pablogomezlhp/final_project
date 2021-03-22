import { Router } from 'express';
// import { parseISO} from 'date-fns'
import { getRepository } from 'typeorm';
// import AppointmentRepository from '../repositories/AppointmentsRepository'
import CreateCarService from '../services/Cars/CreateCarService';
import DeleteCarService from '../services/Cars/DeleteCarService';
import UpdateCarService from '../services/Cars/UpdateCarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Car from '../models/Car';

const carsRouter = Router();

//Rota: Receber a requisição, chamar um arquivo, devolver uma resposta.

//Middleware que ira ser executado em todas as rotas do Cars
carsRouter.use(ensureAuthenticated);

carsRouter.get('/allCars', async (request, response) => {
    // console.log(request.user);
    const carRepository = getRepository(Car);

    const cars = await carRepository.find();

    return response.json(cars);
});

carsRouter.get('/', async (request, response) => {
    // console.log(request.user);
    const carRepository = getRepository(Car);

    const cars = await carRepository.find({
        where: {driver_id: request.user.id}
    });

    return response.json(cars);
})

carsRouter.post('/', async (request, response) => {
    const { model, year, color, vehicle_registration, default_car } = request.body;

    const createCar = new CreateCarService();
    const car = await createCar.execute({
        driver_id: request.user.id,
        year,
        model,
        vehicle_registration,
        color,
        default_car
    });

    return response.json(car);
});

carsRouter.put('/:id', async (request, response) => {

    const { id } = request.params;
    const { color, model, vehicle_registration, year, default_car } = request.body;
    const updateCar = new UpdateCarService();
    const car = await updateCar.execute({
        driver_id: request.user.id,
        id,
        color,
        model,
        vehicle_registration,
        year,
        default_car:true
    });
    console.log('car', car)
    return response.json(car);
})

carsRouter.delete('/:id', async (request, response) => {

    const { id } = request.params;

    const deleteCar = new DeleteCarService();

    await deleteCar.execute({ id, driver_id: request.user.id, });

    return response.status(204).send();

});

export default carsRouter;
