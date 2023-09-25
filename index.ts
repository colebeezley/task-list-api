const morgan = require("morgan");
const express = require("express");
const users = require("./src/users.json");

const app = express();

// add middleware

app.use(morgan("tiny"));
app.use(express.static("public"));

app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");

// var

let todo_list: string[] = ["groceries", "work"];
console.log(todo_list);

// routing

app.get("/", (req: any, res: { render: (arg0: string, arg1: {}) => void }) => {
  res.render("index", { todo_list: todo_list });
});

app.get("/api/users", (req: any, res: { json: (arg0: any) => any }) => {
  return res.json(users);
});

// listen
app.listen(3000, () => {
  console.log("listening on http://127.0.0.1:3000");
});
