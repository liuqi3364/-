const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hjc8246',
  database: 'yisuhotel'
});

connection.connect((err) => {
  if (err) {
    console.error('数据库链接失败:', err);
    return;
  }
  console.log('数据库链接成功');
});

module.exports = connection;