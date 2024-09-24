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

        if(results == ""){
            return res.status(404).send({
                "Message":"There are no todos"
            });
        }
        else{
            res.end(JSON.stringify(results));

            console.log(JSON.stringify(results));
        }
    });   
};

exports.findOne = (req, res) => {
    connection.query(`SELECT * FROM todos WHERE Id=${req.params.id}`, 
        (error, results, fields) => {
            if (error) throw error;

            if(results == ""){
                return res.status(404).send({
                    "Message":"There is no task with this Id"
                });
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

            return res.status(201).send({
                "Message": 'New todo has been created successfully'
            });
    });

    console.log(params);
};

exports.update = (req, res) => {
    connection.query(`SELECT COUNT(*) AS Count FROM todos WHERE Id=${req.params.id}`, 
        (error, results, fields) => {
            if (error) throw error;

            const params = req.body;

            if(results[0].Count != 0){
                if (!req.body.Description && !req.body.IsCompleted) {
                    return res.status(400).send({
                        "Message": "Todo description can not be empty"
                    });
                }

                let myRequest;
            
                if(params.IsCompleted){
                    if(params.IsCompleted == 0 || params.IsCompleted == 1){
                        myRequest = `IsCompleted="${params.IsCompleted}"`;
                    }
                    else{
                        return res.status(400).send({
                            "Message": "Todo isCompleted can be only 0 or 1"
                        });
                    }
                }
                else{
                    myRequest = `Description="${params.Description}"`;
                }  

                connection.query(`UPDATE todos SET ${myRequest} WHERE Id=${req.params.id}`,
                    (error, results, fields) => {
                        if (error) throw error;
        
                        return res.status(201).send({
                            "Message": 'The todo was successfully updated'
                        });
                });  
            }
            else{
                return res.status(404).send({
                    "Message":"There is no task with this Id"
                });
            }  

            console.log(params);
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
            
                        return res.status(200).send({
                            "Message": 'Todo has been deleted'
                        });   
                });
            }
            else{
                return res.status(404).send({
                    "Message":"There is no task with this Id"
                });
            } 

            console.log(req.params);     
    });
};

exports.upload = (req, res) => {
    const params = req.body;

    if(!params.values){
        return res.status(400).send({
            "Message": "The data cannot be empty"
        }); 
    }
    else{
        connection.query('DELETE FROM todos', (error, results, fields) => {
            if (error) throw error;
    
            params.forEach(element => {
                connection.query("INSERT INTO todos SET ? ", element,
                    (error, results, fields) => {
                        if (error) throw error;
                });
                
            });
    
            return res.status(201).send({
                "Message": "A new todos has been uploaded"
            });   
        });
    }

    console.log(params);
};
