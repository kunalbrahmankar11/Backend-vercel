const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",   // ✅ your password
  database: "testdb"
});

app.post("/api/form", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    return res.json({ message: "Data saved successfully!" });
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
