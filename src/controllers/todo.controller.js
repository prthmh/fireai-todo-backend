import { Todo } from "../models/todo.model.js";

async function createTodo(req, res) {
  const user = req.user;
  try {
    if (!user) {
      return res.status(404).json({ error: "No user" });
    }
    const { todoData } = req.body;
    console.log(req.body);
    if (!todoData) {
      return res.status(400).json({ error: "No todo" });
    }

    const todo = new Todo({
      title: todoData.title,
      description: todoData.description,
      status: todoData.status,
      priority: todoData.priority,
      flag: todoData.flag,
      username: user.username,
    });

    await todo.save();

    const todos = await Todo.find({ username: user.username });

    res.status(201).json({ todos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function editTodo(req, res) {
  const user = req.user;
  const todoId = req.params.todoId;
  const { todoData } = req.body;

  if (!todoData) {
    return res.status(400).json({ error: "No todo" });
  }
  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      res.status(400).json({ error: "Todo not found" });
    }
    if (todo.userId !== user._id) {
      return res.status(404).json({
        error: "Cannot edit a todo which does not belong to the user",
      });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, todoData, {
      new: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ errors: "Todo not found" });
    }

    const todos = await Todo.find({ username: user.username });

    res.status(200).json({ todos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteTodo(req, res) {
  const todoId = req.params.todoId;
  const user = req.user;
  await Todo.findByIdAndDelete(todoId);

  const todos = await Todo.find({ username: user.username });
  res.status(201).json({ todos });
}

async function getAllTodosofUser(req, res) {
  try {
    const username = req.params.username;
    const todos = await Todo.find({ username });

    res.status(200).json({ todos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getTodoById(req, res) {
  try {
    const todoId = req.params.todoId;
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ errors: ["Todo not found"] });
    }

    res.status(200).json({ todo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { createTodo, editTodo, deleteTodo, getAllTodosofUser, getTodoById };
