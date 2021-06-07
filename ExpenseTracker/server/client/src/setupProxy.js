const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api/*", "/auth/google"],
    createProxyMiddleware({
    	//target: "https://evening-island-56197.herokuapp.com",
    	target: "http://localhost:5000",
    })
  );
};