const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

// User login
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email=?", [email], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    });
});

// Register user
router.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword], (err) => {
        if (err) {
            res.status(500).json({ error: "Registration failed" });
        } else {
            res.json({ message: "User registered" });
        }
    });
});

module.exports = router;
