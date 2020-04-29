const db = require('../data/dbConfig.js');

// Find content
const find = async id => {
  return await db('content')
    .where({id})
}

// Find all content for a post
const findAll = async id => {
  // id references primary key of the blog post
  return await db('content')
    .where({post_id: id});
}

// Add a content fragment to a post
const addContent = async content => {
  return await db('content')
    .insert(content)
    .returning('id')
}

// Delete a content fragment from a post
const remove = async id => {
  return await db('content')
    .where({id})
    .del();
}

// Update a content fragment
const updateContent = (id, content) => {
  const [id] = await db('content')
    .where({id})
    .update(content)
    .returning('id');
  return find(id);
}

module.exports = {
  find,
  findAll,
  addContent,
  remove,
  updateContent
}