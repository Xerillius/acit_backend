const db = require('../data/dbConfig.js');
const role = require('./roles-model.js');

// Returns all users that match filter
// Filter is optional
const find = filter => {
  return db('users')
    .where(filter)
    .select('id', 'email', 'username');
}

const findById = id => {
  return db('users')
    .where({id})
    .first();
}

const findByUsername = (username) => {
  return db('users')
    .where({username})
    .first();
}

const addUser = async (user) => {
  const [id] = await db('users')
    .insert(user)
    .returning('id');
  const cUser = findById(id);
  await role.addRole(cUser);
  return cUser;
}

const updateUser = async (id, user) => {
  const [userID] = await db('users')
    .where({id})
    .update(user)
    .returning('id');
  return findById(userID);
}

const deleteUser = async (id) => {
  return await db('users')
    .where({id})
    .del();
}

module.exports = {
  find,
  findById,
  findByUsername,
  addUser,
  updateUser,
  deleteUser
}