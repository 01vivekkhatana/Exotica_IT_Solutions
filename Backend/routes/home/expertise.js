const express = require('express');
const router = express.Router();
const Expertise = require('../../models/home/Expertise');

// GET all expertise
router.get('/', async (req, res) => {
    try {
        const expertises = await Expertise.find();
        res.json(expertises);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new expertise
router.post('/', async (req, res) => {
    const expertise = new Expertise({
        heading: req.body.heading,
        text: req.body.text,
    });

    try {
        const newExpertise = await expertise.save();
        res.status(201).json(newExpertise);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update an expertise
router.put('/:id', async (req, res) => {
    try {
        const updatedExpertise = await Expertise.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedExpertise);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an expertise
router.delete('/:id', async (req, res) => {
    try {
        await Expertise.findByIdAndDelete(req.params.id);
        res.json({ message: 'Expertise removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
