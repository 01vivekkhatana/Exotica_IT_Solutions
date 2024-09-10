const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    subheading: {
        type: String,
        required: true,
    },
    buttonText: {
        type: String,
        required: true,
    },
    image: {
        type: String, 
    },
    images: [
        {
            type: String,
        }
    ]
}, { timestamps: true });

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;

