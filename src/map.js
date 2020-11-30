/**MAP.JS --- Leaflet maps for the landscape */

/**ALWAYS REMEMBER - leaflet takes coords (in CRS.Simple) with Y, X ! */

let map = L.map('mapView', {
    crs: L.CRS.Simple, //simple coordinate system provided by leaflet
    minZoom: -1.75,
    maxZoom: 0.75, //Avoid pixelated map
    maxBoundsViscosity: 1.0
}).setView([0, 0], 0);

let image = L.imageOverlay("assets/maps/fr-map2.jpeg", [[3500, 3500], [1543, 1543]]).addTo(map);
map.fitBounds([[3500, 3500], [1543, 1543]])

/**Creates labels for each city - still a bit unfamiliar with Leaflet coords, unfortunately */
for (city of scenario.cities) {
    var myIcon = L.divIcon({className: 'city-label', html: city.name});

    console.log(city)
    //styles can be set in CSS
    L.marker(city.coordinates, {icon: myIcon}).addTo(map);

    //create markers
    let cityMarker = L.icon({
        iconUrl: 'assets/maps/map-pin.png',
        iconSize: [24, 24],
        iconAnchor: city.coordinates,
        popupAnchor: city.coordinates
    })

    L.marker(city.coordinates, {icon: cityMarker}).addTo(map)

}