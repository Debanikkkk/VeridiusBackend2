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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocketIOFeatures = void 0;
const crc32 = __importStar(require("crc-32"));
const LoginPacketController_1 = require("./controller/LoginPacketController");
const socket_io_1 = require("socket.io"); // Import the Socket.IO client
const net_1 = __importDefault(require("net"));
// import { log } from 'console';
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
const io = new socket_io_1.Server(5001, {
    cors: {
        origin: '*', // Allow all origins for simplicity
    },
});
let socketArr = [];
function initSocketIOFeatures() {
    // Event listener for connection to the Socket.IO server
    io.on('connect', (socket) => {
        console.log('A client connected to server using: ', socket.handshake.address);
        socketArr.push(socket);
        console.log('Total clients after addition: ', socketArr.length);
    });
    io.on('close', (socket) => {
        console.log('A Client gone: ', socket.handshake.address);
        socketArr = socketArr.filter((item) => item !== socket);
        console.log('Total clients after remove: ', socketArr.length);
    });
    const HOST = '0.0.0.0';
    const PORT = 8083;
    const server = net_1.default.createServer((socket) => {
        console.log('Client connected:', socket.remoteAddress, socket.remotePort);
        // Event listener for incoming data
        socket.on('data', (data) => {
            console.log(`Data received: ${data.toString()}`);
            const strData = data.toString();
            const dataArr = splitStringToArrayStar(strData);
            console.log('the data array is ', dataArr);
            const checksum = stringToHexCRC32(strData);
            console.log('checksum is', checksum);
            console.log('the received checksum is ', dataArr[1]);
            if (checksum === dataArr[1]) {
                console.log('checksum valid');
                const commaSep = splitStringToArrayComma(strData);
                console.log('comma separated', commaSep);
                const loginPacketBody = {
                    checksum: commaSep[10],
                    firmwareVersion: commaSep[5],
                    imei: commaSep[4],
                    latitude: Number(commaSep[9]),
                    longitude: Number(commaSep[7]),
                    packetHeader: commaSep[0],
                    protocolVersion: commaSep[6],
                    vehicleRegNo: commaSep[3],
                    vendorId: commaSep[2],
                    deviceType: commaSep[1],
                };
                // ****************
                const loginPacketInstance = new LoginPacketController_1.LoginPacketController();
                const packetSave = loginPacketInstance.saveLoginPacket(loginPacketBody);
                console.log('this is the saved packet', packetSave);
                // Emit the loginPacketBody to the Socket.IO server
                io.emit('lpMessage', loginPacketBody);
                // let index: number = 101;
                // socketArr.forEach((sock) => {
                //   console.log('ADDRESS OF ONE: ', sock.handshake.address);
                //   loginPacketBody.protocolVersion = index.toString();
                //   sock.emit('lpMessage', loginPacketBody);
                //   index++;
                // });
                return { '###REACHED THE END HERE***': 'ubefgoue' };
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
exports.initSocketIOFeatures = initSocketIOFeatures;
//# sourceMappingURL=tcp-server.js.map