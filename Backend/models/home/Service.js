
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    label: { type: String, required: true },
    heading: { type: String, required: true },
    text: { type: String, required: true }
});

module.exports = mongoose.model('Service', ServiceSchema);