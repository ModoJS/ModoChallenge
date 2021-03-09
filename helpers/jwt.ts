
var jwt = require('jsonwebtoken');

class Helper{

    constructor(){

    }
    generarJWT(uid:any, expireIn:boolean = true){
        return new Promise((resolve,reject)=>{
            const payload = {
                uid,
            };
            if(expireIn){
                jwt.sign(payload, process.env.JWT_SECRET,{
                    expiresIn: '12h'
                }, (err: any, token: any) =>{
                    if(err){
                        console.log(err);
                        reject('No se pudo generar el jsowebtoken')
                    }else{
                        resolve(token);
                    }
    
                })
            }else{
                jwt.sign(payload, process.env.JWT_SECRET, 
                    (err: any, token: any) =>{
                    if(err){
                        console.log(err);
                        reject('No se pudo generar el jsowebtoken')
                    }else{
                        resolve(token);
                    }
    
                })
            }
            
        });       
    }
}

export default new Helper