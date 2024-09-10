
const mongoose = require('mongoose');
const CardsSchema =  new mongoose.Schema({
    image : {type: String , required:true },
    linktext : {type: String , required:true },
    linkurl : {type: String , required:true },
    arrowimage: {type: String , required:true },
})


module.exports = mongoose.model ('Cards', CardsSchema);