const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'spoticfy'
});

conn.connect((err) => {
    if (err) 
    {
      console.error(err);
    } else 
    {
      console.log(`Connected to database`);
    }
  });

module.exports = conn;
