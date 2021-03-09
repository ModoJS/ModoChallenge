import Card from '../Entities/card.entity';
import { card } from '../models/card.model';
import IRepository from './IRepository';


class CardRepository implements IRepository{

 
    
    constructor() {

    }

    async Create(card: card): Promise<card>{
       const newCard = new Card(card);   
      
       return await newCard.save((err:Error, cardSaved: card) => {   
             if (err) throw err;
            return cardSaved;
        });       
    }
    async Retrieve(Expression: any): Promise<any>{
        
        return await Card.find(Expression, (err: Error, card: card[]) => {
            if (err) {
                return;
            }                
            return card;
        });
    }    
    async Update(id: any, card: card): Promise<boolean> {
        return await Card.findOne({
            number_id: id
        })
        .then((cardFounded: any) => {  
            if(card.number_id)  cardFounded.number_id = card.number_id; 
            if(card.type)  cardFounded.type = card.type; 
            if(card.brand) cardFounded.brand = card.brand;     
            
            cardFounded
                .save((err: Error, CardModified: card) => {
                    if (err) throw err;                
                    return true;
                });
        })
        .catch((err: Error) =>{
            console.log(err);
            return false;            
        });
    }
    async Delete(id: any): Promise<any>  {        
        return await Card.deleteOne({ 
                        'number_id': id
                    },(err: Error, CardDeleted: card) => {
                            if (err) throw err;
                            console.log(CardDeleted);                            
                            return true;
                    })
                    .catch((err: Error) =>{
                        console.log(err);
                        return false;            
                    });
    }

}
export default new CardRepository;