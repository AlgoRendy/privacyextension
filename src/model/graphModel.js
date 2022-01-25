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
      const toExport = JSON.parse(JSON.stringify(graph));
      toExport.nodes.forEach((node) => {
        delete node.vx;
        delete node.vy;
        delete node.x;
        delete node.y;
      });
      for (let linkType in toExport.links) {
        if (toExport.links[linkType].length <= 0) continue;
        toExport.links[linkType].forEach((link) => {
          delete link.source.vx;
          delete link.source.vy;
          delete link.source.x;
          delete link.source.y;
          delete link.target.vx;
          delete link.target.vy;
          delete link.target.x;
          delete link.target.y;
        });
      }
      return JSON.stringify(toExport);
    },
    importGraph(imGraph) {
      try {
        if (
          imGraph.hasOwnProperty("nodes") &&
          imGraph.hasOwnProperty("links")
        ) {
          for (let node of imGraph.nodes) {
            let existingNode = getExistingNodeByHash(node.nid);
            if (existingNode) {
              existingNode.in += node.in;
              existingNode.out += existingNode.out;
            } else {
              graph.nodes.push(node);
            }
          }
          for (let linkType in imGraph.links) {
            if (imGraph.links[linkType].length == 0) continue;
            for (let link of imGraph.links[linkType]) {
              let existingConnection = getExistingConnectionByHash(
                linkType,
                link.nid
              );
              if (existingConnection) {
                existingConnection.amt += link.amt;
              } else {
                link.data = new Request(link.data);
                link.source = getExistingNodeByHash(link.source.nid);
                link.target = getExistingNodeByHash(link.target.nid);
                graph.links[linkType].push(link);
              }
            }
          }
        } else {
          this.addChunkToExistingGraph(imGraph);
        }
      } catch (e) {
        console.error(e);
      }
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
    addChunkToExistingGraph(chunks) {
      for (let chunk of chunks) {
        const request = new Request(chunk);
        if (!request.getReferer()) continue;
        const sourceDomain = new URL(request.getInitiator()).host;
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
    getTotalNodes() {
      return graph.nodes.length;
    },
    getTotalLinks() {
      var num = 0;
      for (let links of Object.values(graph.links)) {
        num += links.length;
      }
      return num;
    },
    getEasyPrivcay() {
      return graph.nodes.filter((x) => x.isEasyPrivacyTracker).length;
    },
    getDuckDuckGo() {
      return graph.nodes.filter((x) => x.isDuckDuckGoTracker).length;
    },
  };
})();
