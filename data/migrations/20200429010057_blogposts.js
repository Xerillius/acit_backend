
exports.up = function(knex) {
  return knex.schema.createTable('blogposts', table => {
    table
      .increments();
    table
      .integer('owner');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('blogposts');
};
