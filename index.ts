import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
dotenv.config();

const users = require(__dirname + "/src/users.json");
const authRouter = require(__dirname + "/src/routers/authRouter.ts");

const app = express();

// add middleware

app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "cookie_secret",
    resave: true,
    saveUninitialized: true,
  })
);

require("./src/config/passport.js")(app);

app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");

// var

let todo_list: string[] = ["groceries", "work"];
console.log(todo_list);

// routing

app.use("/auth", authRouter);

// defaults

app.get("/", (req: any, res: { render: (arg0: string, arg1: {}) => void }) => {
  let loggedIn = req.user ? true : false;

  res.render("index", {
    todo_list: todo_list,
    loggedIn: loggedIn,
  });
});

app.get("/api/users", (req: any, res: { json: (arg0: any) => any }) => {
  return res.json(users);
});

// listen

app.listen(3000, () => {
  console.log("listening on http://127.0.0.1:3000");
});
