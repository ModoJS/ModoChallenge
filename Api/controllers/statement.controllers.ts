import { CardDTO } from '../DTO/card.dto';
import StamentService from "../../Services/statement.services";
import {Router, Response, Request, NextFunction } from 'express';


 class StatementController {
     public router: Router = Router();
     public route: string =  '/stament';

    constructor(public MovementService: any ) {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getByNumerId);
        this.router.post('/', this.create);
        this.router.delete('/:id', this.deleteByNumberId);
        this.router.put('/:id', this.putByNumberId);

    }

    async create(req: Request, res: Response) {
          const {body} = req
        return await  StamentService.post(body)
        .then((createdEntity) =>{
            return res.status(201).json({
                ok: true,
                payload: 'Se ha cargado correctamente!!'
            });
        })
        .catch((e:Error) =>{
            return res.status(404).json({
                    ok: true,
                    error: 'no se puede guardar el movimiento',
                });
        });       
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        return await StamentService.getAll()
        .then((data: any) => {
                return res.status(200).json({
                    ok: true,
                    payload: data
                });
            });
    }
    async getByNumerId(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
   
        return await StamentService.getByNumerId(parseInt(id))
        .then(data =>{
            if (!data) {
                return res.status(404).json({
                    ok: true,
                    message: 'No se encontraron resultados',
                    payload: null
                });               
            }
            return res.status(200).json({
                ok: true,
                payload: data
            });
        }).catch(e => {
            console.log(e)
            return res.status(500).json({
                ok: true,
                message: 'Errores en el sevidor',
            }); 
        });
      
    }
    async deleteByNumberId(req: Request, res: Response, next: NextFunction) {
        const { movement_id } = req.params;
        return await StamentService.deleteByNumberId(parseInt(movement_id))
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
        const { id } = req.params;
        const { body } = req;

        return await StamentService.putByNumberId(parseInt(id), body)
        .then( actualizado =>{
            if(!actualizado){
                return res.status(404).json({
                    ok: true,
                    message: 'El actualizado del resumen no se pudo realizar',
                    payload: null
                });      
            }
            return res.status(200).json({
                ok: true,
                msg:'El actualizado del resumen fue realizado exitosamente!!'
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
export default StatementController;

