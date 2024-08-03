const express = require("express");
const {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const router = express.Router();

router.post("/create", createTodo);
router.get("/all-todos", getAllTodos);
router.get("/all-todos/:id", getTodo);
router.patch("/all-todos/:id", updateTodo);
router.delete("/all-todos/:id", deleteTodo);

module.exports = router;
