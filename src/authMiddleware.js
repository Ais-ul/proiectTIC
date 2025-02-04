const admin = require("firebase-admin");


const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; 
        next(); 
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid token", error });
    }
};

module.exports = authMiddleware;
