var r = 960,
    format = d3.format(",d"),
    fill = d3.scale.category20c();

    var bubble = d3.layout.pack()
    .sort(null)
    .size([r, r])
    .padding(1.5);

    var vis = d3.select("#chart").append("svg")
    .attr("width", r)
    .attr("height", r)
    .attr("class", "bubble");

    d3.json("stats.json", function(json) {
        var node = vis.selectAll("g.node")
        .data(bubble.nodes({children:json})
            .filter(function(d) { return !d.children; }))
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("title")
        .text(function(d) { return d.domain });

    node.append("circle")
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) { return fill(d.domain); });

    node.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".3em")
        .text(function(d) { return d.domain.substring(0, d.r / 3); });
    });

