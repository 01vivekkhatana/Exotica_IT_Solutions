
const express = require('express');
const router = express.Router();
const Service = require('../../models/home/Service');


router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new counter
router.post('/', async (req, res) => {
    const service = new Service({
        label: req.body.label,
        heading: req.body.heading,
        text: req.body.text,
    });

    try {
        const newService = await service.save();
        res.status(201).json(newService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update a counter
router.put('/:id', async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a counter
router.delete('/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: 'Service removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
