// Set up our chart
var svgWidth = 1011;
var svgHeight = 777;
var margin = { top: 30, right: 40, bottom: 100, left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


// Create an SVG wrapper, append an svg that will hold our chart and shift the latter by left and top margins

var svg = d3.select(".chart")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// append an svg group
var chart = svg.append("g");

d3.select(".chart").append("div").attr("class", "tooltip").style("opacity", 0);

d3.csv("https://aqs.epa.gov/api/rawData?user=thomas.e.abraham@gmail.com&pw=khakiosprey52&format=AQCSV&param=81102&bdate=20180601&edate=20180608&state=17&county=031", function(error1, data1) {
    d3.csv("https://aqs.epa.gov/api/rawData?user=thomas.e.abraham@gmail.com&pw=khakiosprey52&format=AQCSV&param=44201&bdate=20180601&edate=20180608&state=17&county=031", function(error2, data2) {
        d3.csv("https://aqs.epa.gov/api/rawData?user=thomas.e.abraham@gmail.com&pw=khakiosprey52&format=AQCSV&param=42101&bdate=20180601&edate=20180608&state=17&county=031", function(error3, data3) {

            PM10=data1
            O3=data2
            CO=data3

            console.log(PM10)
            console.log(O3)
            console.log(CO)

        });
    });
});

