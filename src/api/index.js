const express = require('express');

const posts = require('./posts');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'hello from /api endpoint'
  });
});

router.use('/posts', posts);

module.exports = router;
