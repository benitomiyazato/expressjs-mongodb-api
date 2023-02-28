const authentication = (req, res, next) => {
  if (req.session.isAuthenticated === true) return next();

  res.status = 401;
  res.send("You are not authenticated!");
};

module.exports = { authentication };
