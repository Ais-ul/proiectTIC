const express = require("express");
const authenticateToken = require("./authMiddleware");

const router = express.Router();

// Middleware pentru validarea datelor produsului
const validateProduct = (req, res, next) => {
  const { name, price } = req.body;
  
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Numele produsului este obligatoriu!' });
  }
  
  if (isNaN(price) || price <= 0) {
    return res.status(400).json({ error: 'Prețul trebuie să fie un număr valid mai mare de 0!' });
  }
  
  next(); // Dacă datele sunt valide, continuăm cu logica de adăugare , adaug asta ca as pot da push
};

// Rută protejată - doar utilizatorii autentificați pot accesa
router.get("/protected-route", authenticateToken, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

// Rute pentru adăugarea produselor
router.post('/products', validateProduct, (req, res) => {
  const { name, price } = req.body;
  
  // Aici poți adăuga produsul în Firestore sau altă bază de date
  res.status(200).json({ message: 'Produs adăugat cu succes!' });
});

module.exports = router;
