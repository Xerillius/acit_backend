const router = require('express').Router();
const bcrypt = require('bcryptjs');
const common = require('../common/functions.js');

const Users = require('../models/user-model.js');

// Register user
router.post('/register', async (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.addUser(user)
    .then(async (saved) => {
      const token = await common.createToken(saved.id);
      res.status(201).json({token});
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not add user",
        error: err.message
      });
    });
})

// Log user in
router.post('/login', (req, res) => {
  let { username, password } = req.body;
  Users.find({username: username})
    .then(async (user) => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = await common.createToken(user.id);
        res.status(200).json({
          message: `${username} logged in`,
          token: token
        })
      } else {
        res.status(401).json({
          message: "Incorrect username and/or password"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: `Error logging in as ${username}`,
        error: err.message
      });
    });
})

module.exports = router;