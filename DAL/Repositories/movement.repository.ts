import Card from '../Entities/card.entity';
import Movement from '../Entities/movement.entity';
import { movement } from '../models/movement.model';
import IRepository from './IRepository';
import { card } from '../models/card.model';

class MovementRepository implements IRepository{

    constructor() {

    }

    async Create(movement: movement): Promise<any>{
        const newMovement = new Movement(movement);
        return await newMovement.save((err: Error, movementSaved: movement) => {
            console.log(err);
            
            if (err) throw err;
            return movementSaved;
        });
    }
    async Retrieve(Expression: any): Promise<any>{
        
        return await Movement.find(Expression[0], (err: Error, movement: movement) => {
            if (err) {
                return;
            }
            return movement;
        }).populate('card','type brand').limit(Expression[1])
    }    
    async Update(id: any , movement: movement): Promise<boolean> {
        return await Movement.findOne({
            movement_id: id
        })
        .then((MovementFounded: any) => {
            if(movement.movement_id)  MovementFounded.movement_id = movement.movement_id; 
            if(movement.description)  MovementFounded.description = movement.description; 
            if(movement.amount)  MovementFounded.amount = movement.amount; 
            MovementFounded
                .save((err: Error, MovementModified: any) => {
                    if (err) throw err;
                    return true;
                });
        })
        .catch((err: Error) =>{
            console.log(err);
            return false;            
        });
    }
    async Delete(Movement: any): Promise<boolean>  {
        return await Movement.deleteOne({ 
                        'movement_id': Movement.movement_id 
                    },(err: Error, MovementDeleted: any) => {
                            if (err) throw err;
                            return true;
                    })
                    .catch((err: Error) =>{
                        console.log(err);
                        return false;            
                    });
    }

}
export default new MovementRepository;