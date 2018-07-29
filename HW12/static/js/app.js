// from data.js
var tableData = data;

// tbody, inputs and button
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#datetime");
var $stateInput = document.querySelector("#state");
var $searchBtn = document.querySelector("#search");
var $cityInput = document.querySelector("#city");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");


// event listener for searchButton
$searchBtn.addEventListener("click", handleSearchButtonClick);

var filteredTable = dataSet;

// renderTable
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredTable.length; i++) {
    // Get get the current address object and its fields
    var address = filteredTable[i];
    console.log(address)
    var fields = Object.keys(address);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = address[field];
    }
  }
}

function handleSearchButtonClick() {
  // format the user search criteria
  var filterDate = $dateInput.value;
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();

  // filters
  if (filterDate != "")
  {
    filteredTable = dataSet.filter(function(address) 
    {
      var addressDate = address.datetime; 
    
    return addressDate === filterDate;
    });
  }
  else {filteredTable};
  

  if(filterState != "")
  {
    filteredTable = filteredTable.filter(function(address)
    {
      var addressState = address.state;
      return addressState === filterState;
    });
  }
  else{filteredTable};

  if(filterCity != "")
  {
    filteredTable = filteredTable.filter(function(address)
    {
      var addressCity = address.city;
      return addressCity === filterCity;
    });
  }

  else{filteredTable};

  if(filterCountry != "")
  {
    filteredTable = filteredTable.filter(function(address)
    {
      var addressCountry = address.country;
      return addressCountry === filterCountry;
    });
  }
  else{filteredTable};

  if(filterShape != "")
  {
    filteredTable = filteredTable.filter(function(address)
    {
      var addressShape = address.shape;
      return addressShape === filterShape;
    });
  }
  else{filteredTable};

renderTable();

}

// render initial table
renderTable();

// pages

$(document).ready(function() {
  $('#table').DataTable();
});
