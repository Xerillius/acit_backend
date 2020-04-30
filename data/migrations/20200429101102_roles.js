
exports.up = function(knex) {
  return knex.schema.createTable('roles', table => {
    table
      .increments();
    table
      .integer('user_id');
    table
      .string('role');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('roles');
};
