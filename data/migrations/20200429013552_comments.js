
exports.up = function(knex) {
  return knex.schema.createTable('comments', table => {
    table
      .increments();
    table
      .integer('commentor');
    table
      .integer('commented_post');
    table
      .string('comment')
      .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('comments');
};
