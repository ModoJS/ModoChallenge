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
const card_entity_1 = __importDefault(require("../Entities/card.entity"));
class CardRepository {
    constructor() {
    }
    Create(card) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCard = new card_entity_1.default(card);
            return yield newCard.save((err, cardSaved) => {
                if (err)
                    throw err;
                return cardSaved;
            });
        });
    }
    Retrieve(Expression) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield card_entity_1.default.find(Expression, (err, card) => {
                if (err) {
                    return;
                }
                return card;
            });
        });
    }
    Update(id, card) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield card_entity_1.default.findOne({
                number_id: id
            })
                .then((cardFounded) => {
                if (card.number_id)
                    cardFounded.number_id = card.number_id;
                if (card.type)
                    cardFounded.type = card.type;
                if (card.brand)
                    cardFounded.brand = card.brand;
                cardFounded
                    .save((err, CardModified) => {
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
    Delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield card_entity_1.default.deleteOne({
                'number_id': id
            }, (err, CardDeleted) => {
                if (err)
                    throw err;
                console.log(CardDeleted);
                return true;
            })
                .catch((err) => {
                console.log(err);
                return false;
            });
        });
    }
}
exports.default = new CardRepository;
//# sourceMappingURL=card.repository.js.map