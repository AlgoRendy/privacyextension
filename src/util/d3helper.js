import * as d3 from "d3";

export const drag = (simulation) => {
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d, event) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d, event) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3
    .drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
};

export const zoom = (root) => {
  return d3
    .zoom()
    .scaleExtent([0.001, 20])
    .on("zoom", function () {
      d3.select(root).attr("transform", d3.event.transform);
    });
};

export const colors = (range) => {
  return d3.scaleOrdinal().domain(d3.range(range)).range(d3.schemeCategory10);
};
// updates the diagram each frame
export const tick = () => {
  d3.selectAll(".nodes")
    .attr("cx", function (d) {
      return d.x;
    })
    .attr("cy", function (d) {
      return d.y;
    });

  d3.selectAll("line")
    .attr("x1", function (d) {
      return d.source.x;
    })
    .attr("y1", function (d) {
      return d.source.y;
    })
    .attr("x2", function (d) {
      return d.target.x;
    })
    .attr("y2", function (d) {
      return d.target.y;
    });
};
