import React, { useEffect, useState } from "react";
import Graph from "graphology";
import ForceSupervisor from "graphology-layout-force/worker";
import { selectSettings } from "../../store/slices/settingsSlice";
import { useSelector } from "react-redux";
import circular from "graphology-layout/circular";
import forceAtlas2 from "graphology-layout-forceatlas2";
import FA2Layout from "graphology-layout-forceatlas2/worker";
import {
  useSigma,
  useRegisterEvents,
  useLoadGraph,
  useSetSettings,
} from "react-sigma-v2";

const CustomGraph = ({ data }) => {
  const sigma = useSigma();
  const registerEvents = useRegisterEvents();
  const loadGraph = useLoadGraph();
  const setSettings = useSetSettings();
  const settingsRedux = useSelector(selectSettings);

  const [hoveredNode, setHoveredNode] = useState({
    hoveredNode: undefined,
    hoverNeighbours: undefined,
  });
  const isTracker = (data) => {
    switch (settingsRedux.trackingTruth) {
      case "Both":
        return data.isEasyPrivacyTracker && data.isDuckDuckGoTracker;
      case "EasyPrivacy":
        return data.isEasyPrivacyTracker;
      default:
        return data.isDuckDuckGoTracker;
    }
  };

  useEffect(() => {
    const graph = new Graph({ multi: true });
    data.nodes.forEach((node) => {
      graph.mergeNode(node.id, {
        nodeType: "company",
        label: node.name,
        size: 4,
        color: isTracker(node)
          ? settingsRedux.nodeColors.tracking
          : settingsRedux.nodeColors.ntracking,
      });
    });
    for (let linkType of Object.keys(data.links)) {
      data.links[linkType].forEach((link) => {
        graph.mergeEdgeWithKey(
          link.source.id + "=>" + link.target.id,
          link.source.id,
          link.target.id,
          {
            weight: 1 + link.amt / 50,
            size: 1,
            type: "arrow",
          }
        );
      });
    }
    circular.assign(graph);
    const settings = forceAtlas2.inferSettings(graph);
    forceAtlas2.assign(graph, { settings, iterations: 600 });
    loadGraph(graph);
  }, [loadGraph, data]);

  useEffect(() => {
    registerEvents({
      enterNode: ({ node }) => {
        setHoveredNode({
          hoveredNode: node,
          hoverNeighbours: undefined,
        });
      },
      eaveNode: () => {
        setHoveredNode({
          hoveredNode: undefined,
          hoverNeighbours: undefined,
        });
      },
    });
  }, [sigma, registerEvents, data]);

  return null;
};
export default CustomGraph;
