"use strict";
function printGraph(file) {
    d3.csv(file, function(d) {
        // transform data
        d["Count"] = 1;
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
    var y1 = myChart.addMeasureAxis("y", "Count");
    y1.tickFormat = '1f';
    var y2 = myChart.addCategoryAxis("y", "LoanAverageByYearAndListingCategory");
    y2.tickFormat = '1f';
    var listings = myChart.addSeries("ListingCategory", dimple.plot.bar, [x,y1]);
    var lines = myChart.addSeries("ListingCategory", dimple.plot.line, [x,y2]);
    lines.lineMarkers = true;
    var myLegend = myChart.addLegend(1350, 100, 60, 300, "Right", lines);

    myChart.draw();
  };
