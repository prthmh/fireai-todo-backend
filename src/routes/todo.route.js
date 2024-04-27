import express from "express";
import {
  createTodo,
  deleteTodo,
  editTodo,
  getAllTodosofUser,
  getTodoById,
} from "../controllers/todo.controller.js";
import verifyToken from "../middlewares/verify.middleware.js";

const todoRouter = express.Router();

todoRouter.post("/", verifyToken, createTodo);
todoRouter.get("/single-todo/:todoId", getTodoById);
todoRouter.get("/:username", getAllTodosofUser);
todoRouter.post("/edit/:todoId", verifyToken, editTodo);
todoRouter.delete("/:todoId", verifyToken, deleteTodo);

export default todoRouter;
