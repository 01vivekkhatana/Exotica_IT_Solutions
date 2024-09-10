const express = require('express');
const multer = require('multer');
const Hero = require('../models/home/heroModel');
const Counter = require('../models/home/heroModel');
const router = express.Router();
const path = require('path');


const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../exotica-app/public'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/hero', upload.array('images', 10), async (req, res) => {
    try {
        const { heading, subheading, buttonText, image } = req.body;
        const images = req.files.map(file => `/${file.filename}`);
        const removedImages = req.body.removedImages || [];

        let heroData = await Hero.findOne();

        if (heroData) {
            
            heroData.heading = heading;
            heroData.subheading = subheading;
            heroData.buttonText = buttonText;
            heroData.image = image || heroData.image;

            removedImages.forEach((imageUrl) => {
                heroData.images = heroData.images.filter(img => img !== imageUrl);
            });

          
            heroData.images = heroData.images.concat(images);
        } else {
          
            heroData = new Hero({
                heading,
                subheading,
                buttonText,
                image,
                images
            });
        }

        await heroData.save();
        res.status(200).json(heroData);
    } catch (error) {
        res.status(500).json({ error: 'Error processing hero data' });
    }
});


router.get('/hero', async (req, res) => {
    try {
        const heroData = await Hero.findOne();

        if (!heroData) {
            return res.status(404).json({ error: 'Hero data not found' });
        }

        res.status(200).json(heroData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching hero data' });
    }
});


router.get('/counter', async (req, res) => {
    try {
      const counters = await Counter.find();
      res.json(counters);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post('/counter/update', async (req, res) => {
    try {
      const { id, title, count, description } = req.body;
      const updatedCounter = await Counter.findByIdAndUpdate(
        id,
        { title, count, description },
        { new: true }
      );
      res.json(updatedCounter);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post('/counter/delete', async (req, res) => {
    try {
      const { id } = req.body;
      await Counter.findByIdAndDelete(id);
      res.json({ message: 'Counter deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


module.exports = router;
