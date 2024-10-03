const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const port = 4000;

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ Message: "Welcome to the server!" });
});

require("./routes/todo.routes.js")(app);

app.listen(port, () => {
  console.log(`The server is running on the port ${port}`);
});
