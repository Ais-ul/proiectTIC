const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const admin = require("firebase-admin");
const routes = require("./routes"); 

const app = express();


app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});


app.use("/api", routes);


app.get("/", (req, res) => {
    res.send("API is running");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
