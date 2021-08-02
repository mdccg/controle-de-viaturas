const mongoose = require('mongoose');
const { Schema } = mongoose;

const manutencao = new Schema({
  viatura: Object,
  checklist: [Object],
  data: Date
});

module.exports = mongoose.model('Manutencao', manutencao);