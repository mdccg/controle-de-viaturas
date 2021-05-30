const mongoose = require('mongoose');
const { Schema } = mongoose;

const relatorio = new Schema({
  tipo: {
    type: String,
    required: true
  },
  relatorio: {
    type: Object,
    required: true
  },
});

module.exports = mongoose.model('Relatorio', relatorio);