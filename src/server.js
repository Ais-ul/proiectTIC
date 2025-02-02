const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const admin = require("firebase-admin");
const routes = require("./routes"); // Importă rutele

const app = express();

// Middleware-uri esențiale
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Inițializare Firebase Admin
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

// Folosește rutele din `routes.js`
app.use("/api", routes);

// Ruta de bază
app.get("/", (req, res) => {
    res.send("API is running");
});

// Pornire server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
