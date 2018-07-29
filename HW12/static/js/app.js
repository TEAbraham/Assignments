// from data.js
var tableData = data;

// tbody, inputs and button
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#datetime");
var $stateInput = document.querySelector("#state");
var $cityInput = document.querySelector("#city");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $filterBtn = document.querySelector("#filter-btn");


// event listener for searchButton
$filterBtn.addEventListener("click", handleFilterButtonClick);

// renderTable
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < tableData.length; i++) {
    
    var address = tableData[i];
    console.log(address)
    var fields = Object.keys(address);
    
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = address[field];
    }
  }
}

function handleFilterButtonClick() {
  // format the user search criteria
  var filterDate = $dateInput.value;
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();

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
  

  if(filterState != "")
  {
    tableData = tableData.filter(function(address)
    {
      var addressState = address.state;
      return addressState === filterState;
    });
  }
  else{tableData};

  if(filterCity != "")
  {
    tableData = tableData.filter(function(address)
    {
      var addressCity = address.city;
      return addressCity === filterCity;
    });
  }

  else{tableData};

  if(filterCountry != "")
  {
    tableData = tableData.filter(function(address)
    {
      var addressCountry = address.country;
      return addressCountry === filterCountry;
    });
  }
  else{tableData};

  if(filterShape != "")
  {
    tableData = tableData.filter(function(address)
    {
      var addressShape = address.shape;
      return addressShape === filterShape;
    });
  }
  else{tableData};

}

// render initial table
renderTable();


// $(document).ready(function() {
//   $('#ufo-table').DataTable();
// });
