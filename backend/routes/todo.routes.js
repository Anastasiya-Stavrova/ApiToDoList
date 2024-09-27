module.exports = (app) => {
    const todos = require('../controllers/todo.controller.js');

    // Просмотр всех заданий
    app.get('/show/todos', todos.showAll);

    // Просмотр конкретного задания
    app.get('/show/todos/:id', todos.showOne);
   
    // Создать новое задание
    app.post('/create/todos', todos.create);

    // Изменить задание
    app.put('/update/todos/:id', todos.update);

    // Удалить задание
    app.delete('/delete/todos/:id', todos.delete);

    // Удалить все задания
    app.delete('/delete/todos', todos.deleteAll);

    // Загрузить новый список дел
    app.put('/upload/todos', todos.upload);
}