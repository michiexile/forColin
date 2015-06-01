/**
 * Created by mik on 6/1/15.
 */

"use strict";

var width=800, heigh=600;
var force = d3.layout.force()
    .size([width, height])
    .charge(-400)
    .linkDistance(40)
    .on("tick", tick);

var drag = force.drag()
    .on("dragstart", dragstart);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var link = svg.selectAll(".link"),
    node = svg.selectAll(".node");

d3.json("forColin.json", function(error, graph) {
    force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();
    var link = link.data(graph.links)
        .enter().append("line")
        .attr("class", "link");
    var node = node.data(graph.nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .call(force.drag);
    node.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 40)
        .attr("height", 10);
    node.append("text")
        .attr("dx", 5)
        .text(function(d) { return d.text; });

    force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")";});
    });

});