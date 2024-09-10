const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Rating = require('../../models/home/Rating');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      
      cb(null, path.join(__dirname, '../../../exotica-app/public'));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  const upload = multer({ storage });


// Get all ratings
router.get('/', async (req, res) => {
    try {
        const ratings = await Rating.find();
        res.json(ratings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const filePath = req.file ? `/${req.file.filename}` : '';

    const rating = new Rating({
        heading: req.body.heading,
        social: req.body.social.map(socialItem => ({
            ...socialItem,
            imageurl: socialItem.imageurl || filePath, 
        })),
        text: req.body.text,
    });

    try {
        const newRating = await rating.save();
        res.status(201).json(newRating);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a rating with file upload
router.put('/:id', upload.single('image'), async (req, res) => {
    const filePath = req.file ? `/${req.file.filename}` : '';

    try {
        const updatedRating = await Rating.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                social: req.body.social.map(socialItem => ({
                    ...socialItem,
                    imageurl: socialItem.imageurl || filePath,
                })),
            },
            { new: true }
        );
        res.json(updatedRating);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a rating
router.delete('/:id', async (req, res) => {
    try {
        await Rating.findByIdAndDelete(req.params.id);
        res.json({ message: 'Rating removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
