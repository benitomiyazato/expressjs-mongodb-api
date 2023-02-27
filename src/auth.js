const auth = (req, res, next) => {
  if (req.session.isAuthenticated == true) {
    return next();
  }

  const { username, password } = req.query;
  if (username === "dev" && password === "password") {
    req.session.isAuthenticated = true;
    return next();
  }

  res.status(401);
  return res.send("Authentication failed");
};

module.exports = auth;
