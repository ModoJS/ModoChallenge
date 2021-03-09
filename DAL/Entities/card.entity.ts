// import model from './movement.entity';
var {Schema, model} = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// const Schema = mongoose.Schema;

const CardSchema = new Schema({
    number_id: { type: String,  unique: true, required: [true, 'El numero es necesario'] },
    type: { type: String, required: [true, 'El tipo de tarjeta es necesario'] },
    brand: { type: String, required: [true, 'La marca de la tarjeta es necesaria'] }  
});
CardSchema.plugin(uniqueValidator,{message:'{PATH} debe ser unico'});


export default model('card', CardSchema);