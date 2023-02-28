const User = require("../database/models/User");
const { hashPassword } = require("../bcrypt");


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

module.exports = { register };
