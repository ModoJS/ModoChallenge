"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const statementSchema = new Schema({
    id: { type: Number, required: [true, 'El id es necesario'] },
    Entity: { type: String, required: [true, 'El nombre del banco es necesario'] },
    Movements: { type: Schema.Types.ObjectId, ref: 'movement' }
});
exports.default = mongoose.model('statement', statementSchema);
//# sourceMappingURL=statement.entity.js.map