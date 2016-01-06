// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

var x = d3.scale.linear().range([0, width])
var y = d3.scale.linear().range([height, 0])

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom")
    .tickFormat(d3.format("d"))
    .tickSubdivide(0);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

window.onload = function(){

// Adds the svg
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

d3.json('/data/time6.json',function(err, data){

    // Scale the range of the data

    x.domain([0,data.jack.length]);
    y.domain(d3.extent(data.jack)).nice();

    // Add the Jacks times.
    svg.selectAll('.jack')
      .data(data.jack).enter().append("circle")
      .attr('class', 'jack')
      .attr('r', 5)
      .attr('cx', function(d,i){ return x(i+1) })
      .attr('cy', function(d,i){ return y(d) })

    // Add the Chris' times.
    svg.selectAll('.chris')
      .data(data.chris).enter().append("circle")
      .attr('class', 'chris')
      .attr('r', 5)
      .attr('cx', function(d,i){ return x(i+1) })
      .attr('cy', function(d,i){ return y(d) })

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
})

}
