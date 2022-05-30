// Initialize the map
var map = L.map('map').setView([37.09024, -95.712891], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 5,
    attribution: '© OpenStreetMap'
}).addTo(map);

