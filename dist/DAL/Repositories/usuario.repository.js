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
const usuario_entity_1 = __importDefault(require("../Entities/usuario.entity"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UsuarioRepository {
    constructor() {
    }
    Create(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new usuario_entity_1.default(usuario);
            newUser.password = bcryptjs_1.default.hashSync(newUser.password, 8);
            return yield newUser.save((err, userSaved) => {
                if (err)
                    throw err;
                return userSaved;
            });
        });
    }
    Retrieve(Expression) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(Expression);
            return yield usuario_entity_1.default.find(Expression, (err, usuario) => {
                if (err) {
                    return;
                }
                console.log(usuario);
                return usuario;
            });
        });
    }
    Update(id, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield usuario_entity_1.default.findOne({
                movement_id: id
            })
                .then((UserFounded) => {
                if (usuario.email)
                    UserFounded.email = usuario.email;
                if (usuario.password)
                    UserFounded.password = usuario.password;
                UserFounded
                    .save((err, UserModified) => {
                    if (err)
                        throw err;
                    return true;
                });
            })
                .catch((err) => {
                console.log(err);
                return false;
            });
        });
    }
    Delete(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield usuario_entity_1.default.deleteOne({
                'email': usuario.email
            }, (err, UserDeleted) => {
                if (err)
                    throw err;
                return true;
            })
                .catch((err) => {
                return false;
            });
        });
    }
}
exports.default = new UsuarioRepository;
//# sourceMappingURL=usuario.repository.js.map