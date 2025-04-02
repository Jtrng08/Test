// Function to extract URL parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        from: params.get('from'),
        to: params.get('to'),
        date: params.get('date'),
        time: params.get('time'),
        class: params.get('class')
    };
}

// Function to display search results
function displaySearchResults() {
    const searchParams = getQueryParams();
    
    // Populate the search details
    document.getElementById('from').textContent = searchParams.from || "N/A";
    document.getElementById('to').textContent = searchParams.to || "N/A";
    document.getElementById('date').textContent = searchParams.date || "N/A";
    document.getElementById('time').textContent = searchParams.time || "N/A";
    document.getElementById('class').textContent = searchParams.class || "N/A";

    // Simulated list of available flights (replace with backend API call)
    const flights = [
        { airline: "Verma Airlines", flightNumber: "VA123", time: "08:00 AM" },
        { airline: "Verma Airlines", flightNumber: "VA456", time: "12:30 PM" },
        { airline: "Verma Airlines", flightNumber: "VA789", time: "07:15 PM" }
    ];

    const flightList = document.getElementById("flight-list");
    flightList.innerHTML = flights.map(flight =>
        `<li>${flight.airline} - Flight ${flight.flightNumber} at ${flight.time}</li>`
    ).join("");
}

// Run the function when the page loads
document.addEventListener("DOMContentLoaded", displaySearchResults);
