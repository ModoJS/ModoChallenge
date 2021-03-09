import { CardDTO } from '../DTO/card.dto';
import CardService from "../../Services/card.services";
import {Router, Response, Request, NextFunction } from 'express';


 class CardController {
     public router: Router = Router();
     public route: string =  '/card';

    constructor(public CardService: any) {
        this.router.get('/', this.getCards);
        this.router.post('/', this.create);
        this.router.delete('/:number_id', this.deleteByNumberId);
        this.router.put('/modificar/:number_id', this.putByNumberId);

    }

    async create(req: Request, res: Response, next: NextFunction) {
        const { body } = req;       
        return await  CardService.post(body)
        .then((createdEntity) =>{
            return res.status(201).json({
                ok: true,
                payload: 'Se ha cargado correctamente!!'
            });
        })
        .catch((e:Error) =>{
            return res.status(404).json({
                    ok: true,
                    error: 'no se puede guardar la tarjeta',
                });
        });       
    }
    async getCards(req: Request, res: Response, next: NextFunction) {
        const query = req.query
        return await CardService.get(query)
        .then((data: any) => {
                return res.status(200).json({
                    ok: true,
                    payload: data
                });
            });
    }
    async deleteByNumberId(req: Request, res: Response, next: NextFunction) {
        const { number_id } = req.params;
        return await CardService.deleteByNumberId(parseInt(number_id))
         .then( (borrado:any) =>{
            if(!borrado){
                return res.status(404).json({
                    ok: true,
                    message: 'El borrado no se pudo realizar',
                    payload: null
                });      
            }
            return res.status(200).json({
                ok: true,
                msg:'El borrado fue realizado exitosamente!!'
            });
        }).catch((e: Error) => {
            console.log(e)

            return res.status(500).json({
                ok: true,
                message: 'Errores en el sevidor',
            }); 
        });
    }
    async putByNumberId(req: Request, res: Response, next: NextFunction) {
        const { number_id } = req.params;
        const { body } = req;

        return await CardService.putByNumberId(parseInt(number_id), body)
        .then( actualizado =>{
            if(!actualizado){
                return res.status(404).json({
                    ok: true,
                    message: 'El actualizado no se pudo realizar',
                    payload: null
                });      
            }
            return res.status(200).json({
                ok: true,
                msg:'El actualizado fue realizado exitosamente!!'
            });
        }).catch(e => {
            console.log(e)

            return res.status(500).json({
                ok: true,
                message: 'Errores en el sevidor',
            }); 
        });
    }
}
export default CardController;

