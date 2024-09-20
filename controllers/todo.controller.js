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

exports.findAll = (req, res) => {
    connection.query('SELECT * FROM todos', (error, results, fields) => {
        if (error) throw error;

        res.end(JSON.stringify(results));

        console.log(JSON.stringify(results));
    });   
};

exports.findOne = (req, res) => {
    connection.query(`SELECT * FROM todos WHERE Id=${req.params.id}`, 
        (error, results, fields) => {
            if (error) throw error;

            if(results == ""){
                res.json({"Message":"There is no task with this Id"});
            }
            else{
                res.end(JSON.stringify(results));
            } 

            console.log(req.params);
    });
};

exports.create = (req, res) => {
    if (!req.body.Description) {
        return res.status(400).send({
            "Message":"Todo description can not be empty"
        });
    }

    const params = req.body;
    
    connection.query(`INSERT INTO todos(Description) VALUES ("${params.Description}")`, 
        (error, results, fields) => {
            if (error) throw error;

            res.json({"Message": 'New todo has been created successfully'});
    });

    console.log(params);
};

exports.update = (req, res) => {
    if (!req.body.description) {
        return res.status(400).send({
            message: "Todo description can not be empty"
        });
    }

    console.log(req.params.id);
    console.log(req.body.description);
    connection.query('UPDATE `todos` SET `name`=?,`description`=? where `id`=?',
        [req.body.name, req.body.description, req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

exports.delete = (req, res) => {
    connection.query(`SELECT COUNT(*) AS Count FROM todos WHERE Id=${req.params.id}`, 
        (error, results, fields) => {
            if (error) throw error;

            if(results[0].Count != 0){
                connection.query(`DELETE FROM todos WHERE Id=${req.params.id}`, 
                    (error, results, fields) => {
                        if (error) throw error;
            
                        res.json({"Message": 'Todo has been deleted'});   
                });
            }
            else{
                res.json({"Message": 'There is no task with this Id'});
            } 

            console.log(req.params);     
    });
};
