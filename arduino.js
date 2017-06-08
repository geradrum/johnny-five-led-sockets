const io = require('socket.io-client');
const five = require('johnny-five');
const config = require('./config');

// Connect to the socket server
const socket = io.connect(config.url);

const board = five.Board();

board.on('ready', function() {

  const led = new five.Led(13); // Set pin 13 for LED

  // Turn LED on when event led:on is received
  socket.on('led:on', function(){
    led.on();
  });

  // Turn LED off when event led:off is received
  socket.on('led:off', function(){
    led.off();
  });

});
