$(document).ready(function() {
  var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
  
  var data = {};
  var margin = {top: 10, right: 100, bottom: 40, left: 70},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  
  var x = d3.scale.linear()
    .range([0, width]);
  
  var y = d3.scale.linear()
    .range([height, 0]);
  
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(5)
  
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(8)
  
  var tip = d3.tip()
    .attr('class', 'tip')
    .offset([-30, 0])
    .html(function(d) {
      return "<div>"+ d.Name + " : " + d.Nationality + "</div><div>Year: " + d.Year + ", Time: " + d.Time + "</div><div>" + d.Doping + "</div>";
    });
  
  var chart = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
   .append("g")
    .attr("transform", "translate(" + margin.left +", " + margin.top + ")");
  
  chart.call(tip)
  
  $.getJSON(url, function(data) {
    var shortestTime = d3.min(data.map(function(d) {return d.Seconds;}));
    y.domain([d3.max(data.map(function(d) {return d.Place;})) + 1, 1]);
    x.domain([d3.max(data.map(function(d) {return d.Seconds - shortestTime;})) + 5,0]);
    
    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
     .append("text")
      .text("Seconds Behind Fastest Time")
      .attr("x", width/2 - margin.left)
      .attr("y", 35);
    
    chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
     .append("text")
      .attr("transform", "rotate(-90)")
      .attr("dy", ".71em")
      .attr("y", 6)
      .style("text-anchor", "end")
      .text("Ranking");
    
    chart.selectAll(".circle")
      .data(data)
     .enter().append("circle")
      .attr("class", "circle")
      .attr("cx", function(d) {return x(d.Seconds - shortestTime);})
      .attr("cy", function(d) {return y(d.Place);})
      .attr("r", 5)
      .attr("fill", function(d) {
        if (d.Doping === "") return "black";
        return "red";
      })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
    
    chart.selectAll(".text")
      .data(data)
     .enter().append("text")
      .attr("class", "text")
      .attr("x", function (d) {return x(d.Seconds - shortestTime - 3);})
      .attr("y", function (d) {return y(d.Place + 0.2);})
      .text(function(d) {return d.Name;})
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px");
    
    chart.append("circle")
        .attr("cx", 600)
        .attr("cy", 300)
        .attr("r", 5);
    
    chart.append("circle")
        .attr("cx", 600)
        .attr("cy", 250)
        .attr("r", 5)
        .attr("fill", "red");
    
    chart.append("text")
        .attr("x", 620)
        .attr("y", 255)
        .text("Riders with doping allegations");
    
    chart.append("text")
        .attr("x", 620)
        .attr("y", 305)
        .text("No doping allegations.");
  })
  
});