const Todo = require("../models/Todo");

exports.getTodoById = (req, res, next) => {
  todoId = req.params.todoId;
  Todo.findById(todoId).exec((err, todo) => {
    if (err || !todo) {
      return res.status(400).json({
        error: "Something went wrong in finding todo",
      });
    }
    req.todo = todo;
    return next();
  });
};

exports.getTodo = (req, res) => {
  todoId = req.params.todoId;
  Todo.findById(todoId).exec((err, todo) => {
    if (err || !todo) {
      return res.status(400).json({
        error: "Something went wrong in finding todo",
      });
    }
    req.todo = todo;
    return res.json(req.todo);
  });
};

exports.getAllTodos = (req, res) => {
  // simply use .find() method and it will return all the todos
  Todo.find()
    .sort("-createdAt")
    .exec((err, todos) => {
      // error checking
      if (err || !todos) {
        return res.status(400).json({
          error: "Something went wrong in finding all todos",
        });
      }
      // return all the todos in json format
      res.json(todos);
    });
};

exports.createTodo = (req, res) => {
  // we will get json data from the frontend i.e. req.body
  const todo = new Todo(req.body);

  // create a todo instance by passing 'task' field from 'req.body'
  todo.save((err, task) => {
    if (err || !task) {
      return res.status(400).json({
        error: "something went wrong",
      });
    }
    // todo is created
    // send the created todo as json response
    res.json({ task });
  });
};

exports.updateTodo = (req, res) => {

  todoId = req.params.todoId;
  Todo.findById(todoId).exec((err, todo) => {
    if (err || !todo) {
      return res.status(400).json({
        error: "Something went wrong in finding todo",
      });
    }
    todo.task = req.body.task;
    todo.isDone = req.body.isDone;

    // simply save that updated todo
    todo.save((err, t) => {
      if (err || !t) {
        return res.status(400).json({
          error: "something went wrong while updating",
        });
      }
      // send the updated todo as a json response
      res.json(t);
    });
  });
};

exports.deleteTodo = (req, res) => {
  todoId = req.params.todoId;
  Todo.findById(todoId).exec((err, todo) => {
    if (err || !todo) {
      return res.status(400).json({
        error: "Something went wrong in finding todo",
      });
    }
    todo.remove((err, task) => {
      if (err || !task) {
        return res.status(400).json({
          error: "something went wrong while deleting the todo",
        });
      }
      // send deleted todo and success message as a json response
      res.json({
        task_deleted: task,
        message: "Todo deleted successfully!",
      });
    });
  });
};




