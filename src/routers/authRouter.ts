import express from "express";
import morgan from "morgan";
import passport from "passport";
import mongoose from "mongoose";
const User = require("./../models/User.ts");

const authRouter = express.Router();

authRouter.route("/signup").post((req, res) => {
  const { username, password } = req.body;
  const user = { username, password, todo_list: [] };

  async function pushUser() {
    await mongoose.connect(process.env.MONGO_KEY!, { dbName: "task-list-api" });

    const currUser = await User.findOne({
      username: username,
      password: password,
    });
    if (currUser) {
      console.log("user already exists");
      res.redirect("/auth/login");
    } else {
      let results = await User.collection.insertOne(user);
      req.login(
        {
          _id: results.insertedId.toString(),
          username: username,
          password: password,
          todo_list: [],
        },
        () => {
          res.redirect("/");
        }
      );
    }
  }
  pushUser();
});

authRouter
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth/login",
    })
  );

module.exports = authRouter;
