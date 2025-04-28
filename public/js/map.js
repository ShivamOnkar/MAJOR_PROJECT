mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: listing.geometry.coordinates, // starting position
    zoom: 9 // starting zoom
});

// Add a scale control to the map
map.addControl(new mapboxgl.ScaleControl());

   
const marker = new mapboxgl.Marker({color:"red"})
   .setLngLat(listing.geometry.coordinates) //Listing.geometry.coordinates
   .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<h4>${listing.title}</h4><p>Exact location will be provided after Booking</p>`))
   .addTo(map);