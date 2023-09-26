import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
const User = require("./src/models/User.ts");
dotenv.config();

const users = require(__dirname + "/src/users.json");
const authRouter = require(__dirname + "/src/routers/authRouter.ts");
const apiRouter = require(__dirname + "/src/routers/apiRouter.ts");

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

require("./src/config/passport.ts")(app);

app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");

// var

// routing

app.use("/auth", authRouter);
app.use("/api", apiRouter);

// defaults

app.get(
  "/",
  (
    req: any,
    res: {
      render: (
        arg0: string,
        arg1: { todo_list: string[]; loggedIn: boolean; username: string }
      ) => void;
    }
  ) => {
    let loggedIn = req.user ? true : false;
    let username = loggedIn ? req.user.username : "";
    let todo_list: string[] = ["groceries", "work"];

    if (loggedIn) {
      async function updateItems(req: any) {
        await mongoose.connect(process.env.MONGO_KEY!, {
          dbName: "task-list-api",
        });
        const currUser = await User.findOne({
          username: req.user.username,
        });
        todo_list = currUser.todo_list;
        res.render("index", {
          todo_list: todo_list,
          loggedIn: loggedIn,
          username: username,
        });
      }
      updateItems(req);
    } else {
      res.render("index", {
        todo_list: todo_list,
        loggedIn: loggedIn,
        username: username,
      });
    }
  }
);

app.get("/api/users", (req: any, res: { json: (arg0: any) => any }) => {
  return res.json(users);
});

// listen

app.listen(3000, () => {
  console.log("listening on http://127.0.0.1:3000");
});
