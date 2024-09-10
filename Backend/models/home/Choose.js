const mongoose = require('mongoose');

const ChooseSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    image: { type: String, required: true },
    slides: [
        {
            type: String,  
            required: true,
        },
    ],
});

module.exports = mongoose.model('Choose', ChooseSchema);
