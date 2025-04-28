const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const tweetRoutes = require('./tweetRoutes');
const profileRoutes = require('./profileRoutes');

router.use(authRoutes);
router.use(tweetRoutes);

module.exports = router;