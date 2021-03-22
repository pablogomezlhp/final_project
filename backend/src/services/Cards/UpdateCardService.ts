import { getRepository, getConnection } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../../errors/AppError';
import Card from '../../models/Card';

interface Request {
    card_number:string;
    cvc_number: string;
    expiry_date: string;
    name_card:string
    name:string;
    driver_id:string;
    default_card: boolean;
    id:string
}

class UpdateCardService {
  public async execute({ id, card_number,cvc_number, expiry_date, name_card ,name,driver_id,default_card}: Request): Promise<Card> {
    const cardRepository = getRepository(Card);

    const card = await cardRepository.findOne({
        where: {id , driver_id},
    });

    if (!card) {
      throw new AppError('Card is not found', 401);
    }

    if(default_card) {
        const checkCardsDefault = await cardRepository.find({
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

    card.card_number = card_number;
    card.cvc_number = cvc_number;
    card.expiry_date = expiry_date;
    card.name_card = name_card;
    card.name = name,
    card.default_card = default_card


    await cardRepository.save(card);

    return card;
  }
}

export default UpdateCardService;
