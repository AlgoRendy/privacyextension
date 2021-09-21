import Request from "../src/util/request";

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

test("Check if referer gets recognized", () => {
  const request = new Request(dummyRequest);
  expect(request.getReferer()).toBe("https://www.google.de/");
});

test("filter object", () => {
  const request = new Request(dummyRequest);
  const filterObj = {
    type: {
      stylesheet: true,
      script: false,
      main_frame: true,
      image: true,
      font: true,
      other: true,
      ping: true,
      xmlhttprequest: true,
      sub_frame: true,
      csp_report: true,
      media: true,
    },
    method: {
      GET: false,
      POST: true,
      PUT: true,
      DELETE: true,
      HEAD: true,
      CONNECT: true,
      OPTIONS: true,
      TRACE: true,
    },
  };
  expect(request.isFiltered(filterObj)).toBe(false);
  filterObj.method.GET = true;
  expect(request.isFiltered(filterObj)).toBe(false);
  filterObj.type.script = true;
  expect(request.isFiltered(filterObj)).toBe(true);
});
