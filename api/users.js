import admin from "./firebase.js";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).send("Method not allowed");

  try {
    const snapshot = await admin.database().ref("/users").once("value");
    res.status(200).json({ success: true, data: snapshot.val() });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}
