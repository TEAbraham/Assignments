var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#datetime");
var $stateInput = document.querySelector("#state");
var $filterBtn = document.querySelector("#filter-btn");
var $cityInput = document.querySelector("#city");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");



$filterBtn.addEventListener("click", handleFilterButtonClick);


var filteredTable = data;


function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredTable.length; i++) {
    var sighting = filteredTable[i];
    console.log(sighting)
    var fields = Object.keys(sighting);
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      var field = fields[j]
      var $cell = $row.insertCell(j);
      $cell.innerText = sighting[field];
    }
  }
}


renderTable();

function handleFilterButtonClick() {


  var filterDate = $dateInput.value;
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();

  if (filterDate != "")
  {
    filteredTable = dataSet.filter(function(sighting) 
    {
      var sightingDate = sighting.datetime; 
    

    return sightingDate === filterDate;
    });
  }
  else {filteredTable};
  

  if(filterState != "")
  {
    filteredTable = filteredTable.filter(function(sighting)
    {
      var sightingState = sighting.state;
      return sightingState === filterState;
    });
  }
  else{filteredTable};

  if(filterCity != "")
  {
    filteredTable = filteredTable.filter(function(sighting)
    {
      var sightingCity = sighting.city;
      return sightingCity === filterCity;
    });
  }

  else{filteredTable};

  if(filterCountry != "")
  {
    filteredTable = filteredTable.filter(function(sighting)
    {
      var sightingCountry = sighting.country;
      return sightingCountry === filterCountry;
    });
  }
  else{filteredTable};

  if(filterShape != "")
  {
    filteredTable = filteredTable.filter(function(sighting)
    {
      var sightingShape = sighting.shape;
      return sightingShape === filterShape;
    });
  }
  else{filteredTable};

renderTable();

}


$(document).ready(function() {
  $('#ufo-table').DataTable();
});