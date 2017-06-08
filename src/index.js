import '../style/style.css';
import io from 'socket.io-client';
import { url } from '../config';

(function() {

    const switchElement = document.getElementById('switch');
    const maskElement = document.getElementById('mask_container');
    const lightElement = document.getElementById('light');
    let state = false; // Switch state

    const setLight = (mode) => {
      state = mode === 'toggle' ? !state : mode === 'on';
      if(state) {
        // Turn light on
        state = true;
        switchElement.classList.add('on');
        lightElement.style.display = 'none';
      } else {
        // Turn light off
        state = false;
        switchElement.classList.remove('on');
        lightElement.style.display = 'block';
      }
    };

    const toggle = () => {
      // Toggle light/switch
      setLight('toggle');

      // Emit the event led:on/off when the switch is clicked
      socket.emit(`led:${ state ? 'on' : 'off'}`);
      console.log(`Sent: ${state ? 'on' : 'off'}`);
    };

    // Connect to the socket server
    const socket = io.connect(url);

    // Turn off the LED when the page loads
    socket.emit('led:off');

    // Add an event listener (click) to the switch to turn the LED on/off
    maskElement.addEventListener('click', toggle); // When the light is off
    switchElement.addEventListener('click', toggle); // When the light is on


    // When the event led:on is received toggle the switch to on
    socket.on('led:on', () => {
      console.log('Received: on');
      setLight('on');
    });

    // When the event led:off is received toggle the switch to off
    socket.on('led:off', () => {
      console.log('Received: off');
      setLight('off');
    });
  }
)();
