const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  referrer: String,
  location: String,
});

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortcode: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiry: { type: Date },
  clicks: [clickSchema],
});

const urlModel = mongoose.model('url', urlSchema);

module.exports = urlModel;
