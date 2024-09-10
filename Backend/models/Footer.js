// models/Footer.js
const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
  mainLinks: [
    {
      text: { type: String, required: true },
      url: { type: String, required: false }
    }
  ],
  services: [
    {
      text: { type: String, required: true },
      url: { type: String, required: false }
    }
  ],
  email: { type: String, required: true },
  phone: [
    {
      label: { type: String, required: true },
      number: { type: String, required: true }
    }
  ],
  address: { type: String, required: true },
  social: [
    {
      iconPath: { type: String, required: true },
      url: { type: String, required: true }
    }
  ],
  legal: [
    {
      text: { type: String, required: true },
      url: { type: String, required: false }
    }
  ]
});

const Footer = mongoose.model('Footer', footerSchema);

module.exports = Footer;
