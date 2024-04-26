import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET_KEY;
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorised access" });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }

    req.user = user;
    next();
  });
}

export default verifyToken;
