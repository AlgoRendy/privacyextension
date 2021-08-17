/* eslint-disable no-undef */
import { useEffect, useRef, useState } from "react";
import React from "react";
import { linkColor } from "../../util/constants";
import testData from "../../test.json";
import * as d3 from "d3";

import GraphModelFactory from "../../util/GraphModelFactory";
import { drag, zoom, colors, tick } from "../../util/d3helper";
import { useSelector } from "react-redux";
import { selectFilter } from "../../store/slices/filterSlice";

const updateIntervalMs = 5000;

export default function Graph({ isDebug = false }) {
  // filter from store
  const filter = useSelector(selectFilter);
  // The data state
  const [data, setData] = useState(
    isDebug
      ? GraphModelFactory.convertBrowsingDataToJSONGraph(testData)
      : { nodes: [], links: [] }
  );

  // HttpRequests from the chrome browser
  const httpRequests = useRef([]);

  // buffers requests
  const buffer = useRef([]);

  const svg = useRef();
  const root = useRef();

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

  useEffect(() => {
    if (!isDebug) {
      var port = chrome.extension.connect({ name: "HttpRequests" });
      port.onMessage.addListener(function (requests) {
        console.log(requests);
        buffer.current = buffer.current.concat(requests);
        httpRequests.current = httpRequests.current.concat(buffer.current);
        if (buffer.current.length > 0) {
          const [new_graph, update] = GraphModelFactory.addToExistingGraph(
            buffer.current,
            data
          );
          update && setData(new_graph);
          buffer.current = [];
        }
      });
      const interval = setInterval(() => {
        if (port) {
          port.postMessage("ping");
        }
      }, updateIntervalMs);
      return () => clearInterval(interval);
    }
  }, [data, isDebug]);
  // initial effect
  useEffect(() => {
    //adds zoom
    d3.select(svg.current).call(zoom(root.current));
    // adds navigatable background
  }, []);

  useEffect(() => {
    try {
      if (
        (data !== null || data !== undefined) &&
        "nodes" in data &&
        "links" in data
      ) {
        const simulation = d3
          .forceSimulation()
          .force("link", d3.forceLink())
          .force("charge", d3.forceManyBody())
          .force("center", d3.forceCenter(100 / 2, 100 / 2));
        d3.select(root.current).call(drag(simulation));
        simulation.nodes(data.nodes);
        simulation
          .force("link")
          .links(Object.values(data.links).reduce((x, y) => x.concat(y), []));
        let color = colors(data.nodes.length);

        d3.select(".nodes-container")
          .selectAll("circle")
          .data(data.nodes, (d) => d.nid)
          .join("circle")
          .attr("class", "nodes")
          .attr("r", 5)
          .attr("fill", function (d, i) {
            return color(i);
          })
          .call(drag(simulation));

        for (let linkType of Object.keys(data.links)) {
          d3.select(".links-" + linkType)
            .selectAll("line")
            .data(data.links[linkType], (d) => d.nid)
            .join("line")
            .attr("class", "link-" + linkType)
            .attr("class", "link")
            .attr("stroke", function () {
              return linkColor[linkType];
            })
            .attr("stroke-width", 1)
            .call(drag(simulation));
        }
        simulation.on("tick", tick);
        simulation.alpha(0.3).restart();
      }
    } catch (e) {
      console.log(e);
    }
  }, [data]);

  return (
    <svg ref={svg} width="100%" height="100%">
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
