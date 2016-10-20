"use strict";
function printGraph(file) {
    d3.csv(file, function(d) {
        // transform data
        return d;
    }, draw);
}

function draw(data) {
    // Page layout
    var margin = 125,
        width = 1400 - margin,
        height = 600 - margin,
        radius = 3,
        color = "blue";
    d3.select("body")
        .append("h2")
        .text("Loans granted and amount average during crisis in USA");
    // Chart layout
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin)
        .append('g')
        .attr('class','chart');
    var filteredData = dimple.filterData(data, "ListingCategory", ["Medical/Dental", "Vacation", "Business"]);
    filteredData = dimple.filterData(filteredData, "Year", ["2006","2007","2008","2009","2010","2011","2012","2013"]);
    var myChart = new dimple.chart(svg, filteredData);
    var x = myChart.addCategoryAxis("x", ["Year", "ListingCategory"]);
    var y1 = myChart.addMeasureAxis("y", "LoanCountByYearAndListingCategory");
    y1.tickFormat = '1f';
    var y2 = myChart.addMeasureAxis("z", "LoanOriginalAmount");
    y2.tickFormat = '1f';
    var bubbles = myChart.addSeries("ListingCategory", dimple.plot.bubble);
    bubbles.aggregate = dimple.aggregateMethod.avg;
    bubbles.afterDraw = function (shp, d) {
      var shape = d3.select(shp);
      svg.append("text")
          .attr("x", parseFloat(shape.attr("cx")))
          .attr("y", parseFloat(shape.attr("cy")) + 4)
          .style("text-anchor", "middle")
          .style("font-size", "10px")
          .style("font-family", "sans-serif")
          .style("opacity", 0.7)
          .text(Math.round(d.zValue));
    };
    var myLegend = myChart.addLegend(1350, 100, 60, 300, "Right", bubbles);
    myChart.draw();
  };
