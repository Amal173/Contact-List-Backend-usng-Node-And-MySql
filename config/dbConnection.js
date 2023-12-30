const mysql=require('mysql')
const dotenv=require('dotenv').config();




const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE_NAME,
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
  })
  
  module.exports=connection;