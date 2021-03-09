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
const express_1 = require("express");
const usuario_services_1 = __importDefault(require("../../Services/usuario.services"));
class UserController {
    constructor(UsuarioServices) {
        this.router = express_1.Router();
        this.route = '/user';
        this.router.post('/', this.crearUsuario);
    }
    crearUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            return yield usuario_services_1.default.post(body)
                .then((createdEntity) => {
                return res.status(201).json({
                    ok: true,
                    payload: 'El usuario se ha creado  correctamente!!'
                });
            })
                .catch((e) => {
                return res.status(500).json({
                    ok: true,
                    error: 'Error en el servidor',
                });
            });
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map