const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', 
    database: 'online_quiz_db'
});

db.connect((err) => {
    if (err) {
        console.log('MySQL Connection Failed!');
        console.log(err.message);
    } else {
        console.log('MySQL Database Connected Successfully!');
    }
});

module.exports = db;