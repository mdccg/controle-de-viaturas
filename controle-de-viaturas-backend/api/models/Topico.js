const mongoose = require('mongoose');
const { Schema } = mongoose;

const topico = new Schema({
  titulo: { type: String, required: true },
  descricao: String
});

module.exports = mongoose.model('Topico', topico);