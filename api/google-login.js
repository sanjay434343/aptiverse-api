import admin from "./firebase.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const userRecord = await admin.auth().getUser(uid);

    res.status(200).json({ success: true, user: userRecord });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}
