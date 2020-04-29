
exports.up = function(knex) {
  return knex.schema.createTable('post_contents', table => {
    table
      .increments();
    table
      .integer('blogpost_id');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('post_contents');
};
