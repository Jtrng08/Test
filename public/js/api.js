document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    const to = params.get("to");
    const date = params.get("date");

    // Show search details
    if (from && to && date) {
        document.getElementById("fromText").textContent = from;
        document.getElementById("toText").textContent = to;
        document.getElementById("dateText").textContent = date;

        // Fetch flights from backend
        fetch(`https://yourbackend.com/api/flights?from=${from}&to=${to}&date=${date}`)
            .then(response => response.json())
            .then(data => {
                const flightsList = document.getElementById("flightsList");
                flightsList.innerHTML = ""; // Clear previous results
                
                if (data.length === 0) {
                    flightsList.innerHTML = "<li>No flights available</li>";
                }

                data.forEach(flight => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                        Flight ${flight.number}: ${flight.from} → ${flight.to} | ${flight.date} <br>
                        Price: $${flight.price} <br>
                        <button onclick="reserveFlight('${flight.id}')">Reserve</button>
                    `;
                    flightsList.appendChild(li);
                });
            })
            .catch(error => console.error("Error fetching flights:", error));
    }
});

// Function to reserve a flight
function reserveFlight(flightId) {
    fetch(`https://localhost:5000.com/api/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flightId: flightId, userId: "123" })  // Replace with actual user ID
    })
    .then(response => response.json())
    .then(data => {
        alert("Flight reserved successfully!");
        window.location.href = "reservations.html";  // Redirect to view reservations
    })
    .catch(error => console.error("Error reserving flight:", error));
}

fetch(`http://localhost:5000/api/flights?from=${from}&to=${to}&date=${date}`)

