const passport = require("passport");
const { Strategy } = require("passport-local");
const mongoose = require("mongoose");
const User = require("./../models/User.ts");

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      (
        username: string,
        password: string,
        done: (arg0: any, arg1: boolean) => void
      ) => {
        const url = process.env.MONGO_KEY;
        async function validateUser() {
          try {
            await mongoose.connect(process.env.MONGO_KEY, {
              dbName: "task-list-api",
            });

            const user = await User.findOne({ username });

            if (user && user.password === password) {
              done(null, user);
            } else {
              console.log("login incorrect");
              done(null, false);
            }
          } catch (err) {
            console.log("error connecting");
            done(err, false);
          }
        }
        validateUser();
      }
    )
  );
};
