var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "rest-api",
  port: "3306"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected!");
});

module.exports = connection;
