
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students')
        .insert([
          { name: 'Alex', cohort_id: 2},
          { name: 'David', cohort_id: 2},
          { name: 'Brandon', cohort_id: 2}
        ]);
    });
};
