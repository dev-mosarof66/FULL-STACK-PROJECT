import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(`token in verifyToken : ${token}`);

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded.id;
    console.log(`req.user in verify token : ${req.user}`);
    
    next();
  });
};

export default verifyToken;
