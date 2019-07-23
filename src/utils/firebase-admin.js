var admin = require("firebase-admin");

var serviceAccount = require("../../config/firebase-adminsdk-key.json");

module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://interview-assist-1563177459840.firebaseio.com"
});
