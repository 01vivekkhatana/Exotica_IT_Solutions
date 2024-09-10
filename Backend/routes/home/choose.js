const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Choose = require('../../models/home/Choose');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      
      cb(null, path.join(__dirname, '../../../exotica-app/public'));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  const upload = multer({ storage });

  router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { heading, slides } = req.body;

        const newChoose = new Choose({
            heading,
            image: req.file.filename,
            slides: JSON.parse(slides),  
        });

        await newChoose.save();
        res.status(201).json(newChoose);
    } catch (err) {
        res.status(500).json({ message: 'Error creating Choose section', error: err });
    }
});

router.get('/', async (req, res) => {
    try {
        const chooseSections = await Choose.find();
        res.status(200).json(chooseSections);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching Choose sections', error: err });
    }
});

// Update a "Choose" entry
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { heading, slides } = req.body;
        const updatedChoose = await Choose.findById(req.params.id);

        if (req.file) {
            updatedChoose.image = req.file.filename;
        }

        updatedChoose.heading = heading;
        updatedChoose.slides = JSON.parse(slides);

        await updatedChoose.save();
        res.status(200).json(updatedChoose);
    } catch (err) {
        res.status(500).json({ message: 'Error updating Choose section', error: err });
    }
});

// Delete a "Choose" entry
router.delete('/:id', async (req, res) => {
    try {
        await Choose.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Choose section deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting Choose section', error: err });
    }
});

module.exports = router;
