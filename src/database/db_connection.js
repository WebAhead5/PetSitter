const { Pool } = require('pg');
require('dotenv').config();


let connectionString = process.env.DB_URL;
if(process.env.NODE_ENV === "test")
    connectionString = process.env.DATABASE_TEST_URL;



if(!connectionString)
throw new Error('Env variable DB_URL must be set');



module.exports = new Pool(connectionString)