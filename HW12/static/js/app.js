// // from data.js
// var tableData = data;

// // // tbody, inputs and button
// var tbody = d3.select("tbody");
// var filterBtn = d3.select("#filter-btn");

// renderTable
function renderTable() {
    filteredTable.forEach(function(ufo){
        console.log(ufo);
        var row = tbody.append("tr");
        Object.entries(ufo).forEach(function([key, value]) {
          console.log(key, value);
          var cell = tbody.append("td");
          cell.text(value);
        });
      });
  }

// // render initial table
// renderTable();

// function handleFilterButtonClick() {
    
//     console.log("Filtered Return")
//     d3.event.preventDefault();
//     d3.event.target.value.trim().toLowerCase();

//     // // tbody, inputs and button
//     var dateInput = document.getElementById("#datetime");
//     var stateInput = document.getElementById("#state");
//     var cityInput = document.getElementById("#city");
//     var countryInput = document.getElementById("#country");
//     var shapeInput = document.getElementById("#shape");


//     // format the user search criteria
//     var filterDate = dateInput.value;
//     var filterState = stateInput.value;
//     var filterCity = cityInput.value;
//     var filterCountry = countryInput.value;
//     var filterShape = shapeInput.value;

//     // filters

//     if (filterDate != ""){
//         tableData = data.filter(function(address){
//             var addressDate = address.datetime; 
//             return addressDate === filterDate;
//             });
//         }
    

//     if (filterDate != ""){
//         tableData = data.filter(function(address){
//             var addressState = address.state; 
//             return addressState === filterState;
//             });
//         }
    

//     if (filterDate != ""){
//         tableData = data.filter(function(address){
//             var addressCity = address.city; 
//             return addressCity === filterCity;
//             });
//         } 
        
    

//     if (filterDate != ""){
//         tableData = data.filter(function(address){
//             var addressCountry = address.country; 
//             return addressCountry === filterCountry;
//             });
//         }
    

//     if (filterDate != ""){
//         tableData = data.filter(function(address){
//             var addressShape = address.shape; 
//             return addressShape === filterShape;
//             });
//         renderTable();}
    
// }

// filterBtn.on("click", handleFilterButtonClick);

// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#datetime");
var $stateInput = document.querySelector("#state");
var $filterBtn = document.querySelector("#filter-btn");
var $cityInput = document.querySelector("#city");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");


// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$filterBtn.addEventListener("click", handleFilterButtonClick);

// Set filteredAddresses to dataSet initially
var filteredTable = data;

// // renderTable renders the filteredAddresses to the tbody
// function renderTable() {
//   $tbody.innerHTML = "";
//   for (var i = 0; i < filteredTable.length; i++) {
//     // Get get the current address object and its fields
//     var address = filteredTable[i];
//     console.log(address)
//     var fields = Object.keys(address);
//     // Create a new row in the tbody, set the index to be i + startingIndex
//     var $row = $tbody.insertRow(i);
//     for (var j = 0; j < fields.length; j++) {
//       // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
//       var field = fields[j];
//       var $cell = $row.insertCell(j);
//       $cell.innerText = address[field];
//     }
//   }
// }

// Render the table for the first time on page load
renderTable();

function handleFilterButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string

  var filterDate = $dateInput.value;
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();

  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  if (filterDate != "")
  {
    filteredTable = dataSet.filter(function(address) 
    {
      var addressDate = address.datetime; 
    
    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
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

//Add pagination to the table to show 10 -100 entries per page

$(document).ready(function() {
  $('#ufo-table').DataTable();
});