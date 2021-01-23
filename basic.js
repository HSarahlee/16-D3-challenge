// Create a scatter plot (Health care vs Poverty or Smokers vs Age)

// Set up the svgChart
let svgWidth = 960;
let svgHeight = 500;

let margin = {
    top: 20, 
    right: 40,
    bottom: 60,
    left: 200
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// Create a SVG wrappper
let svg = d3.select("body")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)

// Append the  SVG group
let chartGroup = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data
d3.csv("data.csv").then(function(data) {

   
    

    // Create scale functions 
    let xLinearScale = d3.scaleLinear()
                         .domain([d3.min(data, d => d.poverty) -1, d3.max(data, d => d.poverty)])
                         .range([0, width]);
    
    let yLinearScale = d3.scaleLinear()
                         .domain([0, d3.max(data, d => d.healthcare) +2 ])
                         .range([height, 0]);

    // Create axis function 
    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    // Append axes to the chart
    chartGroup.append("g")
              .attr("transform", `translate(0, ${height})`)
              .call(bottomAxis);
    
    chartGroup.append("g")
              .call(leftAxis);

    // Create axes labels
    chartGroup.append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 0 - margin.left + 140)
              .attr("x", 0 - (height/1.6))
              .attr("dy", "1em")
              .attr("class", "axisText")
              .text("In Poverty (%)")

    chartGroup.append("text")
              .attr("transform", `translate(${width / 2.3}, ${height + margin.top + 40})`)
              .attr("class", "axisText")
              .text("Lacks Healthcare (%)")
              
    // Create circles
    let circlesGroup = chartGroup.selectAll("circle")
                                 .data(data)
                                 .enter()
                                 .append("circle")
                                 .attr("cx", d => xLinearScale(d.poverty))
                                 .attr("cy", d => yLinearScale(d.healthcare))
                                 .attr("r", "18")
                                 .attr("fill", "steelblue")
                                 .attr("opacity", "0.7")


    // Display stat abbrs in the circle
    let circleAbbr = chartGroup.selectAll("text")
                           .exit()
                           .data(data)
                           .enter()
                           .append("text")
                           .text((d => d.abbr))
                           .attr("x", function (d) {return xLinearScale(d.poverty);})
                           .attr("y", function (d) {return yLinearScale(d.healthcare);})
                           .attr("text-anchor", "middle")
                           .attr("font-size", "10px")
                           .attr("fill", "white");

})


 

     







   

                    

                    
                    