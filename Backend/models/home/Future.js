const mongoose = require('mongoose');

const FutureSchema = new mongoose.Schema({

    text: { type: String, required: true },
    btntext: { type: String, required: true },
    btnurl :  { type: String, required: true },
    image : { type: String, required: true },
    mainimage :{ type: String, required: true },
});

module.exports = mongoose.model('Future', FutureSchema);