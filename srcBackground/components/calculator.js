/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const Graph = require("graphology");
module.exports = Calculator = (() => {
  const graph = new Graph();
  let port = undefined;

  chrome.runtime.onConnect.addListener((connectedPort) => {
    console.log("Front-End Connected");
    port = connectedPort;
  });

  const updateNode = (name, inDeg, outDeg) => {
    if (graph.hasNode(name)) {
      graph.updateNodeAttribute(sourceDomainId, "in", (n) => n + inDeg);
      graph.updateNodeAttribute(sourceDomainId, "out", (n) => n + outDeg);
    } else {
      currentGraph.addNode(sourceDomainId, {
        nodeType: "company",
        label: name,
        size: 4,
        color: "#ff0000",
        in: inDeg,
        out: outDeg,
      });
    }
  };

  const updateLink = (source, target, request) => {
    const edge = source + "->" + target;
    if (
      graph.hasEdge(edge) &&
      graph.getEdgeAttribute(edge, "method") === request.method
    ) {
      graph.updateEdgeAttribute(edge, "amt", (n) => n + 1);
    } else {
      graph.addEdge(source, target, {
        amt: 1,
        type: request.type,
        method: request.method,
      });
    }
  };

  return {
    addToGraph: ({ requests }) => {
      requests.forEach((request) => {
        if (!initiator) return;
        const sourceDomain = new URL(request.initiator).host;
        const destinationDomain = new URL(request.url).host;
        // We only want to look at crosssite requests
        if (
          (sourceDomain && !destinationDomain) ||
          (!sourceDomain && destinationDomain) ||
          sourceDomain === destinationDomain
        )
          return;
        updateNode(sourceDomain, 0, 1);
        updateNode(sourceDomain, 1, 0);
        updateLink(sourceDomain, destinationDomain, request);
        console.log(graph);
      });
    },
  };
})();
