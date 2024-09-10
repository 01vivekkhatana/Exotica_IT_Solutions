
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
 
    text: { type: String, required: true }
});

module.exports = mongoose.model('Service', ServiceSchema);