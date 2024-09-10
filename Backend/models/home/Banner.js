
const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    buttonText: { type: String, required: true },
    buttonUrl: { type: String, required: true }
});

module.exports = mongoose.model('Banner', BannerSchema);







