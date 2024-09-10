const express = require('express');
const multer = require('multer');
const path = require('path');
const Gallery = require('../models/home/Gallery');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../exotica-app/public'));
       
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

router.post('/', upload.fields([{ name: 'images' }]), async (req, res) => {
    try {
        let { gallery } = req.body;

      
        if (typeof gallery === 'string') {
            try {
                gallery = JSON.parse(gallery);
            } catch (error) {
                console.error('Failed to parse gallery:', error);
                return res.status(400).json({ error: 'Invalid format for gallery' });
            }
        }

        const images = req.files['images'] ? req.files['images'].map(file => `/${file.filename}`) : [];
      
        if (!Array.isArray(gallery)) {
            return res.status(400).json({ error: 'gallery must be an array' });
        }

        const updatedGallery = gallery.map((item, index) => ({
            image: images[index] || item.image, 
        }));

        let galleryDocument = await Gallery.findOne();
        if (galleryDocument) {
            galleryDocument.gallery = updatedGallery;
            await galleryDocument.save();
        } else {
            galleryDocument = new Gallery({ gallery: updatedGallery });
            await galleryDocument.save();
        }

        res.status(200).json(galleryDocument);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const galleryDocument = await Gallery.findOne();
        if (!galleryDocument) {
            return res.status(200).json({ gallery: [] });
        }
        res.status(200).json({ gallery: galleryDocument.gallery });
    } catch (error) {
        console.error('Error retrieving gallery:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
  

module.exports = router;
