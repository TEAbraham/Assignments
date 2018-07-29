// from data.js
var tableData = data;

// // tbody, inputs and button
var tbody = d3.select("tbody");
var filterBtn = d3.select("#filter-btn");

// event listener for searchButton
filterBtn.addEventListener("click", handleFilterButtonClick);

// renderTable
function renderTable() {
    tableData.forEach(function(ufo){
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

// // tbody, inputs and button
var dateInput = d3.select("#datetime");
var stateInput = d3.select("#state");
var cityInput = d3.select("#city");
var countryInput = d3.select("#country");
var shapeInput = d3.select("#shape");


// format the user search criteria
var filterDate = dateInput.value;
var filterState = stateInput.value;
var filterCity = cityInput.value;
var filterCountry = countryInput.value;
var filterShape = shapeInput.value;

filterState = filterState.trim().toLowerCase()
filterCity = filterCity.trim().toLowerCase()
filterCountry = filterCountry.trim().toLowerCase()
filterShape = filterShape.trim().toLowerCase()
  // filters

    if (filterDate.length != 0){
        tableData = data.filter(function(address){
            var addressDate = address.datetime; 
            return addressDate === filterDate;
            });
        }
    else {tableData=data};

    if (filterDate.length != 0){
        tableData = data.filter(function(address){
            var addressState = address.state; 
            return addressState === filterState;
            });
        }
    else {tableData=tableData};

    if (filterDate.length != 0){
        tableData = data.filter(function(address){
            var addressCity = address.city; 
            return addressCity === filterCity;
            });
        } 
        
    else {tableData=tableData};

    if (filterDate.length != 0){
        tableData = data.filter(function(address){
            var addressCountry = address.country; 
            return addressCountry === filterCountry;
            });
        }
    else {tableData=tableData};

    if (filterDate.length != 0){
        tableData = data.filter(function(address){
            var addressShape = address.shape; 
            return addressShape === filterShape;
            });
        }
    else {tableData=tableData};
  renderTable();
}
