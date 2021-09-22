/* eslint-disable no-undef */
import { useEffect, useRef } from "react";
import React from "react";
import { linkColor } from "../../util/constants";
// import testData from "../../test.json";
import * as d3 from "d3";

import { drag, zoom, tick } from "../../util/d3helper";
import { useSelector } from "react-redux";
import { selectFilter } from "../../store/slices/filterSlice";
import { GraphModel } from "../../util/graphModel";
import { selectGraph } from "../../store/slices/graphSlice";
import { selectSettings } from "../../store/slices/settingsSlice";

export default function Graph({ isDebug = false }) {
  const filter = useSelector(selectFilter);
  const graph = useSelector(selectGraph);
  const settings = useSelector(selectSettings);
  const svg = useRef();
  const root = useRef();

  // runs when
  useEffect(() => {
    const isTracker = (data) => {
      switch (settings.trackingTruth) {
        case "Both":
          return data.isEasyPrivacyTracker && data.isDuckDuckGoTracker;
        case "EasyPrivacy":
          return data.isEasyPrivacyTracker;
        default:
          return data.isDuckDuckGoTracker;
      }
    };
    //adds zoom
    d3.select(svg.current).call(zoom(root.current));
    const currentGraph = GraphModel.getGraph();
    const simulation = d3
      .forceSimulation()
      .force("link", d3.forceLink())
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(100 / 2, 100 / 2));
    d3.select(root.current).call(drag(simulation));
    simulation.nodes(currentGraph.nodes);
    simulation
      .force("link")
      .links(
        Object.values(currentGraph.links).reduce((x, y) => x.concat(y), [])
      );
    d3.select(".nodes-container")
      .selectAll("circle")
      .data(currentGraph.nodes, (d) => d.nid)
      .join("circle")
      .attr("class", "nodes")
      .attr("r", (d) => d.in / 30 + 5)
      .attr("fill", function (d, i) {
        return isTracker(d)
          ? settings.nodeColors.tracking
          : settings.nodeColors.ntracking;
      })
      .call(drag(simulation));

    for (let linkType of Object.keys(currentGraph.links)) {
      d3.select(".links-" + linkType)
        .selectAll("line")
        .data(currentGraph.links[linkType], (d) => d.nid)
        .join("line")
        .attr("class", "link-" + linkType)
        .attr("class", "link")
        .attr("stroke", function () {
          return settings.linkColors[linkType];
        })
        .attr("stroke-width", (d) => 1 + d.amt / 50)
        .call(drag(simulation));
    }
    simulation.on("tick", tick);
    simulation.alpha(0.3).restart();
  }, [graph, settings]);

  useEffect(() => {
    d3.selectAll(".nodes")
      .filter((d) => d.name.includes(filter.search.value))
      .transition(500)
      .style("opacity", 1);
    d3.selectAll(".nodes")
      .filter((d) => !d.name.includes(filter.search.value))
      .transition(500)
      .style("opacity", 0.1);
    d3.selectAll(".link")
      .filter((d) => d.data.isFiltered(filter))
      .transition(500)
      .style("stroke-opacity", 1);
    d3.selectAll(".link")
      .filter((d) => !d.data.isFiltered(filter))
      .transition(500)
      .style("stroke-opacity", 0);
  }, [filter]);

  return (
    <svg id="graph" ref={svg} width="100%" height="100%">
      <g ref={root}>
        <g>
          {Object.keys(linkColor).map((x, i) => (
            <g key={i} className={"links-" + x} />
          ))}
        </g>
        <g className="nodes-container" />
      </g>
    </svg>
  );
}
