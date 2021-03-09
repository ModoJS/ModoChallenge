var {Schema, model, connection} = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);
const movementSchema = new Schema({
    movement_id: { type: Number,  required: [true, 'El id es necesario'] },
    description: { type: String },
    amount: { type: Number },
    fecha: { type: Date },
    card: { type: Schema.Types.ObjectId, ref: 'card' },
    increment_id: {type: Number, default: 0, unique: true}
});

movementSchema.plugin(autoIncrement.plugin, {
    model: 'movement',
    field: 'increment_id',
    startAt: 1,
    incrementBy: 1
});

export default model('movement', movementSchema);