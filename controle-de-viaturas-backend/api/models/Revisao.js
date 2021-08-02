const mongoose = require('mongoose');
const { Schema } = mongoose;

const revisao = new Schema({
  viatura:   { type: Schema.Types.ObjectId, ref: 'Viatura', required: true },
  concluida: { type: Boolean },
  checklist: { type: [Object] }
}, { timestamps: true });

module.exports = mongoose.model('Revisao', revisao);