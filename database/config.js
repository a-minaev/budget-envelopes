const pg = require('node-postgres');

const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'envelopes',
    password: 'postgres',
    port: 5432
});