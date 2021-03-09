"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var { Schema, model } = require('mongoose');
const UsuarioSchema = new Schema({
    email: { type: String, Unique: true, required: [true, 'El email es necesario'] },
    password: { type: String, required: [true, 'El password es necesario'] },
});
exports.default = model('usuario', UsuarioSchema);
//# sourceMappingURL=usuario.entity.js.map