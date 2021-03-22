import { getRepository, getConnection } from 'typeorm';

import AppError from '../../errors/AppError';

import Card from '../../models/Card';
import User from '../../models/User';

interface Request {
    card_number:string;
    cvc_number: string;
    expiry_date: string;
    name_card:string
    name:string;
    driver_id:string;
    default_card: boolean;
}

class CreateCarService {
  public async execute({
    card_number,
    cvc_number,
    expiry_date,
    default_card,
    name,
    name_card,
    driver_id
  }: Request): Promise<Card> {
    const cardsRepository = getRepository(Card);
    const usersRepository = getRepository(User);

    const checkCardsExists = await cardsRepository.findOne({
      where: { card_number, driver_id },
    });

    if (checkCardsExists) {
        throw new AppError('This card was already registered.');
    }

    if(default_card) {
        const checkCardsDefault = await cardsRepository.find({
            where: { driver_id },
        });

        if(checkCardsDefault) {
            await getConnection()
                .createQueryBuilder()
                .update(Card)
                .set({ default_card: false})
                .where("driver_id = :driver_id", { driver_id })
                .execute();
        }
    }

    const checkUserExists = await usersRepository.findOne({
        where: { id: driver_id },
    });

    if (!checkUserExists) {
        throw new AppError('User not registered.');
    }

    const card = cardsRepository.create({
        card_number,
        cvc_number,
        expiry_date,
        name_card,
        default_card,
        name,
        driver_id
    });

    await cardsRepository.save(card);

    return card;
  }
}

export default CreateCarService;
