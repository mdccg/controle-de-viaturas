const mongoose = require('mongoose');
const { Schema } = mongoose;

const agenda = new Schema({
  dias: { type: [Number], required: true, unique: true }
});

module.exports = mongoose.model('Agenda', agenda);