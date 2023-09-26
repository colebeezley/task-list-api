import express from "express";
const User = require("./../models/User.ts");

const apiRouter = express.Router();

apiRouter.route("/addItem").post((req, res) => {
  if (req.user) {
    const itemToAdd = req.body.addedItem;
  }
});

apiRouter.route("/removeItem").post((req, res) => {
  if (req.user) {
    const itemToRemove = req.body.removedItem;
  }
});

module.exports = apiRouter;
