const mongoose = require('mongoose');
const { Schema } = mongoose;

const checkpoint = new Schema({
  ultimoMilitar: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Checkpoint', checkpoint);