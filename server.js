const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.base');
// const http = require('http');
const fs = require('fs');
const os = require('os');
const ip = getIp();
const port = 9999;
const devport = port - 1;
const domain = `http://${ip}:${devport}`;

var l = console.log.bind(console)

const server = new WebpackDevServer(webpack({
  devtool: 'eval',
  entry: {
    main: [
      'webpack/hot/only-dev-server',
      `webpack-dev-server/client?${domain}`,
      config.entry.main
    ]
  },
  output: config.output,
  plugins: config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]),
  module: config.module,
  resolve: config.resolve,
}), {
  publicPath: `${domain}/static/`,
  hot: true,
  historyApiFallback: true,
  port: devport,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
});
server.listen(devport);

var express = require('express')
var app = express();
var http = require('http').Server(app)

var io = require('socket.io')(http)
io.on('connection', function(socket){
    // socket.on('report', function(data){
    //   l(data)
    // })
    socket.on('born', function(data){
     socket.broadcast.emit('born', data);
    })

})



app.get('/', function(req, res){
    var html = fs.readFileSync('./index.html')
      .toString()
      .replace(/\.\/dist\//g, `${domain}/static/`)

    res.send(html)
})

// http.listen(port)

http.listen(port, function(){

});


// http.createServer((req, res) => {
//   res.writeHead(200, {
//     'content-type': 'text/html;charset=utf-8'
//   });

//   res.end(
//     fs.readFileSync('./index.html')
//       .toString()
//       .replace(/\.\/dist\//g, `${domain}/static/`)
//   );
// }).listen(port);


function getIp() {
  'use strict';

  const interfaces = os.networkInterfaces();
  let IPv4 = '127.0.0.1';

  for (let key in interfaces) {
    interfaces[key].forEach(function(details) {
      if (details.family == 'IPv4' && (key == 'en0' || key == 'eth0')) {
        IPv4 = details.address;
      }
    });
  }

  return IPv4;
}