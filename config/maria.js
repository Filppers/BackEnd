var maria = require("mysql2");
require("dotenv").config();

var db_info = {
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  charset: "utf8mb4",
  multipleStatements: true,
};

const conn = maria.createConnection(db_info);

module.exports = conn;
