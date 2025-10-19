import admin from "firebase-admin";
import fs from "fs";

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://aptiverse-317a8-default-rtdb.firebaseio.com",
    storageBucket: "aptiverse-317a8.firebasestorage.app"
  });
}

export default admin;
export const FIREBASE_API_KEY = "AIzaSyBj11tH2eqX4uoz39a4MzG6FjZe1dN_UVM";
