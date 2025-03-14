require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

// Dummy User Data (Replace with DB)
const users = [{ id: 1, username: "testuser", password: "password123" }];

// **1. Login Route (Issue Token)**
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username,password);
  
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // Generate Access Token
  const accessToken = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });

  // Set Cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // Prevents XSS attacks
    secure: process.env.NODE_ENV === "production", // Secure in production
    sameSite: "Strict",
  });

  res.json({ message: "Logged in successfully" });
});

// **2. Verify Token Middleware**
const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token);
  
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

// **3. Protected Route (Verify Token)**
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT} in server.js`));
