const db = require('../data/dbConfig.js');
const cont = require('./content-model.js');

// Find blogposts
const find = async () => {
  return await db('blogposts')
    .rightJoin('contents', 'blogposts.id', 'contents.post_id');
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
  await data.contents.forEach(content => {
    content.post_id = id;
    cont.addContent(content) > 0 ?
        console.log("Success")
      : console.log("Failure");
  })
  return filterPosts({id});
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
  filterPosts,
  createPost,
  removePost
}