// from data.js
var tableData = data;

// // tbody, inputs and button
var tbody = d3.select("tbody");
var dateInput = d3.select("#datetime");
var stateInput = d3.select("#state");
var cityInput = d3.select("#city");
var countryInput = d3.select("#country");
var shapeInput = d3.select("#shape");
var filterBtn = d3.select("#filter-btn");


// event listener for searchButton
filterBtn.on("click", handleFilterButtonClick);

// renderTable
function renderTable() {
    tableData.forEach(function(ufo) {
        console.log(ufo);
        var row = tbody.append("tr");
        Object.entries(ufo).forEach(function([key, value]) {
          console.log(key, value);
          var cell = tbody.append("td");
          cell.text(value);
        });
      });
  }

// render initial table
renderTable();

function handleFilterButtonClick() {
    
  d3.event.preventDefault();

  // format the user search criteria
  var filterDate = dateInput.value;
  var filterState = stateInput.value.trim().toLowerCase();
  var filterCity = cityInput.value.trim().toLowerCase();
  var filterCountry = countryInput.value.trim().toLowerCase();
  var filterShape = shapeInput.value.trim().toLowerCase();

  // filters

    if (filterDate != "")
    {
    tableData = data.filter(function(address) 
    {
        var addressDate = address.datetime; 
        return addressDate === filterDate;
    });
    }
    else {tableData};
    if (filterState != "")
    {
    tableData = tableData.filter(function(address)
    {
        var addressState = address.state;
        return addressState === filterState;
    });
    }
    else {tableData};
    if (filterCity != "")
    {
    tableData = tableData.filter(function(address)
    {
        var addressCity = address.city;
        return addressCity === filterCity;
    });
    }
    else {tableData};
    if (filterCountry != "")
    {
    tableData = tableData.filter(function(address)
    {
        var addressCountry = address.country;
        return addressCountry === filterCountry;
    });
    }
    else {tableData};
    if (filterShape != "")
    {
    tableData = tableData.filter(function(address)
    {
        var addressShape = address.shape;
        return addressShape === filterShape;
    });
    }
    else {tableData};
}

