/**MAP.JS --- Leaflet maps for the landscape */
/**ALWAYS REMEMBER - leaflet takes coords (in CRS.Simple) with Y, X ! */

let map = L.map("mapView", {
  crs: L.CRS.Simple, //simple coordinate system provided by leaflet
  minZoom: -1.75,
  maxZoom: 0.75, //Avoid pixelated map
}).setView([0, 0], 0);

let image = L.imageOverlay("assets/maps/fr-map2.jpeg", [
  [3500, 3500],
  [1543, 1543],
]).addTo(map); //adds img to map

map.fitBounds([
  [3500, 3500],
  [1543, 1543],
]); //fits the map to bounds

map.setMaxBounds([
  [3500, 3500],
  [1543, 1543],
]); //these bounds work, but they don't make sense - FIXME

/**Creates labels for each city */
for (city of scenario.cities) {
  var myIcon = L.divIcon({ className: "city-label", html: city.name });

  //styles can be set in CSS

  L.marker(city.coordinates, { icon: myIcon }).addTo(map);
}
