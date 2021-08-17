/* eslint-disable eqeqeq */
import Request from "./Request";

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

export default class GraphModelFactory {
  static addToExistingGraph(chunks, graph) {
    var newgraph =
      graph === null || graph === undefined
        ? { nodes: [], links: {} }
        : JSON.parse(JSON.stringify(graph));

    for (let chunk of chunks) {
      var request = new Request(chunk);

      if (chunk.initiator) {
        var source_domain = new URL(request.source).host;
        var url_domain = new URL(request.url).host;

        if (source_domain == url_domain) {
          continue;
        }
        if (source_domain && url_domain) {
          let domainNode = {
            nid: source_domain.hashCode(),
            name: source_domain,
          };
          let urlNode = { nid: url_domain.hashCode(), name: url_domain };
          if (!GraphModelFactory.nodeExists(domainNode, newgraph.nodes)) {
            newgraph.nodes.push(domainNode);
          }
          if (!GraphModelFactory.nodeExists(urlNode, newgraph.nodes)) {
            newgraph.nodes.push(urlNode);
          }
          if (
            !GraphModelFactory.connectionExists(
              source_domain.hashCode(),
              url_domain.hashCode(),
              newgraph.links,
              request
            )
          ) {
            if (!newgraph.links[request.type]) {
              newgraph.links[request.type] = [];
            }
            newgraph.links[request.type].push({
              nid: source_domain.hashCode() + url_domain.hashCode(),
              type: request.type,
              source: GraphModelFactory.findIndex(newgraph.nodes, domainNode),
              target: GraphModelFactory.findIndex(newgraph.nodes, urlNode),
              name: source_domain + " -> " + url_domain,
              data: request,
            });
          }
        }
      }
    }
    if (JSON.stringify(newgraph) == JSON.stringify(graph)) {
      return [newgraph, false];
    }
    return [newgraph, true];
  }

  static convertBrowsingDataToJSONGraph(browsingData) {
    if (browsingData.length < 1) {
      return null;
    }
    let nodes = [];
    let links = {};
    var requests = browsingData.map((x) => new Request(x));
    for (var request of requests) {
      if (!request.source || !request.url || !request) {
        continue;
      }
      var source_domain = new URL(request.source).host;
      var url_domain = new URL(request.url).host;
      if (source_domain == url_domain) {
        continue;
      }
      if (source_domain && url_domain) {
        let domainNode = { nid: source_domain.hashCode(), name: source_domain };
        let urlNode = { nid: url_domain.hashCode(), name: url_domain };
        if (!GraphModelFactory.nodeExists(domainNode, nodes)) {
          nodes.push(domainNode);
        }
        if (!GraphModelFactory.nodeExists(urlNode, nodes)) {
          nodes.push(urlNode);
        }
        if (
          !GraphModelFactory.connectionExists(
            source_domain.hashCode(),
            url_domain.hashCode(),
            links,
            request
          )
        ) {
          if (!links[request.type]) {
            links[request.type] = [];
          }
          links[request.type].push({
            nid: source_domain.hashCode() + url_domain.hashCode(),
            type: request.type,
            source: GraphModelFactory.findIndex(nodes, domainNode),
            target: GraphModelFactory.findIndex(nodes, urlNode),
            name: source_domain + " -> " + url_domain,
            data: request,
          });
        }
      }
    }
    return { nodes, links };
  }

  static nodeExists(newnode, nodes) {
    return nodes.some((el) => el.nid === newnode.nid);
  }

  static connectionExists(source, target, connections, request) {
    let allConnenections = [];
    for (let connection of Object.values(connections)) {
      allConnenections.concat(connection);
    }
    for (let connection of allConnenections) {
      if (connection.target && connection.source && connection.type) {
        if (
          connection.target == target &&
          connection.source == source &&
          connection.type == request.type
        ) {
          return true;
        }
      }
    }
    return false;
  }

  static findIndex(nodes, node) {
    return nodes.findIndex((el) => node.nid == el.nid);
  }
}
