const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: "3300",
    user: "root",
    database: "todos_db",
    password: "root",
});

connection.connect((err) => {
    if (err) {
        return console.error("Error: " + err.message);
    }else{
        console.log("The connection to the MySQL server has been successfully established\n");
    }
});

module.exports = connection;