const User = require("../database/models/User");
const { hashPassword, comparePassword } = require("../bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send("You must send username and password");

  const userDB = await User.findOne({ username });
  if (!userDB)
    return res.status(400).send("There's no user with this username");

  const usernamePasswordValid = await comparePassword(
    password,
    userDB.password
  );

  if (usernamePasswordValid) {
    req.session.isAuthenticated = true;
    return res.status(201).send("Authentication complete");
  }

  return res.status(401).send("Invalid password");
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res
      .status(400)
      .send("You must send and username, email and password");

  try {
    const userDB = await User.findOne({ $or: [{ username }, { email }] });
    if (userDB) return res.status(400).send("This user is already registered");

    const hashedPassword = await hashPassword(password);
    const savedUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.send(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = { login, register };
