module.exports = (app) => {
    const todos = require('../controllers/todo.controller.js');

    // Просмотр всех заданий
    app.get('/todos', todos.findAll);

    // Просмотр конкретного задания
    app.get('/todos/:id', todos.findOne);
   
    // Создать новое задание
    app.post('/todos', todos.create);

    // Изменить задание
    app.put('/todos/:id', todos.update);

    // Удалить задание
    app.delete('/todos/:id', todos.delete);

    // Загрузить новый список дел
    app.put('/todos', todos.upload);
}