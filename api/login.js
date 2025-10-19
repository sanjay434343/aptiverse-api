import admin from "./firebase.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const { email, password, displayName } = req.body;

  try {
    const userRecord = await admin.auth().createUser({ email, password, displayName });
    res.status(200).json({ success: true, user: userRecord });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}
