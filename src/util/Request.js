/* eslint-disable eqeqeq */
// eslint-disable-next-line no-extend-native
String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
};

export default class Request {

    constructor(request){
        this.hashCode = JSON.stringify(request).hashCode()
        this.requestHeaders = request['requestHeaders'];
        this.frameId = request['frameId'];
        this.method = request['method'];
        this.parentFrameId = request['parentFrameId'];
        this.requestId = request['requestId']
        this.tabId = request['tabId'];
        this.timeStamp = request['timeStamp'];
        this.type = request['type'];
        this.url = request['url'];
        this.source = request['initiator'];
    }

    isRefered() {
        if (this.requestHeaders) {
            for(let header of this.requestHeaders) {
                if(header.name == "Referer"){
                    return true
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
            }
        }
    }

    isFiltered(filterObj) {
        if (filterObj === null){
            return true;
        }
        if (filterObj.type[this.type] && filterObj.method[this.method]) {
            return true
        }
        return false
    }


}