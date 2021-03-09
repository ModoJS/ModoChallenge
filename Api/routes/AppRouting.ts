import { Router, Request,  Response, NextFunction } from "express";
import cardServices from "../../Services/card.services";
import movementServices from "../../Services/movement.services";
import statementServices from "../../Services/statement.services";
import usuarioServices from "../../Services/usuario.services";
import AuthController from "../controllers/auth.controller";
import  CardController  from "../controllers/card.controllers";
import MovementController from "../controllers/movement.controllers";
import StatementController from "../controllers/statement.controllers";
import UserController from "../controllers/user.controller";
const jwt = require('jsonwebtoken');


export class AppRouting {
  constructor(private route: Router) {
    this.route = route;
    this.configure();
  }
  public configure() {
    // Add the routing classes.
    this.addRoute(new CardController(cardServices),true);
    this.addRoute(new MovementController(movementServices),true);
    this.addRoute(new StatementController(statementServices),true);
    this.addRoute(new AuthController(usuarioServices),false);
    this.addRoute(new UserController(usuarioServices),false);
  }
  validarJWT(req: Request, res: Response, next: NextFunction){
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion"
        });            
    }
    try{
        const {uid} = jwt.verify(token,process.env.JWT_SECRET);
         next();     
    }catch(err){
        console.log(err);
        return res.status(401).json({
            ok: false,
            msg: "Token no valido "
        });
    }                                              
   }
  private addRoute(appRoute: any,validate: boolean) {
    if(validate){
      this.route.use(appRoute.route, this.validarJWT, appRoute.router);
    }else{
      this.route.use(appRoute.route, appRoute.router);
    }
    
  }
}