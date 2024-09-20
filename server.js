const express = require('express');
const bodyParser = require('body-parser');
const port = 4000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({"Message": "Welcome to Todo Api App"});
});

require('./routes/todo.routes.js')(app);

app.listen(port);