
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table
      .increments();
    table
      .string('email')
      .notNullable()
      .unique();
    table
      .string('username', 32)
      .notNullable()
      .unique();
    table
      .string('password', 32)
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
