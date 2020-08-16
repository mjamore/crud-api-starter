const express = require('express');

const posts = require('./posts');

const router = express.Router();

// GET /api
router.get('/', (req, res) => {
  res.json({
    message: 'hello from the /api endpoint'
  });
});

router.use('/posts', posts);

module.exports = router;
