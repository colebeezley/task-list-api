import express from "express";
import mongoose from "mongoose";
const User = require("./../models/User.ts");

const apiRouter = express.Router();

apiRouter.route("/addItem").put((req, res) => {
  if (req.user) {
    res.status(200).send("received");
    const itemToAdd = req.body.addedItem;

    async function addItem(req: any) {
      await mongoose.connect(process.env.MONGO_KEY!, {
        dbName: "task-list-api",
      });
      const currUser = await User.findOne({
        username: req.user.username,
      });
      currUser.todo_list.push(itemToAdd);
      currUser.save();
    }
    addItem(req);
  } else {
    res.status(500).send("not logged in");
  }
});

apiRouter.route("/removeItem").delete((req, res) => {
  if (req.user) {
    res.status(200).send("received");
    const itemToRemove = req.body.removedItem;

    async function removeItem(req: any) {
      await mongoose.connect(process.env.MONGO_KEY!, {
        dbName: "task-list-api",
      });
      const currUser = await User.findOne({
        username: req.user.username,
      });
      const index = currUser.todo_list.indexOf(itemToRemove);
      if (index != -1) {
        currUser.todo_list.splice(index, 1);
        currUser.save();
      }
    }
    removeItem(req);
  } else {
    res.status(500).send("not logged in");
  }
});

apiRouter.route("/:user/items").get((req, res) => {
  // res.status(200).send("received");

  async function getItems() {
    await mongoose.connect(process.env.MONGO_KEY!, {
      dbName: "task-list-api",
    });
    const currUser = await User.findOne({
      username: req.params.user,
    });
    const items = currUser.todo_list;
    res.json(items);
  }
  getItems();
});

module.exports = apiRouter;
