const mongoose = require('mongoose');
const { Schema } = mongoose;

const viatura = new Schema({
  prefixo: { type: String, required: true },
  km:      { type: Number },
  nivelCombustivel: { type: String },
  comentario: String,
  categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
});

module.exports = mongoose.model('Viatura', viatura);