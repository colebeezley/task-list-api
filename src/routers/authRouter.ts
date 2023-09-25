import express from "express";
import morgan from "morgan";

const authRouter = express.Router();

authRouter.route("/").get((req: any, res: { end: (arg0: string) => void }) => {
  res.end("auth route");
});

authRouter.route("/login").get((req, res) => {
  res.end("login page");
});

module.exports = authRouter;
