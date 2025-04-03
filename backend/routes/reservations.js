const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get user reservations
router.get("/", (req, res) => {
    const userId = 1; // Replace with authentication logic
    db.query("SELECT * FROM reservations WHERE user_id=?", [userId], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Database error" });
        } else {
            res.json(results);
        }
    });
});

// Reserve a flight
router.post("/", (req, res) => {
    const { flightId } = req.body;
    const userId = 1; // Replace with authentication logic

    db.query("INSERT INTO reservations (flight_id, user_id) VALUES (?, ?)", [flightId, userId], (err) => {
        if (err) {
            res.status(500).json({ error: "Database error" });
        } else {
            res.json({ message: "Reservation successful" });
        }
    });
});

// Cancel reservation
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM reservations WHERE id=?", [req.params.id], (err) => {
        if (err) {
            res.status(500).json({ error: "Database error" });
        } else {
            res.json({ message: "Reservation canceled" });
        }
    });
});

module.exports = router;
