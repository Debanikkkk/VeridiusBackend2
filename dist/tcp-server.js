"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tcpServer = void 0;
// import * as net from 'net';
// const net = require('net');
// Define the port and host the server will listen on
// import * as net from 'net'
const crc32 = __importStar(require("crc-32"));
const LoginPacketController_1 = require("./controller/LoginPacketController");
function splitStringToArrayStar(inputString) {
    return inputString.split('*').map((item) => item.trim());
}
function splitStringToArrayComma(inputString) {
    return inputString.split(',').map((item) => item.trim());
}
function stringToHexCRC32(data) {
    const dataWithout = data.split('*')[0];
    const dataWithoutChecksum = dataWithout + '*';
    console.log('datawihoutcehcksum', dataWithoutChecksum);
    const checksum = crc32.str(dataWithoutChecksum);
    return checksum.toString(16).toUpperCase();
}
function tcpServer(net) {
    const PORT = 8083;
    const HOST = '127.0.0.1';
    const server = net.createServer((socket) => {
        console.log('Client connected:', socket.remoteAddress, socket.remotePort);
        // Event listener for incoming data
        socket.on('data', (data) => {
            console.log(`Data received: ${data.toString()}`);
            const strData = data.toString();
            const dataArr = splitStringToArrayStar(strData);
            console.log('the data array is ', dataArr);
            const checksum = stringToHexCRC32(strData);
            console.log('checksum is', checksum);
            console.log('the recieved checksumm is ', dataArr[1]);
            if (checksum == dataArr[1]) {
                console.log('checksum valid');
                // return 'checksum valid';
                const commaSep = splitStringToArrayComma(strData);
                console.log('comma seperated', commaSep);
                const loginPacketBody = {
                    checksum: commaSep[10],
                    firmwareVersion: commaSep[5],
                    imei: commaSep[4],
                    latitude: Number(commaSep[9]),
                    // latitudeDir: commaSep[],
                    longitude: Number(commaSep[7]),
                    // longitudeDir: commaSep[],
                    packetHeader: commaSep[0],
                    protocolVersion: commaSep[6],
                    // startCharacter: commaSep[0],
                    vehicleRegNo: commaSep[3],
                    vendorId: commaSep[2],
                    deviceType: commaSep[1],
                };
                const loginPacketInstance = new LoginPacketController_1.LoginPacketController();
                const packetSave = loginPacketInstance.saveLoginPacket(loginPacketBody);
                console.log(packetSave);
                return;
            }
            else {
                console.log('checksum invalid');
                return 'CHECKSUM WAS INVALID';
            }
        });
        // Event listener for client disconnection
        socket.on('end', () => {
            console.log('Client disconnected');
        });
        // Event listener for errors
        socket.on('error', (err) => {
            console.error(`Error: ${err.message}`);
        });
    });
    // Start the server
    server.listen(PORT, HOST, () => {
        console.log(`Server listening on ${HOST}:${PORT}`);
    });
    // Event listener for server errors
    server.on('error', (err) => {
        console.error(`Server error: ${err.message}`);
    });
}
exports.tcpServer = tcpServer;
//# sourceMappingURL=tcp-server.js.map