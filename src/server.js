const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config(); // Pentru variabile de mediu

const app = express();

// Middleware-uri esențiale
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Ruta de bază
app.get('/', (req, res) => {
  res.send('API is running');
});

// Pornire server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
