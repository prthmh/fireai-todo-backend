import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import todoRouter from "./routes/todo.route.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todo", todoRouter);

app.get("/", (req, res) => {
  res.send("Welcome to todo api i bulit as an assignment for fire ai");
});

app.post("/check", (req, res) => {
  const b = req.body;
  console.log(b);
  res.json(b);
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

export { app };
