import Usuario from '../Entities/usuario.entity';
import { usuario } from '../models/usuario.model';
import IRepository from './IRepository';
import bcrypt from 'bcryptjs';

class UsuarioRepository implements IRepository{

    constructor() {

    }

    async Create(usuario: usuario): Promise<any>{
        const newUser = new Usuario(usuario);
        newUser.password = bcrypt.hashSync(newUser.password, 8)
        
        return await newUser.save((err: Error, userSaved: usuario) => {          
            if (err) throw err;
            return userSaved;
        });
    }
    async Retrieve(Expression: any): Promise<any>{
        console.log(Expression);
        
        return await Usuario.find( Expression , (err: Error, usuario: usuario) => {
            if (err) {
                return;
            }
            console.log(usuario);
            
            return usuario;
        });
    }    
    async Update(id: any , usuario: usuario): Promise<boolean> {
        return await Usuario.findOne({
            movement_id: id
        })
        .then((UserFounded: any) => {
            if(usuario.email)  UserFounded.email = usuario.email; 
            if(usuario.password)  UserFounded.password = usuario.password; 
            UserFounded
                .save((err: Error, UserModified: any) => {
                    if (err) throw err;
                    return true;
                });
        })
        .catch((err: Error) =>{
            console.log(err);
            return false;            
        });
    }
    async Delete(usuario: any): Promise<boolean>  {
        return await Usuario.deleteOne({ 
                        'email': usuario.email 
                    },(err: Error, UserDeleted: any) => {
                            if (err) throw err;
                            return true;
                    })
                    .catch((err: Error) =>{
                        return false;            
                    });
    }

}
export default new UsuarioRepository;