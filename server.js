const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');  // Import the database connection

const app = express();
const port = 3000;

// Middleware to parse POST request data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route to view all reservations
app.get('/reservations', (req, res) => {
    db.all("SELECT * FROM reservations", [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);  // Send all reservations as JSON
    });
});

// Route to add a new reservation
app.post('/reserve', (req, res) => {
    const { name, email, flight_from, flight_to, departure_date } = req.body;
    const stmt = db.prepare("INSERT INTO reservations (name, email, flight_from, flight_to, departure_date) VALUES (?, ?, ?, ?, ?)");
    stmt.run(name, email, flight_from, flight_to, departure_date, function (err) {
        if (err) {
            return res.status(500).send('Error creating reservation');
        }
        res.send(`Reservation created with ID: ${this.lastID}`);
    });
    stmt.finalize();
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
