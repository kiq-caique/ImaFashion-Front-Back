const ima_database = require('knex')({
  client: 'pg',
  connection: {
    host : 'imafashion.co8ohfzegu0e.us-east-1.rds.amazonaws.com',
    port : 5432,
    user : 'imafashionadmin',
    password : 'admin123',
    database : 'db_imafashion'
  }
});


module.exports = ima_database