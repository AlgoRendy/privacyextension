/* eslint-disable eqeqeq */
import Request from "./request";
import DuckDuckGoTracker from "../resources/DuckDuckGoTracker";
import EasyPrivacyTracker from "../resources/EasyPrivacyTracker";

// eslint-disable-next-line no-extend-native
String.prototype.hashCode = function () {
  var hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

export const GraphModel = (() => {
  const graph = {
    nodes: [],
    links: {
      stylesheet: [],
      script: [],
      main_frame: [],
      image: [],
      font: [],
      other: [],
      ping: [],
      xmlhttprequest: [],
      sub_frame: [],
      csp_report: [],
      media: [],
    },
  };

  const domainName = (hostname) => hostname.split(".").slice(-2).join(".");
  const isTracker = (hostname, dataset) =>
    typeof dataset[domainName(hostname)] !== "undefined";

  const setLinksAndNodes = (links, nodes) => {
    graph.nodes = nodes;
    graph.links = links;
  };

  const getExistingNodeByHash = (hash) => {
    return graph.nodes.find((e) => e.nid === hash);
  };

  const getExistingConnectionByHash = (type, hash) => {
    return graph.links[type].find((e) => e.nid === hash);
  };

  const pushNodeInfoOrExisting = (url, inD, outD) => {
    const hash = url.hashCode();
    const existingNode = getExistingNodeByHash(hash);
    if (existingNode) {
      existingNode.in += inD;
      existingNode.out += outD;
      return existingNode;
    } else {
      const node = {
        id: url.hashCode(),
        nid: url.hashCode(),
        name: url,
        in: inD,
        out: outD,
        // Domain Specific tracker detection
        isEasyPrivacyTracker: isTracker(url, EasyPrivacyTracker),
        isDuckDuckGoTracker: isTracker(url, DuckDuckGoTracker),
      };
      graph.nodes.push(node);
      return node;
    }
  };

  const pushConnectionInfoOrExisting = (
    sourceNode,
    destinationNode,
    request
  ) => {
    const hash = (sourceNode.name + destinationNode.name).hashCode();
    const link = getExistingConnectionByHash(request.type, hash);
    if (link) {
      link.amt += 1;
    } else {
      const link = {
        id: (sourceNode.name + destinationNode.name).hashCode(),
        nid: (sourceNode.name + destinationNode.name).hashCode(),
        type: request.type,
        method: request.method,
        source: sourceNode,
        target: destinationNode,
        name: sourceNode.name + " -> " + destinationNode.name,
        data: request,
        amt: 1,
      };
      graph.links[request.type].push(link);
    }
  };

  return {
    getGraph() {
      return graph;
    },
    exportGraph() {
      // returns a deep copy
      return JSON.parse(JSON.stringify(graph));
    },
    resetGraph() {
      graph.nodes = [];
      graph.links = {
        stylesheet: [],
        script: [],
        main_frame: [],
        image: [],
        font: [],
        other: [],
        ping: [],
        xmlhttprequest: [],
        sub_frame: [],
        csp_report: [],
        media: [],
      };
    },
    loadGraph(toLgraph) {
      setLinksAndNodes(toLgraph.links, toLgraph.nodes);
    },
    addChunkToExistingGraph(chunks) {
      for (let chunk of chunks) {
        const request = new Request(chunk);
        if (!request.getReferer()) continue;
        const sourceDomain = new URL(request.getReferer()).host;
        const destinationDomain = new URL(request.url).host;
        if (
          (sourceDomain && !destinationDomain) ||
          (!sourceDomain && destinationDomain) ||
          sourceDomain == destinationDomain
        )
          continue;
        const sourceNode = pushNodeInfoOrExisting(sourceDomain, 0, 1);
        const destinationNode = pushNodeInfoOrExisting(destinationDomain, 1, 0);
        pushConnectionInfoOrExisting(sourceNode, destinationNode, request);
      }
    },
  };
})();
