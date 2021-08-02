const Viatura = require('./../models/Viatura');

const Categoria = require('./../models/Categoria');

async function getViatura(id) {
  const viatura = await Viatura.findById(id);
  const categoria = await Categoria.findById(viatura.categoria);
  viatura.categoria = categoria;
  return viatura || {};
}

module.exports = getViatura;