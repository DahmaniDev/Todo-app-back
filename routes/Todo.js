const express = require("express");
const router = express.Router();

// these are the controllers
// we will create all of them in the future
const {
  createTodo,
  getTodoById,
  getTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} = require("../controllers/Todo");

//params
// it will fetch the value from the url
router.param("todo", function(req, res) {
    getTodoById(req,res);
});

// to get all the todos
router.get("/todos/", function(req, res) {
    getAllTodos(req,res);
});


// to get a single todo
router.get("/todo/:todoId/", function(req, res) {
  getTodo(req,res);
});

// to create a todo
router.post("/todo/create/", function(req, res) {
    createTodo(req,res);
});

// to update the todo
router.put("/todo/:todoId/update", function(req, res) {
    updateTodo(req,res);
});

// to delete the todo
router.delete("/todo/:todoId/delete", function(req, res) {
    deleteTodo(req,res);
});

// we will export the router to import it in the index.js
module.exports = router;