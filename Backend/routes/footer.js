
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Footer = require('../models/Footer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../exotica-app/public'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });


router.get('/', async (req, res) => {
  try {
    const footerData = await Footer.findOne();
    res.status(200).json(footerData);
  } catch (error) {
    console.error('Error fetching footer data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/', upload.fields([{ name: 'socialIcons', maxCount: 10 }]), async (req, res) => {
  try {
    const { mainLinks, services, email, phone, address, legal } = req.body;

    let social = [];
    if (req.files['socialIcons']) {
      social = req.files['socialIcons'].map((file, index) => ({
        iconPath: `/${file.filename}`,
        url: req.body.socialUrls[index]
      }));
    }

    let footer = await Footer.findOne();
    if (footer) {
      footer.mainLinks = JSON.parse(mainLinks);
      footer.services = JSON.parse(services);
      footer.email = email;
      footer.phone = JSON.parse(phone);
      footer.address = address;
      footer.social = social;
      footer.legal = JSON.parse(legal);
      await footer.save();
    } else {
      footer = new Footer({
        mainLinks: JSON.parse(mainLinks),
        services: JSON.parse(services),
        email,
        phone: JSON.parse(phone),
        address,
        social,
        legal: JSON.parse(legal)
      });
      await footer.save();
    }

    res.status(200).json(footer);
  } catch (error) {
    console.error('Error saving footer data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
