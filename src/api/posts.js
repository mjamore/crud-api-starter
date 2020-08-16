const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');
const AWS = require('aws-sdk');
const uuidv4 = require('uuid').v4;

// AWS configuration
AWS.config.update({region: 'us-east-1'});
const docClient = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: "posts"
};


const schema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required()
});

const router = express.Router();

// Read all - GET /api/posts
router.get('/', async (req, res, next) => {
  try {
    docClient.scan(params, onScan);
    function onScan(err, data) {
      if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        res.json(data.Items);
      }
    }
  } catch(error) {
    next(error);
  }
});

// Read one - GET /api/posts/id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const dbParams = {
      Key: {
        "_id": id
      },
      ...params
    }
    docClient.get(dbParams, (err, data) => {
      if (err) {
        console.error("Unable to get item from DynamoDB:", JSON.stringify(err, null, 2));
      } else {
        res.json(data);
      }
    });
  } catch (error) {
    next(error);
  }
});

// Create one - POST /api/posts
router.post('/', async (req, res, next) => {
  try {
    const validatedPost = await schema.validateAsync(req.body);
    const uuid = uuidv4();
    const dbParams = {
      Item: {
        "title": validatedPost.title,
        "body": validatedPost.body,
        "_id": uuid
      },
      ...params
    };
    docClient.put(dbParams, (err, data) => {
      if (err) {
        console.error("Unable to add item to DynamoDB:", JSON.stringify(err, null, 2));
      } else {
        res.json({
          message: "Success",
          _id: uuid,
          title: validatedPost.title,
          body: validatedPost.body
        });
      }
    });
  } catch (error) {
    next(error);
  }
});

// Update one - PUT /api/posts/id
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const validatedPost = await schema.validateAsync(req.body);
    const dbParams = {
      Key: {
        "_id": id
      },
      ExpressionAttributeNames: {
        "#T": "title",
        "#B": "body"
      },
      ExpressionAttributeValues: {
        ":t": validatedPost.title,
        ":b": validatedPost.body
      },
      ReturnValues: "ALL_NEW",
      UpdateExpression: "SET #T = :t, #B = :b",
      ...params
    };
    docClient.update(dbParams, (err, data) => {
      if (err) {
        console.error("Unable to update item in DynamoDB:", JSON.stringify(err, null, 2));
      } else {
        res.json(data);
      }
    });
  } catch (error) {
    next(error);
  }
});

// Delete one - DELETE /api/posts/id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const dbParams = {
      Key: {
        "_id": id
      },
      ...params
    }
    docClient.delete(dbParams, (err, data) => {
      if (err) {
        console.error("Unable to detele item from DynamoDB:", JSON.stringify(err, null, 2));
      } else {
        res.json({
          message: "Success"
        });
      }
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
