const mongoose = require('mongoose');
const { Schema } = mongoose;

const registro = new Schema({
  data: {
    type: Date,
    required: true
  },
  ultimoMilitar: {
    type: String,
    required: true
  },
  viaturas: {
    type: [Object],
    required: true
  }
});

module.exports = mongoose.model('Registro', registro);