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
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено\n");
    }
});

module.exports = connection;