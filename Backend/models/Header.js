// models/Header.js
const mongoose = require('mongoose');

const headerSchema = new mongoose.Schema({
  logo: { type: String, required: false },
  buttons: [{
    text: { type: String, required: true },
    url: { type: String, required: false }
  }],
    contact: [{
    flag_logo: { type: String, required: true },
    phone: { type: String, required: false }
  }]
});

const Header = mongoose.model('Header', headerSchema);
module.exports = Header;