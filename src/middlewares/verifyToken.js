const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (!headerToken) return res.status(401).json({ message: "Unauthorized" });

  const accessToken = headerToken.split(" ")[1];
  if (!accessToken) {
    res.status(401).json({ message: "Missing Token" });
  }
  try {
    const user = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;
