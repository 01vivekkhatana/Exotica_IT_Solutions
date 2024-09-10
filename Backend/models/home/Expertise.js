const mongoose = require('mongoose');

const ExpertiseSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    text: { type: String, required: true },
});

module.exports = mongoose.model('Expertise', ExpertiseSchema);
