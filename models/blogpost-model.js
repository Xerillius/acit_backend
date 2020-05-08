const db = require('../data/dbConfig.js');
const content = require('./content-model.js');

// Find blogposts
const find = async () => {
  const blogposts = await db('blogposts')

  return Promise.all(blogposts.map(async blogpost => {
    blogpost.contents = await content.findAll(blogpost.id);
    return blogpost;
  }))
}

const findById = id => {
  return db('blogposts')
    .where({id})
    .first();
}

// Find blogpost by filter
const filterPosts = async filter => {
  return await db('blogposts')
    .where(filter)
    .rightJoin('contents', 'blogposts.id', 'contents.post_id');
}

// Add blogpost
const createPost = async data => {
  const [id] = await db('blogposts')
    .insert(data.owner_id)
    .returning('id');
  return findById(id);
}

// Delete blogpost
const removePost = async id => {
  const arr = await cont.findAll(id);
  arr.forEach(content => {
    content.remove(content.id)
  })
  return await db('blogposts')
    .where({id})
    .del();
}

module.exports = {
  find,
  findById,
  filterPosts,
  createPost,
  removePost
}