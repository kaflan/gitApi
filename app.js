(function() {
  'use strict';
  var http = require('http');
  var port = Number(process.env.PORT || 3000);
  var _ = require('lodash');

  function renderResponse(res, code, body) {
    res.writeHead(code, {
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, DELETE, OPTIONS'
    });
    res.end(body);
  }
  var server = http.createServer(function getReqRes(req, res) {
    var outhGithub = {
      GET: function() {
        renderResponse(res, 200, '');
      }
    };


  });
  server.listen(port);
})();
