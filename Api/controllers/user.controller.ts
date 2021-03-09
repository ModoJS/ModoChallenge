import {Router, Response, Request } from 'express';
import usuarioServices from '../../Services/usuario.services';


 class UserController {
     public router: Router = Router();
     public route: string =  '/user';

    constructor(UsuarioServices :any) {   
        this.router.post('/', this.crearUsuario);
    }
    async crearUsuario(req: Request, res: Response) {
        const {body} = req       
        return await  usuarioServices.post(body)
        .then((createdEntity) =>{

            return res.status(201).json({
                ok: true,
                payload: 'El usuario se ha creado  correctamente!!'
            });
        })
        .catch((e:Error) =>{
            return res.status(500).json({
                    ok: true,
                    error: 'Error en el servidor',
                });
        });       
    }

 
}
export default UserController;
