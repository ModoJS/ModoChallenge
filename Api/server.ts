import express, { Application, Router, Request, Response, NextFunction } from "express";
import cors from 'cors';
import { AppRouting } from "./routes/AppRouting";
import * as  swaggerOptions from "../config/swagger.json";
import swaggerUi from "swagger-ui-express";
const jwt = require('jsonwebtoken');
// import swaggerJsDoc from 'swagger-jsdoc';
// const swaggerJsDoc  = require("swagger-jsdoc");

class Server {

    private app: Application;
    private port: string;
    private router: Router;
    private swaggerDocs: any;
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.router = Router();
        // this.swaggerDocs = swaggerJsDoc(swaggerOptions);
       
        this.middleware();
        this.routes();
    }
    listen(){
        this.app.listen(this.port, () => {
            this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));
            console.log("Servidor corriendo en puerto "+ this.port);
        })
    }
    middleware(){ 
        this.app.use(cors())
                .use(express.json());                
    }
    validarJWT(req: Request, res: Response, next: NextFunction){
        const token = req.header('x-token');
        if(!token){
            return res.status(404).json({
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
    routes(){
        this.app.use('/api', this.router);
        new AppRouting(this.router);
    }

}
export default Server;