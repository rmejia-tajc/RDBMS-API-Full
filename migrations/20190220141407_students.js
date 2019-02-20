// what changes are to be applied to the database
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(tbl) {
      // primary key called id, integer, auto-increment
      tbl
        .increments();
  
      tbl
        .string('name')
        .notNullable();
  
      tbl
        .integer('cohort_id')
        .unsigned()
        .references('id')
        .inTable('cohorts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
  };
  
  // how can I undo the changes
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
  };
  