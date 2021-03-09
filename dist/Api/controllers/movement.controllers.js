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
const movement_services_1 = __importDefault(require("../../Services/movement.services"));
const express_1 = require("express");
class MovementController {
    constructor(MovementService) {
        this.MovementService = MovementService;
        this.router = express_1.Router();
        this.route = '/movement';
        this.router.get('/', this.get);
        this.router.post('/', this.create);
        this.router.delete('/:movement_id', this.deleteByNumberId);
        this.router.put('/:movement_id', this.putByNumberId);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            return yield movement_services_1.default.post(body)
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
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            console.log(query);
            return yield movement_services_1.default.get(query)
                .then((data) => {
                if (!data) {
                    return res.status(404).json({
                        ok: true,
                        payload: "no se encontraron resultados"
                    });
                }
                return res.status(200).json({
                    ok: true,
                    max_id: data[1],
                    count: data[0].length,
                    payload: data[0]
                });
            });
        });
    }
    deleteByNumberId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movement_id } = req.params;
            return yield movement_services_1.default.deleteByNumberId(parseInt(movement_id))
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
            const { movement_id } = req.params;
            const { body } = req;
            return yield movement_services_1.default.putByNumberId(parseInt(movement_id), body)
                .then(actualizado => {
                if (!actualizado) {
                    return res.status(404).json({
                        ok: true,
                        message: 'El actualizado del movimiento no se pudo realizar',
                        payload: null
                    });
                }
                return res.status(200).json({
                    ok: true,
                    msg: 'El actualizado del movimiento fue realizado exitosamente!!'
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
exports.default = MovementController;
//# sourceMappingURL=movement.controllers.js.map