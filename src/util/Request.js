export default class Request {
  constructor(request) {
    this.requestHeaders = request["requestHeaders"];
    this.frameId = request["frameId"];
    this.method = request["method"];
    this.parentFrameId = request["parentFrameId"];
    this.requestId = request["requestId"];
    this.tabId = request["tabId"];
    this.timeStamp = request["timeStamp"];
    this.type = request["type"];
    this.url = request["url"];
    this.source = request["initiator"];
  }

  getReferer() {
    if (this.requestHeaders) {
      const refHeader = this.requestHeaders.find((e) => e.name === "Referer");
      return refHeader ? refHeader.value : undefined;
    } else {
      return undefined;
    }
  }

  isRefered() {
    if (this.requestHeaders) {
      for (let header of this.requestHeaders) {
        if (header.name === "Referer") {
          return true;
        }
      }
    }
    return false;
  }

  generateNodeInformation() {
    return {
      data: {
        id: this.hashCode,
        label: this.url,
        type: this.type,
      },
    };
  }

  isFiltered(filterObj) {
    if (filterObj === null) {
      return true;
    }
    if (filterObj.type[this.type] && filterObj.method[this.method]) {
      return true;
    }
    return false;
  }
}
