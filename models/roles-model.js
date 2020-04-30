const db = require('../data/dbConfig.js');

// get roles
const getRoles = async id => {
  return await db('roles')
    .where({user_id: id})
}

// add role
const addRole = async (role) => {
  return await db('roles')
    .insert(role)
    .returning('id');
}

// remove roll
const removeRole = async id => {
  return await db('roles')
    .where({id})
    .del();
}

module.exports = {
  getRoles,
  addRole,
  removeRole
}