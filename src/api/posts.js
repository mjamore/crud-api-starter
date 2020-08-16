const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI);
const posts = db.get('posts');

const schema = Joi.object({
  title: Joi.string().trim().required(),
  body: Joi.string().trim().required()
});

const router = express.Router();

// Read all - GET /api/posts
router.get('/', async (req, res, next) => {
  try {
    const items = await posts.find({});
    res.json(items);
  } catch(error) {
    next(error);
  }
});

// Read one - GET /api/posts/id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await posts.findOne({
      _id: id
    });
    if (!post) return next();
    return res.json(post);
  } catch (error) {
    next(error);
  }
});

// Create one - POST /api/posts
router.post('/', async (req, res, next) => {
  try {
    const validatedPost = await schema.validateAsync(req.body);
    const inserted = await posts.insert(validatedPost);
    res.json(inserted);
  } catch (error) {
    next(error);
  }
});

// Update one - PUT /api/posts/id
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const validatedPost = await schema.validateAsync(req.body);
    const post = await posts.findOne({
      _id: id
    });
    if (!post) return next();
    await posts.update({
      _id: id
    },{
      $set: validatedPost
    });
    res.json(validatedPost);
  } catch (error) {
    next(error);
  }
});

// Delete one - DELETE /api/posts/id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await posts.findOne({
      _id: id
    });
    if (!post) return next();
    await posts.remove({
      _id: id
    });
    res.json({
      message: 'Success'
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
