$(document).ready(function() {
  var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
  
  var data = {};
  var margin = {top: 20, right: 30, bottom: 30, left: 70},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  
  var x = d3.scale.linear()
    .range([0, width]);
  
  var y = d3.scale.linear()
    .range([height, 0]);
  
  var chart = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
   .append("g")
    .attr("transform", "translate(" + margin.left +", " + margin.top + ")");
  
  $.getJSON(url, function(data) {
    var shortestTime = d3.min(data.map(function(d) {return d.Seconds;}));
    y.domain([d3.max(data.map(function(d) {return d.Place;})), 1]);
    x.domain([d3.max(data.map(function(d) {return d.Seconds - shortestTime;})),0]);
    
    chart.selectAll(".circle")
      .data(data)
     .enter().append("circle")
      .attr("class", "circle")
      .attr("cx", function(d) {return x(d.Seconds - shortestTime);})
      .attr("cy", function(d) {return y(d.Place);})
      .attr("r", 5)
  })
  
});