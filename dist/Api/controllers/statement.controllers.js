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
const statement_services_1 = __importDefault(require("../../Services/statement.services"));
const express_1 = require("express");
class StatementController {
    constructor(MovementService) {
        this.MovementService = MovementService;
        this.router = express_1.Router();
        this.route = '/stament';
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getByNumerId);
        this.router.post('/', this.create);
        this.router.delete('/:id', this.deleteByNumberId);
        this.router.put('/:id', this.putByNumberId);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            return yield statement_services_1.default.post(body)
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
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield statement_services_1.default.getAll()
                .then((data) => {
                return res.status(200).json({
                    ok: true,
                    payload: data
                });
            });
        });
    }
    getByNumerId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            return yield statement_services_1.default.getByNumerId(parseInt(id))
                .then(data => {
                if (!data) {
                    return res.status(404).json({
                        ok: true,
                        message: 'No se encontraron resultados',
                        payload: null
                    });
                }
                return res.status(200).json({
                    ok: true,
                    payload: data
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
    deleteByNumberId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movement_id } = req.params;
            return yield statement_services_1.default.deleteByNumberId(parseInt(movement_id))
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
            const { id } = req.params;
            const { body } = req;
            return yield statement_services_1.default.putByNumberId(parseInt(id), body)
                .then(actualizado => {
                if (!actualizado) {
                    return res.status(404).json({
                        ok: true,
                        message: 'El actualizado del resumen no se pudo realizar',
                        payload: null
                    });
                }
                return res.status(200).json({
                    ok: true,
                    msg: 'El actualizado del resumen fue realizado exitosamente!!'
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
exports.default = StatementController;
//# sourceMappingURL=statement.controllers.js.map