const mysql = require('mysql2');

// Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Limepop100',
    database: 'employees_db'
module.exports = connection;