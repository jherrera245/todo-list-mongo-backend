module.exports = app => {
  const todos = require("../controllers/todo-controller.js");

  let router = require("express").Router();

  // crear una nueva tarea
  router.post("/", todos.create);

  // listar todas las tareas
  router.get("/", todos.findAll);

  // actualizar una tarea por su id
  router.put("/:id", todos.update);

  // eliminar tareas por id
  router.delete("/:id", todos.delete);

  // borrar todas las tareas
  router.delete("/", todos.deleteAll);

  app.use('/api/todos', router);
};