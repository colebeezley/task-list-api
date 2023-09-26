import { Handler } from "express";
import passport from "passport";
require("../strategies/local.strategy")();

module.exports = function passportConfig(app: {
  use: (arg0: Handler) => void;
}) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done: any) => {
    done(null, user);
  });

  passport.deserializeUser((user, done: any) => {
    done(null, user);
  });
};
