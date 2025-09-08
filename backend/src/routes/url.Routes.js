const express = require('express');
const router = express.Router();
const { createShortURL, redirect, getStats } = require('../controller/urlController');

router.post('/shorturls', createShortURL);
router.get('/shorturls/:shortcode', getStats);   
router.get('/:shortcode', redirect);             

module.exports = router;
