const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('userRegistered', () => {
    console.log('User has been registered.');
});

emitter.once('sendWelcomeEmail', () => {
    console.log('Welcome email has been sent.');
});

emitter.on('userLoggedIn', () => {
    console.log('User has logged in.');
});

emitter.emit('userRegistered');

setTimeout(() => {
    emitter.emit('sendWelcomeEmail');
    emitter.emit('sendWelcomeEmail');
}, 2000);

setTimeout(() => {
    emitter.emit('userLoggedIn');
}, 3000);