const pg = require('pg');

const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'envelopes',
    password: 'postgres',
    port: 5432
});


module.exports = pool;