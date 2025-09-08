const urlModel = require('../models/url.modles')
const generateShortcode = require('../utils/generateShortcode');

async function createShortURL(req, res) {
    const { url, validity = 30, shortcode } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    let code = shortcode || generateShortcode();

    const expiry = new Date(Date.now() + validity * 60 * 1000);

    try {
        const exists = await urlModel.findOne({ shortcode: code });
        if (exists) return res.status(409).json({ error: 'Shortcode already exists' });

        const newURL = await urlModel.create({
            originalUrl: url,
            shortcode: code,
            expiry,
        });

        return res.status(201).json({
            shortLink: `http://localhost:5000/${code}`,
            expiry: newURL.expiry,
        });
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
};




async function redirect(req, res) {
    const { shortcode } = req.params;

    try {
        const found = await urlModel.findOne({ shortcode });

        if (!found) return res.status(404).json({ error: 'Shortcode not found' });
        if (found.expiry < new Date()) return res.status(410).json({ error: 'Link expired' });

        // Track analytics
        found.clicks.push({
            referrer: req.get('Referrer') || 'Direct',
            location: req.ip,
        });
        await found.save();

        return res.redirect(found.originalUrl);
    } catch {
        return res.status(500).json({ error: 'Server error' });
    }
};


async function getStats(req, res) {
    const { shortcode } = req.params;

    try {
        const url = await urlModel.findOne({ shortcode });
        if (!url) { return res.status(404).json({ error: 'Shortcode not found' }) };

        return res.json({
            originalUrl: url.originalUrl,
            createdAt: url.createdAt,
            expiry: url.expiry,
            totalClicks: url.clicks.length,
            clicks: url.clicks,
        });
    } catch {
        return res.status(500).json({ error: 'Server error' });
    }
};




module.exports = {
    createShortURL,
    redirect,
    getStats,
};