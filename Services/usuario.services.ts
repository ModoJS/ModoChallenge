import statementRepository from "../DAL/Repositories/statement.repository";
import { usuario } from '../DAL/models/usuario.model';
import usuarioRepository from "../DAL/Repositories/usuario.repository";

class UsuarioServices {

    constructor(UsuarioRepository: any) {
    }
    async post(usuario: usuario) {    
        
        console.log(usuario);
        
        return await usuarioRepository.Create(usuario);
    }
    async getAll() {
        return await usuarioRepository.Retrieve({});
    }
    async getByEmail(email: any) { 
        console.log(email);
         
        return await usuarioRepository.Retrieve(email);
    }
    async deleteByNumberId(id: number) {  
        return await usuarioRepository.Delete(id);
    }
    async putByNumberId(id: number, usuario: usuario) {  
        return await usuarioRepository.Update(id, usuario);
    }
}
export default new UsuarioServices(usuarioRepository);