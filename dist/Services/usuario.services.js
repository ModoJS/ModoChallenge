"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_repository_1 = __importDefault(require("../DAL/Repositories/usuario.repository"));
class UsuarioServices {
    constructor(UsuarioRepository) {
    }
    post(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(usuario);
            return yield usuario_repository_1.default.Create(usuario);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield usuario_repository_1.default.Retrieve({});
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(email);
            return yield usuario_repository_1.default.Retrieve(email);
        });
    }
    deleteByNumberId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield usuario_repository_1.default.Delete(id);
        });
    }
    putByNumberId(id, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield usuario_repository_1.default.Update(id, usuario);
        });
    }
}
exports.default = new UsuarioServices(usuario_repository_1.default);
//# sourceMappingURL=usuario.services.js.map