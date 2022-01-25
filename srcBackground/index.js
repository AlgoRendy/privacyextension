const Calculator = require("./components/calculator")();
const Requests = require("./components/requests")(Calculator);
require("./components/background")(Requests);
