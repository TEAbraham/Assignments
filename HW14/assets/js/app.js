// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
var padding = 25;
var formatPercent = d3.format('.2%');

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chart = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.select(".chart")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Load data f
d3.csv("assets/data/data.csv", function(error, censusData) {
  for (var i = 0; i < censusData.length; i++){
        
        console.log(censusData[i].abbr)
  } 
  if (error) throw error;
  censusData.forEach(function(d) {

      d.poverty = +d.poverty;
      d.healthcare = +d.healthcare;

  
  });
  // Scale the range of the data
  var x = d3.scaleLinear().range([0, width]);

// Create a linear scale, with a range between the height and 0.
  var y= d3.scaleLinear().range([height, 0]);

  var xAxis = d3.axisBottom(x);

  var yAxis = d3.axisLeft(y);



  var xValue = function(d) { return x(d.poverty);};
  var yValue = function(d) { return y(d.healthcare);};

// var xValueline =d3.line()
    //.x(function(d) { return x(d.poverty); }),

//var yvalueline = d3.line()
   // .y(function(d) { return y(d.healthcare); });

  // var colorValue = function(d) { return d.abbr;},

  // color = d3.schemeCategory10;
 
  //xScale = x
      //.domain([d3.min(censusData, xValue)-1, d3.max(censusData, xValue)+1])
       //.range([0,width]);
  
  //yScale = y
      //.domain([d3.min(censusData, yValue)-1, d3.max(censusData, yValue)+1])
      //.range([height,0]);

  function findMinAndMax(i) {
        xMin = d3.min(censusData, function(d) {
            return +d[i] * 0.8;
        });

        xMax =  d3.max(censusData, function(d) {
            return +d[i] * 1.1;
        });

        yMax = d3.max(censusData, function(d) {
            return +d.healthcare * 1.1;
        });
  };
    
  var currentAxisXLabel = "poverty";

    // Call findMinAndMax() with 'poverty' as default
  findMinAndMax(currentAxisXLabel);

    // Set the domain of an axis to extend from the min to the max value of the data column
  xScale=x.domain([xMin, xMax]);
  yScale=y.domain([0, yMax]);
      
  // Add the scatterplot
  var toolTip = d3.tip()
        .attr("class", "tooltip")
        .html(function(d) {
            var state = d.state;
            var poverty = +d.poverty;
            var healthcare = +d.healthcare;
            return (state + "<br> Poverty: " + poverty + "%<br>Healthcare: " + healthcare + "%");
      });

  chart.call(toolTip);
                


  // Circles
  var circles = chart.selectAll('circle')

  circles.data(censusData)
        .enter().append('circle')
        .attr("class", "circle")
        .attr("cx", function(d) {
            return x(+d[currentAxisXLabel]);
        })
        .attr("cy", function(d) {
            return y(d.healthcare);
        })   
        .attr('r','10')
        .attr('stroke','black')
        .attr('stroke-width',1)
        .style('fill', "green")
        .on("mouseover", function(d) {
          toolTip.show(d);
        })
        .on("mouseout", function(d) {
          toolTip.hide(d);
        });              
     
  
    // Add Text Labels
  circles.data(censusData)
        .enter().append('text')
        .attr("x", function(d) {
          return x(+d[currentAxisXLabel]);
      })
        .attr("y", function(d) {
          return y(d.healthcare);
      })
        .attr("class", "circleText")
        .attr("text-anchor", "middle")
        .text(function(d){
            return d.abbr;})
  
  
    // X-axis
  xAxis = d3.axisBottom(x);


  chart.append("g")
       .attr("class", "x axis")
       .attr("transform", `translate(0,${height})`)
       .call(xAxis);
    

  chart.append("text")
       .attr("class", "label")
       .attr("transform", `translate(${width / 2},${height - margin.top+ 60})`)
       .style("text-anchor", "middle")
       .text('Poverty');

  // Y-axis
  yAxis = d3.axisLeft(y);
            
  chart.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${padding},0)`)
        .call(yAxis);       
                
 
  chart.append("text")
       .attr("class", "label")
       .attr("transform", "rotate(-90)")
       .attr("y", 0 - (margin.left))
       .attr("x", 0 - (height/ 2))
       .attr("dy", "1em")
       .style("text-anchor", "middle")
       .text('Healthcare');
});
