import { GraphModel } from "../src/util/GraphModel";

// request from google.com to gstatic script
const dummyRequest = {
  frameId: 0,
  initiator: "https://www.google.de",
  method: "GET",
  parentFrameId: -1,
  requestHeaders: [
    {
      name: "sec-ch-ua",
      value: '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    },
    {
      name: "sec-ch-ua-mobile",
      value: "?0",
    },
    {
      name: "User-Agent",
      value:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
    },
    {
      name: "Accept",
      value: "*/*",
    },
    {
      name: "X-Client-Data",
      value: "CLSAywE=",
    },
    {
      name: "Sec-Fetch-Site",
      value: "cross-site",
    },
    {
      name: "Sec-Fetch-Mode",
      value: "no-cors",
    },
    {
      name: "Sec-Fetch-Dest",
      value: "script",
    },
    {
      name: "Referer",
      value: "https://www.google.de/",
    },
    {
      name: "Accept-Encoding",
      value: "gzip, deflate, br",
    },
    {
      name: "Accept-Language",
      value: "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
    },
  ],
  requestId: "37425",
  tabId: 239,
  timeStamp: 1629051256599.3708,
  type: "script",
  url: "https://www.gstatic.com/og/_/js/k=og.qtm.en_US.38L9F6mYc1U.O/rt=j/m=qabr,q_dnp,qcwid,qapid,qald/exm=qaaw,qadd,qaid,qein,qhaw,qhbr,qhch,qhga,qhid,qhin,qhpr/d=1/ed=1/rs=AA2YrTsOqmng0D__mtPtmMyv2hH_VU6AQw",
};
// request from google.com to gstatic stylesheet
const dummyRequest2 = {
  frameId: 0,
  initiator: "https://www.google.de",
  method: "GET",
  parentFrameId: -1,
  requestHeaders: [
    {
      name: "sec-ch-ua",
      value: '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    },
    {
      name: "sec-ch-ua-mobile",
      value: "?0",
    },
    {
      name: "User-Agent",
      value:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
    },
    {
      name: "Accept",
      value: "text/css,*/*;q=0.1",
    },
    {
      name: "X-Client-Data",
      value: "CLSAywE=",
    },
    {
      name: "Sec-Fetch-Site",
      value: "cross-site",
    },
    {
      name: "Sec-Fetch-Mode",
      value: "no-cors",
    },
    {
      name: "Sec-Fetch-Dest",
      value: "style",
    },
    {
      name: "Referer",
      value: "https://www.google.de/",
    },
    {
      name: "Accept-Encoding",
      value: "gzip, deflate, br",
    },
    {
      name: "Accept-Language",
      value: "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
    },
  ],
  requestId: "37426",
  tabId: 239,
  timeStamp: 1629051256599.508,
  type: "stylesheet",
  url: "https://www.gstatic.com/og/_/ss/k=og.qtm.td_oGs8qHP4.L.W.O/m=qcwid/excm=qaaw,qadd,qaid,qein,qhaw,qhbr,qhch,qhga,qhid,qhin,qhpr/d=1/ed=1/ct=zgms/rs=AA2YrTvUU8HecANNtk7GIPlMaRoGoE26dA",
};
// request from google.com to google/asdasdsa/asdsa subdomain other
const dummyRequest3 = {
  frameId: 0,
  initiator: "https://www.google.de",
  method: "GET",
  parentFrameId: -1,
  requestHeaders: [
    {
      name: "sec-ch-ua",
      value: '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    },
    {
      name: "sec-ch-ua-mobile",
      value: "?0",
    },
    {
      name: "User-Agent",
      value:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
    },
    {
      name: "Accept",
      value: "*/*",
    },
    {
      name: "X-Client-Data",
      value: "CLSAywE=",
    },
    {
      name: "Sec-Fetch-Site",
      value: "same-origin",
    },
    {
      name: "Sec-Fetch-Mode",
      value: "cors",
    },
    {
      name: "Sec-Fetch-Dest",
      value: "manifest",
    },
    {
      name: "Referer",
      value: "https://www.google.de/",
    },
    {
      name: "Accept-Encoding",
      value: "gzip, deflate, br",
    },
    {
      name: "Accept-Language",
      value: "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
    },
    {
      name: "Cookie",
      value:
        "CONSENT=YES+DE.de+V14+BX+103; NID=221=ATmaQOaVWL4RCZHQFRWja3jozm7ZysuScwnv9lR4hD3n64Ug9NzpLmtAAzB2TU_dbCEt5upL9f457x3DCo2mn1po_Nqilxm0NXfjt_suPfmEqc4EqSPsJdbRTaLToYPhfGIgtohAKEIYp3Re9qa-Q5JElQbPZF-xZ1ppyN7HowTEMRaKHi1sb3M; 1P_JAR=2021-08-15-18",
    },
  ],
  requestId: "37435",
  tabId: 239,
  timeStamp: 1629051256709.011,
  type: "other",
  url: "https://www.google.de/manifest?pwa=webhp",
};

const initialGraph = () => {
  expect(GraphModel.getGraph().nodes.length).toBe(0);
  expect(GraphModel.getGraph().links.script.length).toBe(0);
  expect(GraphModel.getGraph().links.font.length).toBe(0);
  expect(GraphModel.getGraph().links.csp_report.length).toBe(0);
  expect(GraphModel.getGraph().links.image.length).toBe(0);
  expect(GraphModel.getGraph().links.main_frame.length).toBe(0);
  expect(GraphModel.getGraph().links.media.length).toBe(0);
  expect(GraphModel.getGraph().links.other.length).toBe(0);
  expect(GraphModel.getGraph().links.ping.length).toBe(0);
  expect(GraphModel.getGraph().links.stylesheet.length).toBe(0);
  expect(GraphModel.getGraph().links.sub_frame.length).toBe(0);
  expect(GraphModel.getGraph().links.xmlhttprequest.length).toBe(0);
};

test("Add Single Request to Graph.", () => {
  // Check if graph is initialized correctly
  initialGraph();
  GraphModel.addChunkToExistingGraph([dummyRequest]);
  expect(GraphModel.getGraph().nodes.length).toBe(2);
  expect(GraphModel.getGraph().links.script.length).toBe(1);
  expect(GraphModel.getGraph().links.font.length).toBe(0);
  expect(GraphModel.getGraph().links.csp_report.length).toBe(0);
  expect(GraphModel.getGraph().links.image.length).toBe(0);
  expect(GraphModel.getGraph().links.main_frame.length).toBe(0);
  expect(GraphModel.getGraph().links.media.length).toBe(0);
  expect(GraphModel.getGraph().links.other.length).toBe(0);
  expect(GraphModel.getGraph().links.ping.length).toBe(0);
  expect(GraphModel.getGraph().links.stylesheet.length).toBe(0);
  expect(GraphModel.getGraph().links.sub_frame.length).toBe(0);
  expect(GraphModel.getGraph().links.xmlhttprequest.length).toBe(0);

  expect(GraphModel.getGraph().nodes[0].in).toBe(0);
  expect(GraphModel.getGraph().nodes[0].out).toBe(1);
  expect(GraphModel.getGraph().nodes[1].in).toBe(1);
  expect(GraphModel.getGraph().nodes[1].out).toBe(0);
});

test("Add Same Request Again.", () => {
  // Check for singelton
  expect(GraphModel.getGraph().nodes.length).toBe(2);
  expect(GraphModel.getGraph().links.script.length).toBe(1);
  expect(GraphModel.getGraph().links.font.length).toBe(0);
  expect(GraphModel.getGraph().links.csp_report.length).toBe(0);
  expect(GraphModel.getGraph().links.image.length).toBe(0);
  expect(GraphModel.getGraph().links.main_frame.length).toBe(0);
  expect(GraphModel.getGraph().links.media.length).toBe(0);
  expect(GraphModel.getGraph().links.other.length).toBe(0);
  expect(GraphModel.getGraph().links.ping.length).toBe(0);
  expect(GraphModel.getGraph().links.stylesheet.length).toBe(0);
  expect(GraphModel.getGraph().links.sub_frame.length).toBe(0);
  expect(GraphModel.getGraph().links.xmlhttprequest.length).toBe(0);

  GraphModel.addChunkToExistingGraph([dummyRequest]);

  expect(GraphModel.getGraph().nodes.length).toBe(2);
  expect(GraphModel.getGraph().links.script.length).toBe(1);
  expect(GraphModel.getGraph().links.font.length).toBe(0);
  expect(GraphModel.getGraph().links.csp_report.length).toBe(0);
  expect(GraphModel.getGraph().links.image.length).toBe(0);
  expect(GraphModel.getGraph().links.main_frame.length).toBe(0);
  expect(GraphModel.getGraph().links.media.length).toBe(0);
  expect(GraphModel.getGraph().links.other.length).toBe(0);
  expect(GraphModel.getGraph().links.ping.length).toBe(0);
  expect(GraphModel.getGraph().links.stylesheet.length).toBe(0);
  expect(GraphModel.getGraph().links.sub_frame.length).toBe(0);
  expect(GraphModel.getGraph().links.xmlhttprequest.length).toBe(0);

  expect(GraphModel.getGraph().nodes[0].in).toBe(0);
  expect(GraphModel.getGraph().nodes[0].out).toBe(2);
  expect(GraphModel.getGraph().nodes[1].in).toBe(2);
  expect(GraphModel.getGraph().nodes[1].out).toBe(0);

  expect(GraphModel.getGraph().links.script[0].amt).toBe(2);
});

test("Load Graph", () => {
  const exportedGraph = GraphModel.exportGraph();
  GraphModel.resetGraph();
  initialGraph();
  GraphModel.loadGraph(exportedGraph);
  expect(GraphModel.getGraph().nodes.length).toBe(2);
  expect(GraphModel.getGraph().links.script.length).toBe(1);
  expect(GraphModel.getGraph().links.font.length).toBe(0);
  expect(GraphModel.getGraph().links.csp_report.length).toBe(0);
  expect(GraphModel.getGraph().links.image.length).toBe(0);
  expect(GraphModel.getGraph().links.main_frame.length).toBe(0);
  expect(GraphModel.getGraph().links.media.length).toBe(0);
  expect(GraphModel.getGraph().links.other.length).toBe(0);
  expect(GraphModel.getGraph().links.ping.length).toBe(0);
  expect(GraphModel.getGraph().links.stylesheet.length).toBe(0);
  expect(GraphModel.getGraph().links.sub_frame.length).toBe(0);
  expect(GraphModel.getGraph().links.xmlhttprequest.length).toBe(0);

  expect(GraphModel.getGraph().nodes[0].in).toBe(0);
  expect(GraphModel.getGraph().nodes[0].out).toBe(2);
  expect(GraphModel.getGraph().nodes[1].in).toBe(2);
  expect(GraphModel.getGraph().nodes[1].out).toBe(0);

  expect(GraphModel.getGraph().links.script[0].amt).toBe(2);
});

test("Reset Graph.", () => {
  GraphModel.resetGraph();
  initialGraph();
});

test("Load two Requests to the same nodes but different reqeuest type.", () => {
  initialGraph();
  GraphModel.addChunkToExistingGraph([dummyRequest, dummyRequest2]);

  expect(GraphModel.getGraph().nodes.length).toBe(2);
  expect(GraphModel.getGraph().links.script.length).toBe(1);
  expect(GraphModel.getGraph().links.font.length).toBe(0);
  expect(GraphModel.getGraph().links.csp_report.length).toBe(0);
  expect(GraphModel.getGraph().links.image.length).toBe(0);
  expect(GraphModel.getGraph().links.main_frame.length).toBe(0);
  expect(GraphModel.getGraph().links.media.length).toBe(0);
  expect(GraphModel.getGraph().links.other.length).toBe(0);
  expect(GraphModel.getGraph().links.ping.length).toBe(0);
  expect(GraphModel.getGraph().links.stylesheet.length).toBe(1);
  expect(GraphModel.getGraph().links.sub_frame.length).toBe(0);
  expect(GraphModel.getGraph().links.xmlhttprequest.length).toBe(0);

  expect(GraphModel.getGraph().nodes[0].in).toBe(0);
  expect(GraphModel.getGraph().nodes[0].out).toBe(2);
  expect(GraphModel.getGraph().nodes[1].in).toBe(2);
  expect(GraphModel.getGraph().nodes[1].out).toBe(0);

  expect(GraphModel.getGraph().links.script[0].amt).toBe(1);
  expect(GraphModel.getGraph().links.stylesheet[0].amt).toBe(1);
});

test("Load domain to domain request", () => {
  GraphModel.addChunkToExistingGraph([dummyRequest3]);

  expect(GraphModel.getGraph().nodes.length).toBe(2);
  expect(GraphModel.getGraph().links.script.length).toBe(1);
  expect(GraphModel.getGraph().links.font.length).toBe(0);
  expect(GraphModel.getGraph().links.csp_report.length).toBe(0);
  expect(GraphModel.getGraph().links.image.length).toBe(0);
  expect(GraphModel.getGraph().links.main_frame.length).toBe(0);
  expect(GraphModel.getGraph().links.media.length).toBe(0);
  expect(GraphModel.getGraph().links.other.length).toBe(0);
  expect(GraphModel.getGraph().links.ping.length).toBe(0);
  expect(GraphModel.getGraph().links.stylesheet.length).toBe(1);
  expect(GraphModel.getGraph().links.sub_frame.length).toBe(0);
  expect(GraphModel.getGraph().links.xmlhttprequest.length).toBe(0);

  expect(GraphModel.getGraph().nodes[0].in).toBe(0);
  expect(GraphModel.getGraph().nodes[0].out).toBe(2);
  expect(GraphModel.getGraph().nodes[1].in).toBe(2);
  expect(GraphModel.getGraph().nodes[1].out).toBe(0);

  expect(GraphModel.getGraph().links.script[0].amt).toBe(1);
  expect(GraphModel.getGraph().links.stylesheet[0].amt).toBe(1);
});
