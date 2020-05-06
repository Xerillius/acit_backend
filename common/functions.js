const jwt = require('jsonwebtoken');
const secret = require('../config/secrets.js');
const Users = require('../models/user-model.js');
const Roles = require('../models/roles-model.js');

const minutes = value => {
  return value * 60 * 1000;
}

const createToken = async (id) => {
  return Users.findById(id)
    .then(user => {
      const role = Roles.getRoles(user.id);
      console.log("Role", role);
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: role
      }

      const options = {
        expiresIn: minutes(60)
      }

      const token = jwt.sign(payload, secret.jwtSecret, options);

      return token;
    })
    .catch(err => {
      console.log(err.message);
    })
}

module.exports = {
  minutes,
  createToken
}