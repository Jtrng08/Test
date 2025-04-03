const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get available flights
router.get("/", (req, res) => {
    const { from, to, date } = req.query;
    const query = "SELECT * FROM flights WHERE from_city=? AND to_city=? AND date=?";
    
    db.query(query, [from, to, date], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Database error" });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;
