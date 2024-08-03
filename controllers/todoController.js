const Todo = require("../models/todoModel");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../utils");

const getAllTodos = async (req, res) => {
  const todos = await Todo.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );

  res.status(StatusCodes.OK).json({ todos, count: todos.length });
};

const getTodo = async (req, res) => {
  const {
    user: { userId },
    params: { id: todoId },
  } = req;
  const todo = await Todo.findOne({
    _id: todoId,
    createdBy: userId,
  });
  if (!todo) {
    throw new NotFoundError(`No todo found with this id ${todoId}`);
  }
  res.status(StatusCodes.OK).json({ todo });
};

const createTodo = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const todo = await Todo.create(req.body);
  res.status(StatusCodes.CREATED).json({ todo });
};

const updateTodo = async (req, res) => {
  const {
    body: { description, status },
    user: { userId },
    params: { id: todoId },
  } = req;

  if (description === "" || status === "") {
    throw new BadRequestError("description or status fields cannot be empty");
  }
  const todo = await Todo.findByIdAndUpdate(
    { _id: todoId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!todo) {
    throw new NotFoundError(`No job with id ${todoId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const deleteTodo = async (req, res) => {
  const {
    user: { userId },
    params: { id: todoId },
  } = req;

  const todo = await Todo.findByIdAndRemove({
    _id: todoId,
    createdBy: userId,
  });
  if (!todo) {
    throw new NotFoundError(`No todo with id ${todoId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
