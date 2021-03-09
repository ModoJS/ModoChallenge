import CardRepository from '../DAL/Repositories/card.repository';
import { card } from "../DAL/models/card.model";
import bcrypt from 'bcryptjs';

class CardService {

    constructor() {
    }
    async post(card: card) {
        let newNumber_Id = (card.number_id.toString());   
        card.number_id = this.encryptNumber_Id(newNumber_Id);
        
        return await CardRepository.Create(card);
    }
    async get(expresion: any) {
        let filtro = {};  
        return await CardRepository.Retrieve(filtro);
    }
    async deleteByNumberId(number_id: number) {  
        return await CardRepository.Delete(number_id);
    }
    async putByNumberId(number_id: number, card: card) {  
        return await CardRepository.Update(number_id, card);
    }
    private encryptNumber_Id(number_id: string){
       
        let crypt =  bcrypt.hashSync(number_id.substring(6), 8);
        
        return  number_id.substring(0,6) + crypt

    }
}
export default new CardService;