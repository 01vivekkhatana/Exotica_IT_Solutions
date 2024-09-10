const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    social: [{
        label: { type: String, required: true },
        imageurl: { type: String, required: true },
    }],
    text: { type: String, required: true },
});

module.exports = mongoose.model('Rating', RatingSchema);
