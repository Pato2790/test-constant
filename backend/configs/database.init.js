const mysql = require('mysql');
const [
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_DB_NAME
] = require('../constants/DBConstants');

const mysqlCon = mysql.createConnection({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASS
});

mysqlCon.connect((err) => {
  // Can not connect with SQLServer
  if (err) {
    console.error(err);
    throw new Error(err);
  }

  mysqlCon.query(
    `CREATE DATABASE IF NOT EXISTS ${MYSQL_DB_NAME}`, (err, result) => {
      if (err) {
        console.error(err);
        throw new Error(err);
      } else {
        console.info(`DB ${MYSQL_DB_NAME} OK`);
      }
    });
});
