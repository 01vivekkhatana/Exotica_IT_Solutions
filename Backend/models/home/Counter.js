const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
    label: { type: String, required: true },
    digit: { type: Number, required: true }
});

module.exports = mongoose.model('Counter', CounterSchema);
