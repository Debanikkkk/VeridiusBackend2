"use strict";
// const express = require('express');
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// const port = 3000;
// const host = '192.168.29.134';
// // Middleware to parse incoming requests with JSON payloads
// app.use(express.json());
// // Route to handle incoming POST messages
// app.post('/', (req, res) => {
//     const message = req.body; // Assuming the message is sent in the body as JSON
//     // Log the message to the console
//     console.log('Received message:', message);
//     // Send a response back to acknowledge receipt of the message
//     res.status(200).send('Message received');
// });
// // Start the server
// app.listen(port, host, () => {
//     // console.log(`Server is running on http://${host}:${port}`);
//     console.log(`Server is running on http://${host}`);
// });
// // const express = require('express');
// // const app = express();
// // const port =3000;
// // const host = '192.168.29.134'; // Domain to listen on
// // // Middleware to parse incoming requests with JSON payloads
// // app.use(express.json());
// // // Route to handle incoming POST messages
// // app.post('/', (req, res) => {
// //     const message = req.body; // Get the entire request body
// //     // Print the message to the console
// //     console.log('Received message:', JSON.stringify(message, null, 2));
// //     // Send a response back to acknowledge receipt of the message
// //     res.status(200).send('Message received');
// // });
// // // Start the server
// // app.listen(port, host, () => {
// //     console.log(`Server is running on http://${host}:${port}`);
// // });
// // const express = require('express');
// // const path = require('path');
// // const app = express();
// // const port = 3000;
// // const host = '192.168.29.134'; // Listen on all interfaces
// // // Serve static files from the 'public' directory
// // // app.use(express.static(path.join(__dirname, '../public')));
// // // Middleware to parse incoming requests with JSON payloads
// // app.use(express.json());
// // // Route to handle incoming POST messages
// // app.post('/', (req, res) => {
// //     const message = req.body; // Get the entire request body
// //     // Print the message to the console
// //     console.log('Received message:', JSON.stringify(message, null, 2));
// //     // Send a response back to acknowledge receipt of the message
// //     res.status(200).send('Message received');
// // });
// // // Start the server
// // app.listen(port, host, () => {
// //     console.log(`Server is running on http://${host}:${port}`);
// // });
// // const express = require('express');
// // const path = require('path');
// // const fs = require('fs');
// // const https = require('http');
// // const app = express();
// // const port = 3000;
// // const host = '192.168.29.134';
// // // SSL certificate and key paths
// // const sslOptions = {
// //   key: fs.readFileSync(path.join(__dirname, './cert/server.key')),
// //   cert: fs.readFileSync(path.join(__dirname, './cert/server.cert'))
// // };
// // // Serve static files from the 'public' directory
// // // app.use(express.static(path.join(__dirname, '../public')));
// // // Middleware to parse incoming requests with JSON payloads
// // app.use(express.json());
// // // Route to handle incoming POST messages
// // app.post('/', (req, res) => {
// //   const message = req.body; // Get the entire request body
// //   // Print the message to the console
// //   console.log('Received message:', JSON.stringify(message, null, 2));
// //   // Send a response back to acknowledge receipt of the message
// //   res.status(200).send('Message received');
// // });
// // // Start the HTTPS server
// // https.createServer(sslOptions, app).listen(port, host, () => {
// //   console.log(`Server is running on https://${host}:${port}`);
// // });
//# sourceMappingURL=receive.js.map