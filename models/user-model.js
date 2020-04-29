const db = require('../data/dbConfig.js');

// Returns all users that match filter
// Filter is optional
const find = filter => {
  return db('users')
    .where(filter);
}

const findById = id => {
  return db('users')
    .where({id})
    .first();
}

const addUser = async (user) => {
  const [id] = await db('users')
    .insert(user)
    .returning('id');
  return findById(id);
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
  addUser,
  updateUser,
  deleteUser
}