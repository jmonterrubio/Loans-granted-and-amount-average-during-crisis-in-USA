"use strict";
function printGraph(file) {
    d3.csv(file, function(d) {
        // transform data
        return d;
    }, draw);
}

function draw(data) {
    // Page layout
    var margin = 155,
        width = 1450 - margin,
        height = 600 - margin,
        radius = 3,
        color = "blue";
    d3.select("body")
        .append("h2")
        .text("Loans granted and average amount during crisis in USA");
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
    x.title = "Year / Listing Category";
    var y1 = myChart.addMeasureAxis("y", "LoanCountByYearAndListingCategory");
    y1.tickFormat = '1f';
    y1.title = "Number of loans granted";
    var y2 = myChart.addMeasureAxis("z", "LoanOriginalAmount");
    y2.tickFormat = '1f';
    y2.title = "Amount average";
    var bubbles = myChart.addSeries("ListingCategory", dimple.plot.bubble);
    bubbles.aggregate = dimple.aggregateMethod.avg;

    // Override tooltip
    bubbles.getTooltipText = function (e) {
        return [
            e.aggField[0] + " category in " + e.cx + ":",
            e.cy  + " loans granted",
            parseInt(e.cz)  + "$ average amount"
        ];
    };

    var myLegend = myChart.addLegend(1400, 100, 60, 300, "Right", bubbles);
    myChart.defaultColors = [
        new dimple.color("#3498db", "#2980b9", 1), // blue
        new dimple.color("#e74c3c", "#c0392b", 1), // red
        new dimple.color("#2ecc71", "#27ae60", 1)  // green
    ];
    myChart.draw();
    myChart.legends = [];
    // This block simply adds the legend title. I put it into a d3 data
    // object to split it onto 2 lines.  This technique works with any
    // number of lines, it isn't dimple specific.
    svg.selectAll("title_text")
        .data(["Click legend to", "show/hide category:"])
        .enter()
        .append("text")
        .attr("x", 1350)
        .attr("y", function (d, i) { return 80 + i * 14; })
        .style("font-family", "sans-serif")
        .style("font-size", "10px")
        .style("color", "Black")
        .text(function (d) { return d; });

    // Get a unique list of Owner values to use when filtering
    var filterValues = dimple.getUniqueValues(filteredData, "ListingCategory");
    // Get all the rectangles from our now orphaned legend
    myLegend.shapes.selectAll("rect")
      .on("click", function (e) {
        // This indicates whether the item is already visible or not
          var hide = false;
          var newFilters = [];
          // If the filters contain the clicked shape hide it
          filterValues.forEach(function (f) {
              if (f === e.aggField.slice(-1)[0]) {
                  hide = true;
              } else {
                  newFilters.push(f);
                }
          });
          // Hide the shape or show it
          if (hide) {
              d3.select(this).style("opacity", 0.2);
          } else {
              newFilters.push(e.aggField.slice(-1)[0]);
              d3.select(this).style("opacity", 0.8);
          }
          // Update the filters
          filterValues = newFilters;
          // Filter the data
          myChart.data = dimple.filterData(filteredData, "ListingCategory", filterValues);
          // Passing a duration parameter makes the chart animate. Without
          // it there is no transition
          myChart.draw(800);
      });
};
