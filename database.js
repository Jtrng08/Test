const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./airline_reservation.db');  // Create or open the database

// Create reservations table if it doesn't exist
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS reservations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, flight_from TEXT, flight_to TEXT, departure_date TEXT)");

    // Insert sample data (can be removed later)
    const stmt = db.prepare("INSERT INTO reservations (name, email, flight_from, flight_to, departure_date) VALUES (?, ?, ?, ?, ?)");
    stmt.run("John Doe", "john@example.com", "New York", "Los Angeles", "2025-05-01");
    stmt.finalize();
});

module.exports = db;
