const mongoose = require('mongoose');
const { Schema } = mongoose;

const manutencao = new Schema({
  viatura: Object,
  checklist: [Object],
  data: Date,
  revisao: { type: String, unique: true }
});

module.exports = mongoose.model('Manutencao', manutencao);