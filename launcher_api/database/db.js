const mysql = require("mysql");

module.exports = mysql.createPool({
    localAddress: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "sb4_launcher"
});