const mongoose = require('mongoose');
const { Schema } = mongoose;

const viatura = new Schema({
  prefixo: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  km: {
    type: Number,
    required: true
  },
  nivelCombustivel: {
    type: String,
    required: true
  },
  comentario: String
});

module.exports = mongoose.model('Viatura', viatura);