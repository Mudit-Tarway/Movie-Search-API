import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.static("public")); // put your index.html, script.js, style.css inside /public

// Proxy route
app.get("/movie", async (req, res) => {
  try {
    const query = req.query.q;
    const apiKey = process.env.OMDB_API_KEY;
    const response = await fetch(`https://www.omdbapi.com/?t=${query}&apikey=${apiKey}`);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
