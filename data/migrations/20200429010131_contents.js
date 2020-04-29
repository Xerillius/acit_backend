
exports.up = function(knex) {
  return knex.schema.createTable('contents', table => {
    table
      .increments();
    table
      .integer('post_id');
    table
      .string('post_text');
    table
      .string('post_img');
    table
      .integer('post_format')
      .defaultTo(0);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('contents');
};
