const passport = require("passport");
const { Strategy } = require("passport-local");

const User = require("../database/models/User");
const { comparePassword } = require("../bcrypt");

passport.serializeUser(async (user, done) => {
  const userId = user.id;

  try {
    const userDB = await User.findById(userId);
    if (userDB) return done(null, userId);
  } catch (error) {
    done(error, false);
  }
});

passport.deserializeUser(async (userId, done) => {
  done(null, userId);
});

passport.use(
  new Strategy(async (username, password, done) => {
    if (!username || !password)
      return done("You must send username and password", false);

    const userDB = await User.findOne({ username });
    if (!userDB) return done("There is no user with this username", false);

    const usernamePasswordValid = await comparePassword(
      password,
      userDB.password
    );

    if (usernamePasswordValid) return done(null, userDB);

    done("Invalid credentials", false);
  })
);
