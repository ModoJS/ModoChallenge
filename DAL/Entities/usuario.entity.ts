var {Schema, model} = require('mongoose');

const UsuarioSchema = new Schema({
    email: { type: String,  Unique: true, required: [true, 'El email es necesario'] },
    password: { type: String, required: [true, 'El password es necesario'] },
});

export default model('usuario', UsuarioSchema);