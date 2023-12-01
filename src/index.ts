import express, { Application } from "express";
import fs from "fs";

const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Connected");
});

app.get("/todos", (req, res) => {
  fs.readFile("./toDos.json", "utf-8", (err, data) => {
    if (err) return res.json(err);
    const toDos = JSON.parse(data);
    return res.json(toDos);
  });
});

export default app;
