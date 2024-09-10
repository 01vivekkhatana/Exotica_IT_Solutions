
const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    gallery: [{
        image: { type: String, required: true }
      }]
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;



