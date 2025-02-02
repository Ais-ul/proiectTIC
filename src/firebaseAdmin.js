const admin = require("firebase-admin");

const serviceAccount = require("./mija-robert-proiect-tic-firebase-adminsdk-uj9cm-4baf418b89.json"); // Descarcă cheia JSON din Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
