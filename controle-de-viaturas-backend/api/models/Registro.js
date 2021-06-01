const mongoose = require('mongoose');
const { Schema } = mongoose;

const registro = new Schema({
  signatario: { type: Schema.Types.ObjectId, ref: 'Militar', required: true },
  viaturas:   { type: [Object], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Registro', registro);