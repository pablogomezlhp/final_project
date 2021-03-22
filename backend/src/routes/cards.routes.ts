import { Router } from 'express';
// import { parseISO} from 'date-fns'
import { getRepository } from 'typeorm';
// import AppointmentRepository from '../repositories/AppointmentsRepository'
import CreateCardService from '../services/Cards/CreateCardService';
import DeleteCardService from '../services/Cards/DeleteCardService';
import UpdateCardService from '../services/Cards/UpdateCardService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Card from '../models/Card';

const cardsRouter = Router();

//Rota: Receber a requisição, chamar um arquivo, devolver uma resposta.

//Middleware que ira ser executado em todas as rotas do Cars
cardsRouter.use(ensureAuthenticated);

cardsRouter.get('/allCards', async (request, response) => {
    // console.log(request.user);
    const cardRepository = getRepository(Card);

    const cards = await cardRepository.find();

    return response.json(cards);
});

cardsRouter.get('/', async (request, response) => {
    // console.log(request.user);
    const cardRepository = getRepository(Card);

    const cards = await cardRepository.find({
        where: {driver_id: request.user.id}
    });

    return response.json(cards);
})

cardsRouter.post('/', async (request, response) => {

    const {
      card_number,
      cvc_number,
      expiry_date,
      default_card,
      name,
      name_card,
       } = request.body;

    const createCard = new CreateCardService();
    const card = await createCard.execute({
        driver_id: request.user.id,
        card_number,
        cvc_number,
        expiry_date,
        default_card,
        name,
        name_card,
    });

    return response.json(card);
});

cardsRouter.put('/:id', async (request, response) => {
    const { id } = request.params;
    const {
      card_number,
      cvc_number,
      expiry_date,
      default_card,
      name,
      name_card,
       } = request.body;

    const updateCard = new UpdateCardService();
    const card = await updateCard.execute({
      card_number,
      cvc_number,
      expiry_date,
      default_card,
      name,
      name_card,
      id,
      driver_id: request.user.id
    });

    return response.json(card);
})

cardsRouter.delete('/:id', async (request, response) => {

    const { id } = request.params;

    const deleteCard = new DeleteCardService();

    await deleteCard.execute({ id, driver_id: request.user.id, });

    return response.status(204).send();

});

export default cardsRouter;
