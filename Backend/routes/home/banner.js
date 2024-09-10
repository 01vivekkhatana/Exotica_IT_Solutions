
const express = require('express');
const router = express.Router();
const Banner = require('../../models/home/Banner');


router.get('/', async (req, res) => {
    try {
        const banners = await Banner.find();
        res.json(banners);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new banner
router.post('/', async (req, res) => {
    const banner = new Banner({
        heading: req.body.heading,
        buttonText: req.body.buttonText,
        buttonUrl: req.body.buttonUrl
    });

    try {
        const newBanner = await banner.save();
        res.status(201).json(newBanner);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update a banner
router.put('/:id', async (req, res) => {
    try {
        const updatedBanner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBanner);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a banner
router.delete('/:id', async (req, res) => {
    try {
        await Banner.findByIdAndDelete(req.params.id);
        res.json({ message: 'Banner removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
