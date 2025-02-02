const admin = require("firebase-admin");

// Middleware pentru verificarea autentificării
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extrage token-ul din "Authorization: Bearer <TOKEN>"

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Adaugă user-ul verificat în request
        next(); // Continuă execuția către ruta următoare
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid token", error });
    }
};

module.exports = authMiddleware;
