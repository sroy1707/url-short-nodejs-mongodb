const mongoose = require("mongoose");
// const shortId = require("shortid");



const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_~`.:;/=!@#$%&*()+';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.trim();

    
}

const shortUrlSchema = mongoose.Schema({
  full: {
    type: String,
    required: true,
    
  },
  short: {
    type: String,
    required: true,
    default:generateString(4),
    unique: true
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("shortUrl", shortUrlSchema);
