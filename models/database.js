const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT,
    dateStrings: true

});

connection.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected to database')
    }
});

module.exports = connection;