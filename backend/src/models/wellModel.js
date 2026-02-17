const mongoose = require('mongoose');

const WellSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lasData: { type: Object, required: true }, // store parsed LAS JSON
});

module.exports = mongoose.model('Well', WellSchema);
