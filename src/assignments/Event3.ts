const EventEmitter = require('events');
const emitter = new EventEmitter();

const listener1 = () => {
    console.log('Data received: Starting processing.');
    emitter.removeListener('data', listener1);
};

const listener2 = () => {
    console.log('Data received: Logging details.');
};

const listener3 = () => {
    console.log('Data received: Completing processing.');
};

emitter.on('data', listener1);
emitter.on('data', listener2);
emitter.on('data', listener3);

emitter.emit('data');