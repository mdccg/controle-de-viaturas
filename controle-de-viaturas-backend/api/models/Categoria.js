const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoria = new Schema({
  nome: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Categoria', categoria);