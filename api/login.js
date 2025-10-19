import fetch from "node-fetch";
import { FIREBASE_API_KEY } from "./firebase.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const { email, password } = req.body;

  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true })
      }
    );

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    res.status(200).json({ success: true, token: data.idToken, refreshToken: data.refreshToken });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}
