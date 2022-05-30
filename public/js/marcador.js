L.marker([lat, lon]).addTo(map)
    .bindPopup(title)
    .openPopup();

map.panTo(new L.LatLng(lat, lon));