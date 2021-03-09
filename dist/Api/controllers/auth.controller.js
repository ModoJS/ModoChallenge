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
const express_validator_1 = require("express-validator");
const usuario_services_1 = __importDefault(require("../../Services/usuario.services"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = __importDefault(require("../../helpers/jwt"));
class AuthController {
    constructor() {
        this.router = express_1.Router();
        this.route = '/login';
        this.router.post('/nuevo/crear', this.crearUsuario);
        this.router.post('/', [
            express_validator_1.check('email', 'el email es obligatorio').isEmail(),
            express_validator_1.check('password', 'el password es obligatorio').not().isEmpty()
        ], this.login);
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                //verifico email
                const usuarioDB = yield usuario_services_1.default.getByEmail({ email });
                // console.log(usuarioDB[0].password);
                console.log();
                //verifico password
                const validPass = bcryptjs_1.default.compareSync(password, usuarioDB[0].password);
                const token = yield jwt_1.default.generarJWT(usuarioDB[0].id);
                if (!validPass) {
                    return res.status(400).json({
                        ok: true,
                        payload: 'El login no es valido password o email incorrectos.'
                    });
                }
                res.status(201).json({
                    ok: true,
                    payload: token
                });
            }
            catch (error) {
                return res.status(500).json({
                    ok: true,
                    error: 'Problemas con el Servidor',
                });
            }
        });
    }
    crearUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            console.log(body);
            return yield usuario_services_1.default.post(body)
                .then((createdEntity) => {
                return res.status(201).json({
                    ok: true,
                    payload: 'Se ha cargado correctamente!!'
                });
            })
                .catch((e) => {
                return res.status(404).json({
                    ok: true,
                    error: 'no se puede guardar el movimiento',
                });
            });
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map