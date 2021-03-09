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
const card_services_1 = __importDefault(require("../../Services/card.services"));
const express_1 = require("express");
class CardController {
    constructor(CardService) {
        this.CardService = CardService;
        this.router = express_1.Router();
        this.route = '/card';
        this.router.get('/', this.getCards);
        this.router.post('/', this.create);
        this.router.delete('/:number_id', this.deleteByNumberId);
        this.router.put('/modificar/:number_id', this.putByNumberId);
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            return yield card_services_1.default.post(body)
                .then((createdEntity) => {
                return res.status(201).json({
                    ok: true,
                    payload: 'Se ha cargado correctamente!!'
                });
            })
                .catch((e) => {
                return res.status(404).json({
                    ok: true,
                    error: 'no se puede guardar la tarjeta',
                });
            });
        });
    }
    getCards(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            return yield card_services_1.default.get(query)
                .then((data) => {
                return res.status(200).json({
                    ok: true,
                    payload: data
                });
            });
        });
    }
    deleteByNumberId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { number_id } = req.params;
            return yield card_services_1.default.deleteByNumberId(parseInt(number_id))
                .then((borrado) => {
                if (!borrado) {
                    return res.status(404).json({
                        ok: true,
                        message: 'El borrado no se pudo realizar',
                        payload: null
                    });
                }
                return res.status(200).json({
                    ok: true,
                    msg: 'El borrado fue realizado exitosamente!!'
                });
            }).catch((e) => {
                console.log(e);
                return res.status(500).json({
                    ok: true,
                    message: 'Errores en el sevidor',
                });
            });
        });
    }
    putByNumberId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { number_id } = req.params;
            const { body } = req;
            return yield card_services_1.default.putByNumberId(parseInt(number_id), body)
                .then(actualizado => {
                if (!actualizado) {
                    return res.status(404).json({
                        ok: true,
                        message: 'El actualizado no se pudo realizar',
                        payload: null
                    });
                }
                return res.status(200).json({
                    ok: true,
                    msg: 'El actualizado fue realizado exitosamente!!'
                });
            }).catch(e => {
                console.log(e);
                return res.status(500).json({
                    ok: true,
                    message: 'Errores en el sevidor',
                });
            });
        });
    }
}
exports.default = CardController;
//# sourceMappingURL=card.controllers.js.map