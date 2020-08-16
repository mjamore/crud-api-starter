const express = require('express');

const router = express.Router();

// Read all
router.get('/', (req, res) => {
  res.json({
    message: 'hello from read all'
  });
});

// Read one
router.get('/:id', (req, res) => {
  res.json({
    message: 'hello from read one'
  });
});

// Create one
router.post('/', (req, res) => {
  res.json({
    message: 'hello from create one'
  });
});

// Update one
router.put('/:id', (req, res) => {
  res.json({
    message: 'hello from update one'
  });
});

// Delete one
router.post('/:id', (req, res) => {
  res.json({
    message: 'hello from delete one'
  });
});


module.exports = router;
