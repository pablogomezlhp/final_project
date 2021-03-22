import { Router } from 'express';
// import { parseISO} from 'date-fns'
import { getRepository } from 'typeorm';
// import AppointmentRepository from '../repositories/AppointmentsRepository'
import CreateOrderService from '../services/Orders/CreateOrderService';
import UpdateOrderService from '../services/Orders/UpdateOrderService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import Order from '../models/Order';

const ordersRouter = Router();

//Rota: Receber a requisição, chamar um arquivo, devolver uma resposta.

//Middleware que ira ser executado em todas as rotas do Cars.
ordersRouter.use(ensureAuthenticated);

ordersRouter.get('/allOrders', async (request, response) => {
    // console.log(request.user);
    const orderRepository = getRepository(Order);

    const orders = await orderRepository.find();

    return response.json(orders);
});

ordersRouter.get('/', async (request, response) => {
    // console.log(request.user);
    const orderRepository = getRepository(Order);

    const orders = await orderRepository.find({
        where: {driver_id: request.user.id}
    });

    return response.json(orders);
})

ordersRouter.post('/', async (request, response) => {
    const { latitude, longitude, price, car_id, duration } = request.body;

    const createOrder = new CreateOrderService();
    const order = await createOrder.execute({
        driver_id: request.user.id,
        latitude,
        longitude,
        price,
        car_id,
        duration
    }); 

    return response.json(order);
});

ordersRouter.patch('/:id', async (request, response) => {
    const { id } = request.params;
    const { duration } = request.body;

    const updateOrder = new UpdateOrderService();
    const order = await updateOrder.execute({
        driver_id: request.user.id,
        id,
        duration
    });

    return response.json(order);
})

export default ordersRouter;
