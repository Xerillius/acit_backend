const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Users = require('../models/user-model.js');

// Find all users with option search parameters
router.get('/', (req, res) => {
  Users.find(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(400).json({
        message: "There was an error",
        error: err.message
      });
    });
})

// Find a user by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Users.findById(id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(404).json({
        message: `User with ID: ${id} could not be found`,
        error: err.message
      });
    });
})

// Update user
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const user = req.body;
  Users.updateUser(id, user)
    .then(updated => {
      res.status(202).json(updated);
    })
    .catch(err => {
      res.status(400).json({
        error: err.message
      });
    });
})

// Delete user
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Users.deleteUser(id)
    .then(deleted => {
      res.status(202).json({
        message: "Sucessfully deleted user",
        deleted
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error processing your request",
        error: err.message
      });
    });
})