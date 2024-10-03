const connection = require("../database/database");

exports.showAll = (req, res) => {
  connection.query("SELECT * FROM todos", (error, results) => {
    if (error) throw error;

    console.log(JSON.stringify(results));

    if (results == "") {
      return res.status(200).send({
        Message: "There are no todos",
      });
    } else {
      return res.status(200).json(results);
    }
  });
};

exports.showOne = (req, res) => {
  connection.query(
    `SELECT * FROM todos WHERE Id = ${req.params.id}`,
    (error, results) => {
      if (error) throw error;

      console.log(req.params);

      if (results == "") {
        return res.status(200).send({
          Message: "There is no task with this Id",
        });
      } else {
        return res.status(200).json(results);
      }
    }
  );
};

exports.create = (req, res) => {
  if (!req.body.Description) {
    return res.status(400).send({
      Message: "Todo description can not be empty",
    });
  }

  const params = req.body;

  connection.query(
    `INSERT INTO todos(Description) VALUES ("${params.Description}")`,
    (error, results) => {
      if (error) throw error;

      return res.status(201).send({
        Message: "New todo has been created successfully",
      });
    }
  );

  console.log(params);
};

exports.update = (req, res) => {
  connection.query(
    `SELECT COUNT(*) AS Count FROM todos WHERE Id = ${req.params.id}`,
    (error, results) => {
      if (error) throw error;

      const params = req.body;

      if (results[0].Count != 0) {
        if (!req.body.Description && !req.body.IsCompleted) {
          return res.status(400).send({
            Message: "Todo description can not be empty",
          });
        }

        let myRequest;

        if (params.IsCompleted) {
          if (params.IsCompleted == 0 || params.IsCompleted == 1) {
            myRequest = `IsCompleted = "${params.IsCompleted}"`;
          } else {
            return res.status(400).send({
              Message: "Todo isCompleted can be only 0 or 1",
            });
          }
        } else {
          myRequest = `Description = "${params.Description}"`;
        }

        connection.query(
          `UPDATE todos SET ${myRequest} WHERE Id = ${req.params.id}`,
          (error, results) => {
            if (error) throw error;

            return res.status(201).send({
              Message: "The todo was successfully updated",
            });
          }
        );
      } else {
        return res.status(200).send({
          Message: "There is no task with this Id",
        });
      }

      console.log(params);
    }
  );
};

exports.delete = (req, res) => {
  connection.query(
    `SELECT COUNT(*) AS Count FROM todos WHERE Id = ${req.params.id}`,
    (error, results) => {
      if (error) throw error;

      if (results[0].Count != 0) {
        connection.query(
          `DELETE FROM todos WHERE Id = ${req.params.id}`,
          (error, results) => {
            if (error) throw error;

            return res.status(200).send({
              Message: "Todo has been deleted",
            });
          }
        );
      } else {
        return res.status(200).send({
          Message: "There is no task with this Id",
        });
      }

      console.log(req.params);
    }
  );
};

exports.deleteAll = (req, res) => {
  connection.query(`DELETE FROM todos`, (error, results) => {
    if (error) throw error;

    return res.status(200).send({
      Message: "All todos have been deleted",
    });
  });
};

exports.upload = (req, res) => {
  const params = req.body;

  if (!params.values) {
    return res.status(400).send({
      Message: "The data cannot be empty",
    });
  } else {
    connection.query("DELETE FROM todos", (error, results) => {
      if (error) throw error;

      params.forEach((element) => {
        connection.query(
          "INSERT INTO todos SET ? ",
          element,
          (error, results) => {
            if (error) throw error;
          }
        );
      });

      return res.status(201).send({
        Message: "A new todos has been uploaded",
      });
    });
  }

  console.log(params);
};
