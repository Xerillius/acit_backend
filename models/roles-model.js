const db = require('../data/dbConfig.js');

// get roles
const getRoles = id => {
  return db('roles')
    .where({user_id: id})
    .select('role')
    .first();
}

// add role
const addRole = async (user) => {
  const assignRole = user.email == "acanineintime@gmail.com" ?
      "Admin"
    : "User";
  const role = {
    user_id: user.id,
    role: assignRole
  }
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