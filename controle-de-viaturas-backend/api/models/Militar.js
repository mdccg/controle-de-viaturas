const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcryptjs');

const militar = new Schema({
  patente: { type: String, required: true },
  nome:    { type: String, required: true },
  email:   { type: String, required: true, unique: true, lowercase: true },
  senha:   { type: String, required: true, select: false },
  tipo:    { type: String, required: true },
  ativo:   { type: Boolean, required: true }
});

militar.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;
  next();
});

module.exports = mongoose.model('Militares', militar);