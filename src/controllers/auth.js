const User = require("../database/models/User");

const login = (req, res) => {
  const { username, password } = req.body;
  if (username === "dev" && password === "password") {
    req.session.isAuthenticated = true;
    res.status(201);
    return res.send("Authentication complete");
  }

  res.status(401);
  return res.send("Authentication failed");
};

const register = async (req, res) => {
  const { username, password, email } = req.body;
  const userDB = await User.findOne({ $or: [{ username }, { email }] });

  if (userDB) return res.status(400).send("This user is already registered");
  const savedUser = await User.create({ username, email, password });
  res.send(savedUser);
};

module.exports = { login, register };
