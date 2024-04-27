import express from "express";
import {
  createTodo,
  deleteTodo,
  editTodo,
  getAllTodosofUser,
} from "../controllers/todo.controller.js";
import verifyToken from "../middlewares/verify.middleware.js";

const todoRouter = express.Router();

todoRouter.get("/", verifyToken, getAllTodosofUser);
todoRouter.post("/", verifyToken, createTodo);
todoRouter.post("/edit/:todoId", verifyToken, editTodo);
todoRouter.delete("/:todoId", verifyToken, deleteTodo);

export default todoRouter;
