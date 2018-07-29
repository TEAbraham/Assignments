// from data.js
var tableData = data;

// // tbody, inputs and button
var tbody = d3.select("tbody");
var filterBtn = d3.select("#filter-btn");

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
    
    console.log("Filtered Return")
    d3.event.preventDefault();
    d3.event.target.value.trim().toLowerCase();

    // // tbody, inputs and button
    var dateInput = d3.select("#datetime");
    var stateInput = d3.select("#state");
    var cityInput = d3.select("#city");
    var countryInput = d3.select("#country");
    var shapeInput = d3.select("#shape");


    // format the user search criteria
    var filterDate = dateInput.node().value;
    var filterState = stateInput.node().value;
    var filterCity = cityInput.node().value;
    var filterCountry = countryInput.node().value;
    var filterShape = shapeInput.node().value;

    // filters

    if (filterDate != ""){
        tableData = data.filter(function(address){
            var addressDate = address.datetime; 
            return addressDate === filterDate;
            });
        }
    

    if (filterDate != ""){
        tableData = data.filter(function(address){
            var addressState = address.state; 
            return addressState === filterState;
            });
        }
    

    if (filterDate != ""){
        tableData = data.filter(function(address){
            var addressCity = address.city; 
            return addressCity === filterCity;
            });
        } 
        
    

    if (filterDate != ""){
        tableData = data.filter(function(address){
            var addressCountry = address.country; 
            return addressCountry === filterCountry;
            });
        }
    

    if (filterDate != ""){
        tableData = data.filter(function(address){
            var addressShape = address.shape; 
            return addressShape === filterShape;
            });
        renderTable();}
    
}

filterBtn.on("click", handleFilterButtonClick);