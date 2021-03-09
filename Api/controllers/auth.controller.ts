import {Router, Response, Request, NextFunction } from 'express';
import { check } from 'express-validator';
import usuarioServices from '../../Services/usuario.services';
import bcrypt from "bcryptjs"
import Helper from '../../helpers/jwt'
 class AuthController {
     public router: Router = Router();
     public route: string =  '/login';

    constructor() {   
        this.router.post('/nuevo/crear', this.crearUsuario)
        this.router.post('/', [        
            check('email','el email es obligatorio').isEmail(),
            check('password','el password es obligatorio').not().isEmpty()
        ], this.login);
       

    }

    async login(req: Request, res: Response, next: NextFunction) {
      const{email, password } = req.body;
        
      try {
            //verifico email
            const usuarioDB = await usuarioServices.getByEmail({ email } );
            // console.log(usuarioDB[0].password);
            console.log( );

            //verifico password
            const validPass = bcrypt.compareSync(password, usuarioDB[0].password)
            
            const token =  await Helper.generarJWT(usuarioDB[0].id);
            
            if(!validPass){
                return res.status(400).json({
                    ok: true,
                    payload: 'El login no es valido password o email incorrectos.'
                });
            }

            res.status(201).json({
                ok: true,
                payload: token
            });
      } catch (error:any) {
            return res.status(500).json({
                ok: true,
                error: 'Problemas con el Servidor',
            });
           
      }
             
    }
    async crearUsuario(req: Request, res: Response) {
        const {body} = req
        console.log(body);
        
        return await  usuarioServices.post(body)
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

 
}
export default AuthController;

