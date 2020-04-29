
exports.up = function(knex) {
  return knex.schema.createTable('contents', table => {
    table
      .increments();
    table
      .integer('post_id');
    table
      .string('content_text');
    table
      .string('content_img');
    table
      .integer('content_format')
      .defaultTo(0);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('contents');
};
