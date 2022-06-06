const mongoose = require('mongoose');
const { Schema } = mongoose;

const citySchema = new Schema({
    name: { type: String, index: true },
    population: Number,
});

module.exports = mongoose.model('City', citySchema);
