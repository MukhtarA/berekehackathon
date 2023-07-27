const cors_proxy = require("cors-anywhere");

const host = "0.0.0.0";
const port = 7777;

cors_proxy
  .createServer({
    originWhiteList: [],
    requireHeader: [],
  })
  .listen(port, host, function () {
    console.log("Running CORS Anywhere on" + host + ": " + port);
  });
