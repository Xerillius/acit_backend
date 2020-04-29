const express = require('express');
const router = express.Router();

const Blogposts = require('../models/blogpost-model.js');

// get all posts
router.get('/', (req, res) => {
  Blogposts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving blogposts",
        error: error.message
      });
    });
})

// add a post
router.post('/', (req, res) => {
  const content = req.body;
  Blogposts.createPost(content)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error creating post",
        error: err.message
      });
    });
})

// update a post


// delete a post
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Blogposts.removePost(id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => {
      res.status(500).json({
        message: "There was a problem deleting the post",
        error: err.message
      });
    });
})