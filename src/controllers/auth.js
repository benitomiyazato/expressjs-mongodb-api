const auth = (req, res) => {
  const { username, password } = req.body;
  if (username === "dev" && password === "password") {
    req.session.isAuthenticated = true;
    res.status(201);
    return res.send("Authentication complete");
  }

  res.status(401);
  return res.send("Authentication failed");
};

module.exports = {auth};
