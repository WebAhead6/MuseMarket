const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    if (!req.cookies.access_token) throw new Error();

    const decoded = await jwt.verify(
      req.cookies.access_token,
      process.env.JWT_SECRET
    );
    res.locals.username = decoded.user;
    res.locals.id = decoded.id;
    next();
  } catch (error) {
    res.locals.username = null;

    next();
  }
};
