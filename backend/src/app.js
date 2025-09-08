const express = require('express')
const router = require('./routes/url.Routes')
const logger = require('./middlewares/logger')
const cors = require('cors')

const app = express()
app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/test', router);

module.exports = app