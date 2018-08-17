var quakeApi = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var plateApi = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"


d3.json(quakeApi, function(data) {

    createFeatures(data.features);
});

function createFeatures(quakeData) {       

  var earthquakes = L.geoJson(quakeData, {
    onEachFeature: function (feature, layer){
      layer.bindPopup("<h3>" + feature.properties.place + "<br> Magnitude: " + feature.properties.mag +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    },
    pointToLayer: function (feature, latlng) {
      return new L.circle(latlng,
        {radius: getRadius(feature.properties.mag),
          fillColor: getColor(feature.properties.mag),
          fillOpacity: .7,
          stroke: true,
          color: "black",
          weight: .5
      })
    }
  });

  createMap(earthquakes)
}

function createMap(earthquakes) {

  var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    id: "mapbox.satellite",
    accessToken: API_KEY
  });
  var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  var lightMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
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
    "Tectonic Plates": tectonicPlates
  };

  var myMap = L.map("map", {
    center: [45, -90],
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


  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
              grades = [0, 1, 2, 3, 4, 5],
              labels = [];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
  };

  legend.addTo(myMap);
}

function getColor(d) {
  return d > 5 ? '#F30' :
  d > 4  ? '#F60' :
  d > 3  ? '#F90' :
  d > 2  ? '#FC0' :
  d > 1   ? '#FF0' :
            '#9F3';
}

function getRadius(value){
  return value*40000
}
