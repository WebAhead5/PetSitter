const { Pool } = require('pg');

require('dotenv').config();

const connectionString = process.env.DB_URL

if(!connectionString)
throw new Error('Env variable DB_URL must be set');

module.exports = new Pool(
    connectionString
)