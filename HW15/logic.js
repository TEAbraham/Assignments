var quakeApi = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var plateApi = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

d3.json(quakeApi, function(data) {

    createFeatures(data.features);
            
});

function createFeatures(quakeData) {       

  var earthquakes = L.geoJson(quakeData, {
    onEachFeature: function (feature, layer){
      layer.bindPopup(`<h3>${feature.properties.place}<br> Magnitude: ${feature.properties.mag}
      </h3><hr><h5>${new Date(feature.properties.time)}</h5>`,{
          autoPan: true,
      })
    },
    pointToLayer: function (feature, latlng) {
      return new L.circle(latlng,
        {radius: getRadius(feature.properties.mag),
          fillColor: getColor(feature.properties.mag),
          fillOpacity: .7,
          stroke: false
      })
    }
  });

  createMap(earthquakes);
}

function createMap(earthquakes) {

  var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });
  var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  var lightMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Satellite Map": satelliteMap,
    "Dark Map": darkMap,
    "Light Map": lightMap
  };

  var tectonicPlates = new L.LayerGroup();

  var overlayMaps = {
    Earthquakes: earthquakes,
    Plates: tectonicPlates
  };

  var myMap = L.map("map", {
    center: [15, 0],
    zoom: 2,
    layers: [satelliteMap, earthquakes, tectonicPlates]
  });

   d3.json(plateApi, function(plateData) {
     L.geoJson(plateData, {
       color: "purple",
       weight: 2
     })
     .addTo(tectonicPlates);
   });


  L.control.layers(baseMaps, overlayMaps).addTo(myMap);

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
              grades = [0, 1, 2, 3, 4, 5],
              labels = [];

    for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
        `<i style="background:${getColor(grades[i] + 1)}"></i>`+
        grades[i] + (grades[i + 1] ? `&ndash;${grades[i + 1]}<br>` : '+');
    }
    return div;
  };

  legend.addTo(myMap);

  sliderControl = L.control.sliderControl({
    position: "bottomleft",
    layer: earthquakes
  });
  myMap.addControl(sliderControl);
  sliderControl.startSlider();
}

function getColor(d) {
  if (d > 5){
      return 'Maroon'}
  else if (d > 4){
      return 'OrangeRed'}
  else if (d > 3){
      return 'Orange'}  
  else if (d > 2){
      return 'Yellow'}
  else if (d > 1){
      return 'YellowGreen'}
  else{
      return 'Green'}
}

function getRadius(value){
  return value*40000
}
