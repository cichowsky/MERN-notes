const { jwtVerifyAccessToken } = require("../jwtActions");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization; // "Bearer token"
  const accessToken = authHeader?.split(" ")[1];

  if (!accessToken) return res.status(401).json("User not authenticated!");

  jwtVerifyAccessToken(accessToken, (err, data) => {
    if (err) return res.status(403).json("Access token is not valid!");

    req.data = data; // data from token payload
    next();
  });
};

module.exports = { authMiddleware };
