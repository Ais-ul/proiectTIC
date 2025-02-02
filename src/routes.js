const express = require("express");
const authenticateToken = require("./authMiddleware");

const router = express.Router();

// Rută protejată - doar utilizatorii autentificați pot accesa
router.get("/protected-route", authenticateToken, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

// Alte rute pot fi adăugate aici...

module.exports = router;
