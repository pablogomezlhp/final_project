import { Router } from 'express';
import Stripe from "stripe";

// import { parseISO} from 'date-fns'
import { getRepository } from 'typeorm';
// import AppointmentRepository from '../repositories/AppointmentsRepository'
import CreateCreditService from '../services/Credits/CreateCreditService';
import UpdateCreditService from '../services/Credits/UpdateCreditService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Credit from '../models/Credit';

const paymentRouter = Router();
const stripe = new Stripe('sk_test_L2m1MD49MTk950OBC5wmz7Do00iZ1kYyj7', {
  apiVersion: '2020-08-27',
});

paymentRouter.post('/', async (request, response) => {
  console.log('chegou na funcao')
  if (request.method === "POST") {
    try {
      const { amount } = request.body;
      // Psst. For production-ready applications we recommend not using the
      // amount directly from the client without verifying it first. This is to
      // prevent bad actors from changing the total amount on the client before
      // it gets sent to the server. A good approach is to send the quantity of
      // a uniquely identifiable product and calculate the total price server-side.
      // Then, you would only fulfill orders using the quantity you charged for.

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd"
      });

      response.status(200).send(paymentIntent.client_secret);
    } catch (err) {
      console.log('Deu erro')
      response.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method Not Allowed");
  }
});



export default paymentRouter;
