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
const movement_repository_1 = __importDefault(require("../DAL/Repositories/movement.repository"));
class MovementServices {
    constructor(MovementRepository) {
    }
    post(movement) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield movement_repository_1.default.Create(movement);
        });
    }
    get(expresion) {
        return __awaiter(this, void 0, void 0, function* () {
            let filtro = this.Filtro(expresion);
            let pagination = { increment_id: { $gte: expresion.since_id } };
            if (expresion.since_id) {
                filtro = { $and: [pagination, filtro] };
            }
            let limit = parseInt(expresion.count) || 0;
            let newExpression = [filtro, limit];
            return yield movement_repository_1.default.Retrieve(newExpression)
                .then(data => {
                let since = 0;
                if (data.length > 0) {
                    since = data[data.length - 1].increment_id;
                    data = data.map((d) => {
                        var _a, _b;
                        return {
                            "movement_id": d.movement_id,
                            "description": d.description,
                            "amount": d.amount,
                            "fecha": d.fecha,
                            card: {
                                "type": (_a = d.card) === null || _a === void 0 ? void 0 : _a.type,
                                "brand": (_b = d.card) === null || _b === void 0 ? void 0 : _b.brand
                            }
                        };
                    });
                }
                return [data, since || 0];
            });
        });
    }
    deleteByNumberId(number_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield movement_repository_1.default.Delete(number_id);
        });
    }
    putByNumberId(number_id, movement) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield movement_repository_1.default.Update(number_id, movement);
        });
    }
    Filtro(expresion) {
        let filtro = {};
        let hoy = new Date();
        if (expresion && expresion.movement_id) {
            filtro = { movement_id: parseInt(expresion.movement_id) };
        }
        if (expresion && expresion.fecha) {
            switch (expresion.fecha) {
                case 'ultimo dia':
                    hoy.setDate(hoy.getDate() - 1);
                    filtro = { "fecha": { "$gte": new Date(hoy) } };
                    break;
                case 'ultimos 7 dias':
                    hoy.setDate(hoy.getDate() - 7);
                    filtro = { "fecha": { "$gte": new Date(hoy) } };
                    break;
                case 'ultimo mes':
                    hoy.setDate(hoy.getDate() - 30);
                    filtro = { 'fecha': { '$gte': new Date(hoy) } };
                    break;
            }
        }
        return filtro;
    }
}
exports.default = new MovementServices(movement_repository_1.default);
//# sourceMappingURL=movement.services.js.map