// src/routes/index.ts
import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import carsRouter from './cars.routes';
import ordersRouter from './orders.routes';
import cardsRouter from './cards.routes'
import creditsRouter from './credits.routes'
import paymentRouter from './payment.routes'


const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/cars', carsRouter);
routes.use('/cards', cardsRouter);
routes.use('/orders', ordersRouter);
routes.use('/credits', creditsRouter);
routes.use('/payment_intents', paymentRouter);



export default routes;
