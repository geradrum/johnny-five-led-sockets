const express = require('express');
const config = require('./config');
const app = express();

// Development only
if (process.env.NODE_ENV === 'development') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  app.use(express.static('dist')); // Set 'dist' folder as static assets folder
}

const server = app.listen(process.env.PORT || config.port, function() {
  let port = process.env.PORT || config.port;
  console.log('Socket server listening at: ' + port);
});

const io = require('socket.io')(server);

io.of('/arduino').on('connection', (socket) => {

  console.log('New connection: ' + socket.id);

  socket.on('led:on', function() {
    socket.broadcast.emit('led:on');
    console.log('Broadcasting: led:on');
  });

  socket.on('led:off', function() {
    socket.broadcast.emit('led:off');
    console.log('Broadcasting: led:off');
  });

});
