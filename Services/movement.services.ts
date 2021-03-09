import MovementRepository from '../DAL/Repositories/movement.repository';
import { movement } from "../DAL/models/movement.model";

class MovementServices {

    constructor(MovementRepository: any) {
    }
    async post(movement: movement) {      
        return await MovementRepository.Create(movement);
    }
    async get(expresion: any) {
        let filtro = this.Filtro(expresion); 
       let pagination =  { increment_id: {$gte: expresion.since_id} } 
       if(expresion.since_id){
        filtro = { $and: [pagination,filtro ]}
       }
       let limit = parseInt(expresion.count) || 0;
       let newExpression = [filtro, limit]
     
        return await MovementRepository.Retrieve(newExpression)
        .then( data => {  
            let since = 0;        
            if(data.length>0){
                since = data[data.length-1].increment_id
                data = data.map((d:any) =>{ 
                    return {
                        "movement_id" : d.movement_id,
                        "description" : d.description,
                        "amount": d.amount,
                        "fecha": d.fecha,
                        card:{
                            "type": d.card?.type,
                            "brand": d.card?.brand
                        }
                    }
                });
            }
           return [data, since || 0]
        });
    }
    async deleteByNumberId(number_id: number) {  
        return await MovementRepository.Delete(number_id);
    }
    async putByNumberId(number_id: number, movement: movement) {  
        return await MovementRepository.Update(number_id, movement);
    }
    private Filtro(expresion: any){
        let filtro = {}
        let hoy = new Date() 
        if(expresion && expresion.movement_id){            
            filtro = { movement_id: parseInt(expresion.movement_id)};         
        }
        if(expresion && expresion.fecha){   
           switch(expresion.fecha){
               case 'ultimo dia': hoy.setDate(hoy.getDate() - 1)
                                  filtro = { "fecha": { "$gte": new Date(hoy) }};
                   break;
               case 'ultimos 7 dias': hoy.setDate(hoy.getDate() - 7)                                   
                                   filtro = {"fecha": {"$gte": new Date(hoy) }};
                   break;
               case 'ultimo mes': hoy.setDate(hoy.getDate() - 30);
                                  filtro = {'fecha': {'$gte': new Date(hoy) }};
                  break;
           }    
        }
        return filtro;
    }

}
export default new MovementServices(MovementRepository);