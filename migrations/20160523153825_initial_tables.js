
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users', function(table){
  table.increments();
  table.string('first_name');
  table.string('last_name');
  table.string('email');
  })
  .createTable('ancestry', function(table){
  table.increments();
  table.string('sub_saharan_african');
  table.string('european');
  table.string('oceanian');
  table.string('east_asian_native_american');
  table.string('south_asian');
  table.string('middle_eastern_north_african');
  table.integer('user_id');
  })
  .createTable('snps', function(table){
  table.increments();
  table.string('rs7089424');
  table.string('rs53576');
  table.string('rs1800497');
  table.string('rs17077540');
  table.string('rs1121980');
  table.string('rs2241880');
  table.string('rs13266634');
  table.string('rs2180439');
  table.string('rs307377');
  table.string('rs807701');
  table.string('rs664143');
  table.string('rs2802292');
  table.string('rs1800955');
  table.string('rs4307059');
  table.string('rs10830963');
  table.integer('user_id');
  })
  .createTable('snp_info', function(table){
  table.increments();
  table.string('name');
  table.string('description');
  table.string('link');
  table.string('advice_one');
  table.string('advice_two');
  })
  .createTable('intentions', function(table){
  table.increments();
  table.string('description');
  table.string('create');
  table.string('createFormatted');
  table.string('start');
  table.string('startFormatted');
  table.string('end');
  table.string('endFormatted');
  table.integer('user_id');
  })
};
exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('users')
  .dropTable('ancestry')
  .dropTable('snps')
  .dropTable('snp_info')
  .dropTable('intentions')
};
