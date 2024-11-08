var mysql = require("mysql2");
var tunnel = require("tunnel-ssh");
require("dotenv").config();

var ssh_config = {
  username: process.env.SSH_USER,
  password: process.env.SSH_PASSWORD,
  host: process.env.SSH_HOST,
  port: process.env.SSH_PORT,
  dstHost: process.env.SSH_DATABASE_HOST,
  dstPort: process.env.SSH_DATABASE_PORT,
  localHost: "127.0.0.1", // 로컬 호스트를 설정합니다.
  localPort: 3306, // 로컬 포트를 설정합니다.
};

tunnel(ssh_config, (error, server) => {
  if (error) {
    throw error;
  } else if (server !== null) {
    var conn = mysql.createConnection({
      host: process.env.DATABASE_HOST,
      port: 3306,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });
  }
});

module.exports = conn;
