import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);


app.get("/", (req, res) => {
  res.send("Welcome to todo api i bulit as an assignment for fire ai");
});

export { app };
