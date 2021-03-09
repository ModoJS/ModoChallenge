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
const movement_entity_1 = __importDefault(require("../Entities/movement.entity"));
class MovementRepository {
    constructor() {
    }
    Create(movement) {
        return __awaiter(this, void 0, void 0, function* () {
            const newMovement = new movement_entity_1.default(movement);
            return yield newMovement.save((err, movementSaved) => {
                console.log(err);
                if (err)
                    throw err;
                return movementSaved;
            });
        });
    }
    Retrieve(Expression) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield movement_entity_1.default.find(Expression[0], (err, movement) => {
                if (err) {
                    return;
                }
                return movement;
            }).populate('card', 'type brand').limit(Expression[1]);
        });
    }
    Update(id, movement) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield movement_entity_1.default.findOne({
                movement_id: id
            })
                .then((MovementFounded) => {
                if (movement.movement_id)
                    MovementFounded.movement_id = movement.movement_id;
                if (movement.description)
                    MovementFounded.description = movement.description;
                if (movement.amount)
                    MovementFounded.amount = movement.amount;
                MovementFounded
                    .save((err, MovementModified) => {
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
    Delete(Movement) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Movement.deleteOne({
                'movement_id': Movement.movement_id
            }, (err, MovementDeleted) => {
                if (err)
                    throw err;
                return true;
            })
                .catch((err) => {
                console.log(err);
                return false;
            });
        });
    }
}
exports.default = new MovementRepository;
//# sourceMappingURL=movement.repository.js.map