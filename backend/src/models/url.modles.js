const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
  shortcode: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiry: { type: Date },
  // clicks: [clickSchema],
})

const urlModel = mongoose.model('url', urlSchema)

module.exports = urlModel