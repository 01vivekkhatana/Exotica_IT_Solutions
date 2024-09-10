const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Cards = require('../../models/home/Cards');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      
      cb(null, path.join(__dirname, '../../../exotica-app/public'));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  const upload = multer({ storage });


  router.post('/', upload.fields([{ name: 'image' }, { name: 'arrowimage' }]), async (req, res) => {
    
    try {
        const {  linktext, linkurl } = req.body;
        const card = new Cards({
     
            linktext,
            linkurl,
            image:'/' + req.files.image[0].filename,  // Get image filename
            arrowimage: '/' + req.files.arrowimage[0].filename,  // Get arrow image filename
        });
        await card.save();
        res.status(201).json(card);
    } catch (err) {
        res.status(500).json({ message: 'Error creating card', error: err });
    }
});

// Get all cards
router.get('/', async (req, res) => {
    try {
        const cards = await Cards.find();
        res.status(200).json(cards);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching cards', error: err });
    }
});

// Update an existing card
router.put('/:id', upload.fields([{ name: 'image' }, { name: 'arrowimage' }]), async (req, res) => {
    try {
        const {  linktext, linkurl } = req.body;
        const updateData = {
         
            linktext,
            linkurl,
        };
        if (req.files.image) updateData.image = req.files.image[0].filename;
        if (req.files.arrowimage) updateData.arrowimage = req.files.arrowimage[0].filename;

        const updatedCard = await Cards.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json(updatedCard);
    } catch (err) {
        res.status(500).json({ message: 'Error updating card', error: err });
    }
});

// Delete a card
router.delete('/:id', async (req, res) => {
    try {
        await Cards.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting card', error: err });
    }
});

module.exports = router;
