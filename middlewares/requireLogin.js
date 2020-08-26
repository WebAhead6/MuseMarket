module.exports = (req, res, next) => {
  if (!res.locals.username) return res.redirect("/");
  next();
};
