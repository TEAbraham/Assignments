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
  tbody.html= "";
  for (var i = 0; i < tableData.length; i++) {
    
    var address = tableData[i];
    console.log(address)
    var fields = Object.keys(address);
    
    var row = tbody.append('tr');
    for (var j = 0; j < fields.length; j++) {
      
      var field = fields[j];
      var cell = tbody.append('td');
      cell.text = address[field];
    }
  }
}

// render initial table
renderTable();

function handleFilterButtonClick() {
  // format the user search criteria
  var filterDate = dateInput.value;
  var filterState = stateInput.value.trim().toLowerCase();
  var filterCity = cityInput.value.trim().toLowerCase();
  var filterCountry = countryInput.value.trim().toLowerCase();
  var filterShape = shapeInput.value.trim().toLowerCase();

  // filters
  switch (true){
  case condition1:
    if (filterDate != "")
    {
    tableData = data.filter(function(address) 
    {
        var addressDate = address.datetime; 
        return addressDate === filterDate;
    });
    }
    break;
  case condition2:
    if (filterState != "")
    {
    tableData = tableData.filter(function(address)
    {
        var addressState = address.state;
        return addressState === filterState;
    });
    }
    break;
  case conditon3:
    if (filterCity != "")
    {
    tableData = tableData.filter(function(address)
    {
        var addressCity = address.city;
        return addressCity === filterCity;
    });
    }
    break;
  case condition4:
    if (filterCountry != "")
    {
    tableData = tableData.filter(function(address)
    {
        var addressCountry = address.country;
        return addressCountry === filterCountry;
    });
    }
    break;
  case condition5:
    if (filterShape != "")
    {
    tableData = tableData.filter(function(address)
    {
        var addressShape = address.shape;
        return addressShape === filterShape;
    });
    }
    break;
  default:
    {tableData=tableData};
    }
}

