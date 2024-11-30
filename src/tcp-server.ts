import * as crc32 from 'crc-32';
import { ReqLoginPacket } from './models/req/ReqLoginPacket';
import { LoginPacketController } from './controller/LoginPacketController';
import { Server, Socket } from 'socket.io'; // Import the Socket.IO client
import express from 'express';
import net from 'net';
import { DataEvent } from './utils/dataEvent';
import { ReqHMP } from './models/req/ReqHMP';
import { HMPController } from './controller/HMPController';
import { envs } from 'utils/envVars';
import http from 'http';
// import { timeStamp } from 'console';
// import { TrackingPacketController } from './controller/TrackingPacketController';
// import { ReqTrackingPacket } from './models/req/ReqTrackingPacket';
// import { log } from 'console';
// const socketArr: net.Socket[] = [];

export interface Coordinates {
  longitude: number;
  latitude: number;
  longDir: 'W' | 'E';
  latDir: 'N' | 'S';
}

export interface ImeiPacketBody {
  imei: string;
  packet: string;
  // deviceType: string;
}

export interface ImeiPacketBodyDT {
  imei: string;
  packet: string;
  deviceType: string;
}
const headerArr: string[] = ['$LIN', '$HMP', '$TP', '$EPB', '$CONFIG', '$EMR', '$GF1', '$GF2', '$GF3', '#DOTA', '#FOTA'];
console.log(headerArr);
export class SocketContainer {
  socket: net.Socket;
  dataEventHandler: DataEvent<string>;

  constructor(socket: net.Socket) {
    this.socket = socket;
    this.dataEventHandler = new DataEvent<string>();
  }

  sendDataToDevice(data: string): boolean {
    return this.socket.write(data);
  }
}

export const sockMap = new Map<string, SocketContainer>();
const app = express();
const HOST: string = '0.0.0.0';
const TCP_PORT: number = envs.TCP_PORT;
app.use(express.json());

export function sendNegInvalidHeader(socket: net.Socket, header: string, io: Server, data: string) {
  const msg = header + ',N10*';
  const cs = stringToHexCRC32(msg);
  const invalidCommandMsg = msg + cs;
  console.log('the invalid comamand message is: ', invalidCommandMsg);
  socket.write(invalidCommandMsg);
  // eslint-disable-next-line
  const socketKey = [...sockMap.entries()].find(([_, value]) => value.socket === socket)?.[0]; //disable es-lint

  const mess = {
    imei: socketKey || socket.remoteAddress + ':' + socket.remotePort,
    packet: invalidCommandMsg,
    timestamp: new Date(),
    color: 'lightblue',
  };
  const messFull = {
    imei: socketKey || socket.remoteAddress + ':' + socket.remotePort,
    packet: data.toString(),
    timestamp: new Date(),
    color: '#E04D38',
  };
  io.emit('sockMessage', messFull);
  io.emit('sockMessage', mess);
}

export function sendNegInvalidChecksum(socket: net.Socket, header: string, io: Server, data: string) {
  const msg = header + ',N15*';
  const cs = stringToHexCRC32(msg);
  const invalidCommandMsg = msg + cs;
  console.log('the invalid checksum message is: ', invalidCommandMsg);
  socket.write(invalidCommandMsg);
  // eslint-disable-next-line
  const socketKey = [...sockMap.entries()].find(([_, value]) => value.socket === socket)?.[0]; //disable es-lint
  // console.log(key);
  const mess = {
    imei: socketKey || socket.remoteAddress + ':' + socket.remotePort,
    packet: invalidCommandMsg,
    timestamp: new Date(),
    color: '#E04D38',
  };
  const messFull = {
    imei: socketKey || socket.remoteAddress + ':' + socket.remotePort,
    packet: data.toString(),
    color: 'lightblue',
    timestamp: new Date(),
    // timestamp: new
  };
  io.emit('sockMessage', messFull);
  io.emit('sockMessage', mess);
}

export function sendNegInvalidPacketFormat(socket: net.Socket, header: string, io: Server, data: string) {
  const msg = header + ',N13*';
  const cs = stringToHexCRC32(msg);
  const invalidCommandMsg = msg + cs;
  console.log('the invalid packet format message is: ', invalidCommandMsg);
  socket.write(invalidCommandMsg);
  // eslint-disable-next-line
  const socketKey = [...sockMap.entries()].find(([_, value]) => value.socket === socket)?.[0]; //disable es-lint
  // console.log(key);
  const mess = {
    imei: socketKey || socket.remoteAddress + ':' + socket.remotePort,
    packet: invalidCommandMsg,
    timestamp: new Date(),
    color: '#E04D38',
  };
  const messFull = {
    imei: socketKey || socket.remoteAddress + ':' + socket.remotePort,
    packet: data.toString(),
    color: 'lightblue',
    timestamp: new Date(),
  };
  io.emit('sockMessage', messFull);
  io.emit('sockMessage', mess);
}

// function sendIMEIandCMD(imei: string, cmd: string) {}
export function splitStringToArrayStar(inputString: string): string[] {
  return inputString.split('*').map((item) => item.trim());
}

export function splitStringToArrayComma(inputString: string): string[] {
  return inputString.split(',').map((item) => item.trim());
}

export function stringToHexCRC32(data: string): string {
  const dataWithout = data.split('*')[0];
  const dataWithoutChecksum = dataWithout + '*';
  console.log('datawihoutcehcksum', dataWithoutChecksum);
  const checksum = crc32.str(dataWithoutChecksum);
  // Ensure the checksum is always positive
  const uchecksum = checksum >>> 0; // Convert to unsigned 32-bit integer
  return uchecksum.toString(16).toUpperCase();
}

let socketArr: net.Socket[] = [];

function onSocketData(socket: net.Socket, container: SocketContainer, io: Server, data: Buffer) {
  console.log(`Data received: ${data.toString()}`);
  const strData = data.toString();
  const dataStarArr = splitStringToArrayStar(strData);
  const dataCommaArr = splitStringToArrayComma(strData);
  console.log('the data comma array is ', dataCommaArr);
  console.log('the data array is ', dataStarArr);
  const checksum = stringToHexCRC32(strData);
  console.log('checksum is', checksum);
  console.log('the received checksum is ', dataStarArr[1]);
  console.log('the socket map is ', sockMap);

  console.log('checksum valid');
  console.log('the version is ', dataCommaArr[1]);

  if (dataCommaArr[1] == 'v1') {
    console.log('this is v1');
    const commaSep = splitStringToArrayComma(strData);
    console.log('comma separated', commaSep);

    if (commaSep[0] === '$LIN') {
      if (commaSep.length == 12) {
        // console.log(checksum)
        // const checksumSeperateStar=
        if (checksum === dataStarArr[1]) {
          const loginPacketBody: ReqLoginPacket = {
            checksum: commaSep[11],
            firmwareVersion: commaSep[6],
            imei: commaSep[5],
            latitude: Number(commaSep[10]),
            longitude: Number(commaSep[8]),
            packetHeader: commaSep[0],
            protocolVersion: commaSep[7],
            vehicleRegNo: commaSep[4],
            vendorId: commaSep[3],
            version: commaSep[1],
            deviceType: commaSep[2],
          };
          // if (commaSep[0] === '$TP') {}
          // ****************

          const loginPacketInstance = new LoginPacketController();
          const packetSave = loginPacketInstance.saveLoginPacket(loginPacketBody);
          console.log('this is the saved packet', packetSave);

          console.log('this is the imei i wanna see', commaSep[5]);
          // socketArr.splice(socket);
          // console.log('the socket array is now 1', socketArr);
          for (const [index, sock] of socketArr.entries()) {
            console.log(`the socket BEFORE ${index} address is`, sock.address());
          }
          const socketToRemove = socket;
          // console.log('this is the socket', socket);
          socketArr = socketArr.filter((s) => s !== socketToRemove);

          // socketArr = socketArr.filter((socket) => socket !== socket);
          for (const [index, sock] of socketArr.entries()) {
            console.log(`the socket ${index} address is`, sock.address());
          }

          sockMap.set(loginPacketBody.imei, container);
          console.log('the socket map is IN THE $LIN BLOCK', sockMap);

          for (const [imei, sockContainer] of sockMap.entries()) {
            const sock = sockContainer.socket;
            console.log(`the imei number is ${imei} addr is `, sock.remoteAddress, sock.remotePort);
          }
          // console.log('the socket map is now', sockMap);
          // Emit the loginPacketBody to the Socket.IO server
          console.log('Emitting lpMessage: ', loginPacketBody);
          io.emit('lpMessage', loginPacketBody);
          const imeiPacketBody = {
            imei: commaSep[5] || socket.remoteAddress + ':' + socket.remotePort,
            packet: data.toString(),
            deviceType: commaSep[2],
            timestamp: new Date(),
            color: 'lightblue',
          };
          const checksum = stringToHexCRC32('#LIN,OK*');
          const okLin = {
            imei: commaSep[5],
            deviceType: commaSep[2],
            timestamp: new Date(),
            packet: '#LIN,OK*' + checksum,
            color: 'lightgreen',
          };
          socket.write(okLin.packet.toString())
          io.emit('sockMessage', imeiPacketBody);
          io.emit('sockMessage', okLin);
        } else {
          console.log('checksum invalid in lin block');
          sendNegInvalidChecksum(socket, '#LIN', io, data.toString());
        }
      } else {
        sendNegInvalidPacketFormat(socket, '#LIN', io, data.toString());
      }
    }
    // else if ((commaSep[0] = '$EMR')) {

    // } else if ((commaSep[0] = '$EPB')) {
    // }
    else if (commaSep[0] === '$GF1') {
      if (commaSep.length == 17) {
        if (checksum === dataStarArr[1]) {
          const imeiPacketBody = {
            imei: commaSep[5] || socket.remoteAddress + ':' + socket.remotePort,
            packet: data.toString(),
            // deviceType: commaSep[2],
            timestamp: new Date(),
            color: 'lightblue',
          };
          const checksum = stringToHexCRC32('#GF1,OK*');
          const okGf1 = {
            imei: commaSep[5],
            // deviceType: commaSep[2],
            timestamp: new Date(),
            packet: '#GF1,OK*' + checksum,
            color: 'lightgreen',
          };
          io.emit('sockMessage', imeiPacketBody);
          socket.write(okGf1.toString());
          io.emit('sockMessage', okGf1);
        } else {
          console.log('invalid checksum');
          sendNegInvalidChecksum(socket, '#GF1', io, data.toString());
        }
      }
    } else if (commaSep[0] === '$GF2') {
      if (commaSep.length == 17) {
        if (checksum === dataStarArr[1]) {
          const imeiPacketBody = {
            imei: commaSep[5] || socket.remoteAddress + ':' + socket.remotePort,
            packet: data.toString(),
            // deviceType: commaSep[2],
            timestamp: new Date(),
            color: 'lightblue',
          };
          const checksum = stringToHexCRC32('#GF2,OK*');
          const okGf2 = {
            imei: commaSep[5],
            // deviceType: commaSep[2],
            timestamp: new Date(),
            packet: '#GF2,OK*' + checksum,
            color: 'lightgreen',
          };
          io.emit('sockMessage', imeiPacketBody);
          socket.write(okGf2.toString());
          io.emit('sockMessage', okGf2);
        } else {
          console.log('invalid checksum');
          sendNegInvalidChecksum(socket, '#GF2', io, data.toString());
        }
      } else {
        sendNegInvalidPacketFormat(socket, '#GF2', io, data.toString());
      }
    } else if (commaSep[0] === '#CONFIG') {
      container.dataEventHandler.send(data.toString());
      // eslint-disable-next-line
      const socketKey = [...sockMap.entries()].find(([_, value]) => value.socket === socket)?.[0]; //disable es-lint
      // console.log(key);
      const mess = {
        imei: socketKey || socket.remoteAddress + ':' + socket.remotePort,
        packet: data.toString(),
        color: '#CBC3E3',
        date: new Date(),
      };
      io.emit('sockMessage', mess);
    } else if (commaSep[0] === '$HMP') {
      if (commaSep.length != 15) {
        if (checksum === dataStarArr[1]) {
          console.log('the socket map is in $HMP BLOCK', sockMap);

          for (const [imei, sockContainer] of sockMap) {
            console.log('the socket imei is ', imei, 'and ', sockContainer.socket.address());
          }
          console.log('the list of sockets connected is ', sockMap);
          console.log('this is the socket i am expecting ', sockMap.get(commaSep[4]));
          console.log('this is the imei i am getting ', commaSep[4]);
          // container.dataEventHandler.send(data.toString());
          // const i = 0;
          for (const [index, comma] of commaSep.entries()) {
            console.log(`the index is ${index} and the value is ${comma}`);
          }
          if (sockMap.has(commaSep[4])) {
            const commaStarSep = splitStringToArrayStar(commaSep[13]);

            //checkking for imei
            const hmpBody: ReqHMP = {
              analogInput1Status: Number(commaSep[12]),
              analogInput2Status: Number(commaStarSep[0]),
              batteryPercentage: Number(commaSep[5]),
              checksum: commaStarSep[1],
              dataUpdateRateWhenIgnitionOff: Number(commaSep[9]),
              dataUpdateRateWhenIgnitionOn: Number(commaSep[10]),
              digitalInputStatus: commaSep[11],
              firmwareVersion: commaSep[3],
              header: commaSep[0],
              imei: commaSep[4],
              lowBatteryThresholdPercentage: Number(commaSep[6]),
              memoryPercentage1: Number(commaSep[7]),
              memoryPercentage2: Number(commaSep[8]),
              vendorId: commaSep[2],
              version: commaSep[1],
            };
            io.emit('hpMessage', hmpBody);
            const mess = {
              packet: data.toString(),
              imei: commaSep[4],
              color: 'lightblue',
              timestamp: new Date(),
            };
            const checksum = stringToHexCRC32('#HMP,OK*');
            const okHmp = {
              imei: commaSep[5],
              deviceType: commaSep[2],
              timestamp: new Date(),
              packet: '#HMP,OK*' + checksum,
              color: 'lightgreen',
            };
            socket.write(okHmp.packet.toString())
            io.emit('sockMessage', mess);
            io.emit('sockMessage', okHmp);
            const healthControllerInstance = new HMPController();
            healthControllerInstance.saveHmp(hmpBody);
          } else {
            console.log('this socket is not logged in ');

            socket.write('YOU NEED TO LOGIN TO BE ABLE TO SEND A PACKET');
            return { message: 'this socket is not logged in' };
          }
        } else {
          console.log('invalid checksum');
          sendNegInvalidChecksum(socket, '#HMP', io, data.toString());
        }
      } else {
        sendNegInvalidPacketFormat(socket, '#HMP', io, data.toString());
      }
    } else if (commaSep[0] === '$TP') {
      // Check if the packet starts with "$TRP"
      // if(){
      if (commaSep.length >= 0) {
        // Assuming 35 is the minimum length based on the number of parameters
        const checksum = dataStarArr[1];
        if (checksum === dataStarArr[1]) {
          // Validate checksum
          console.log('The socket map is in $TRP BLOCK', sockMap);

          // Log connected sockets
          for (const [imei, sockContainer] of sockMap) {
            console.log('Socket IMEI:', imei, 'Socket Address:', sockContainer.socket.address());
          }
          console.log('List of connected sockets:', sockMap);
          console.log('Expected socket for IMEI:', sockMap.get(commaSep[8])); // IMEI assumed to be at index 8
          console.log('Received IMEI:', commaSep[8]);

          // Debugging: log each comma-separated value
          for (const [index, comma] of commaSep.entries()) {
            console.log(`Index: ${index}, Value: ${comma}`);
          }

          // if (sockMap.has(commaSep[7])) {
          // Check if the IMEI is registe#E04D38 in sockMap
          // Create ReqTrackingPacket object
          // const trackingBody: ReqTrackingPacket = {
          //   startCharacter: commaSep[0], // "*"
          //   version: commaSep[1], // "1.0"
          //   packetHeader: commaSep[2], // "123ABC"
          //   vendorId: commaSep[3], // "XYZ"
          //   firmwareVersion: commaSep[4], // "FW123"
          //   packetType: commaSep[5], // "A"
          //   messageId: Number(commaSep[6]), // 1
          //   packetStatus: commaSep[7], // "S"
          //   imei: commaSep[8], // "123456789012345"
          //   vehicleRegNo: commaSep[9], // "ABC123"
          //   gpsFix: Number(commaSep[10]), // 1
          //   date: commaSep[11], // "20241122"
          //   time: commaSep[12], // "123456"
          //   latitude: Number(commaSep[13]), // 12.3456
          //   latitudeDir: commaSep[14], // "N"
          //   longitude: Number(commaSep[15]), // 78.9012
          //   longitudeDir: commaSep[16], // "E"
          //   speed: Number(commaSep[17]), // 60.5
          //   heading: Number(commaSep[18]), // 90.0
          //   noOfSatellites: Number(commaSep[19]), // 10
          //   altitude: Number(commaSep[20]), // 150
          //   pdop: Number(commaSep[21]), // 0.9
          //   hdop: Number(commaSep[22]), // 0.8
          //   networkOperatorName: commaSep[23], // "Network1"
          //   ignitionStatus: Number(commaSep[24]), // 1
          //   mainPowerStatus: Number(commaSep[25]), // 1
          //   mainInputVoltage: Number(commaSep[26]), // 12.5
          //   internalBatteryVoltage: Number(commaSep[27]), // 3.7
          //   emergencyStatus: Number(commaSep[28]), // 0
          //   tamperAlert: commaSep[29], // "N"
          //   gsmSignalStrength: Number(commaSep[30]), // 23
          //   mccServing: Number(commaSep[31]), // 123
          //   mncServing: Number(commaSep[32]), // 45
          //   lacServing: commaSep[33], // "1001"
          //   cellIdServing: commaSep[34], // "2002"
          //   gsmSignalStrengthNmr1stNeighbour: Number(commaSep[35]), // 18
          //   lacNmr1stNeighbour: commaSep[36], // "1003"
          //   cellIdNmr1stNeighbour: commaSep[37], // "2004"
          //   gsmSignalStrengthNmr2ndNeighbour: Number(commaSep[38]), // 19
          //   lacNmr2ndNeighbour: commaSep[39], // "1005"
          //   cellIdNmr2ndNeighbour: commaSep[40], // "2006"
          //   digitalInputStatus: commaSep[41], // "01"
          //   digitalOutputStatus: commaSep[42], // "02"
          //   frameNumber: Number(commaSep[43]), // 10
          //   analogInput1: Number(commaSep[44]), // 4.5
          //   analogInput2: Number(commaSep[45]), // 3.3
          //   deltaDistance: Number(commaSep[46]), // 500
          //   otaResponse: commaSep[47], // "Success"
          //   endCharacter: commaSep[48], // "#"
          //   checksum: checksum, // "1234ABCD"
          // };

          // Emit the tracking packet data
          // io.emit('tpMessage', data);
          let lad: 'N' | 'S';
          let lod: 'E' | 'W';
          let dummy: Coordinates;
          if ((commaSep[13] == 'N' || commaSep[13] == 'S') && (commaSep[15] == 'W' || commaSep[15] == 'E')) {
            lad = commaSep[13];
            lod = commaSep[15];
            dummy = {
              latitude: Number(commaSep[12]),
              longitude: Number(commaSep[14]),
              latDir: lad,
              longDir: lod,
            };
            io.emit('tpMessage', dummy);
          }

          const imeiPacketBody = {
            imei: commaSep[7] || socket.remoteAddress + ':' + socket.remotePort,
            packet: data.toString(),
            // deviceType: ,
            color: 'lightblue',
            timestamp: new Date(),
          };
          const checksum = stringToHexCRC32('#TP,OK*');
          const okTp = {
            imei: commaSep[7],
            deviceType: commaSep[2],
            timestamp: new Date(),
            packet: '#TP,OK*' + checksum,
            color: 'lightgreen',
          };
          io.emit('sockMessage', okTp);
          io.emit('sockMessage', imeiPacketBody);
          socket.write(okTp.packet.toString())
          // Save the tracking packet using the controller
          // const trackingControllerInstance = new TrackingPacketController();
          // trackingControllerInstance
          //   .saveTrackingPacket(trackingBody)
          //   .then(() => console.log('Tracking packet saved successfully'))
          //   .catch((err) => console.error('Error saving tracking packet:', err));
        } else {
          console.log('Invalid checksum');
          sendNegInvalidChecksum(socket, commaSep[0], io, data.toString()); // Function to notify invalid checksum
        }
        // else{

        // }
      } else {
        sendNegInvalidPacketFormat(socket, commaSep[0], io, data.toString()); // Function to notify invalid packet format
      }
    }
    // else if (commaSep[0] === '$EPB') {
    // } else if (commaSep[0] == '$EMR') {
    // }
    else {
      // sendNegInvalidHeader(socket, commaSep[0], io);
      // eslint-disable-next-line
      const socketKey = [...sockMap.entries()].find(([_, value]) => value.socket === socket)?.[0]; //disable es-lint

      const mess = {
        packet: data.toString(),
        imei: socketKey,
        color: 'lightblue',
        timestamp: new Date(),
      };
      io.emit('sockMessage', mess);
    }
  }
  return { '###REACHED THE END HERE***': 'ubefgoue' };
}
let io: Server;
export function initSocketIOFeatures(httpServer: http.Server) {
  if (!io) {
    io = new Server(httpServer, {
      cors: {
        origin: '*', // Allow all origins for simplicity
      },
    });

    // Event listener for connection to the Socket.IO server
    io.on('connect', (socket: Socket) => {
      console.log('A client connected to server using: ', socket.handshake.address);
      console.log('the list of sockets connected is ', sockMap);

      // socketArr.push(socket);
      // console.log('Total clients after addition: ', socketArr.length);
    });

    io.on('close', (socket: Socket) => {
      console.log('A Client gone: ', socket.handshake.address);
      socketArr = socketArr.filter((socket) => socket !== socket);
      console.log('Total clients after remove: ', socketArr.length);
    });

    const server = net.createServer((socket: net.Socket) => {
      console.log('Client connected:', socket.remoteAddress, socket.remotePort);
      socketArr.push(socket);
      // eslint-disable-next-line

      const container = new SocketContainer(socket);
      // for (const sock of socketArr) {
      //   console.log('the cleint is, ', sock.remoteAddress);
      // }
      // console.log(socketArr);
      // Event listener for incoming data
      socket.on('data', (data: Buffer) => {
        onSocketData(socket, container, io, data);
      });

      // Event listener for client disconnection
      socket.on('end', () => {
        // eslint-disable-next-line
        const socketKey = [...sockMap.entries()].find(([_, value]) => value.socket === socket)?.[0]; //disable es-lint
        // console.log(key);
        console.log('the client i wanna see here is =====>', socketKey);
        const mess = {
          imei: socketKey || socket.remoteAddress + ':' + socket.remotePort,
          packet: 'CLIENT DISCONNECTED: ' + socketKey,
          color: 'yellow',
          timestamp: new Date(),
        };
        io.emit('sockMessage', mess);
        console.log('Client disconnected');
      });

      // Event listener for errors
      socket.on('error', (err) => {
        console.error(`Error: ${err.message}`);
      });
    });

    server.on('connection', (socket) => {
      console.log('the on connect block has started');
      // eslint-disable-next-line
      const socketKey = [...sockMap.entries()].find(([_, value]) => value.socket === socket)?.[0]; //disable es-lint
      // console.log(key);
      console.log('the on connect block has reached here');

      const mess = {
        imei: socketKey || socket.remoteAddress + ':' + socket.remotePort,
        packet: 'CLIENT CONNECTED: ' + socket.remoteAddress + ':' + socket.remotePort,
        // socketKey,
        color: 'yellow',
        timestamp: new Date(),
      };
      console.log('the on connect block has reached here 2');

      console.log('this is the message i wanna send******=====>', mess);
      io.emit('sockMessage', mess);
    });

    // Start the server
    server.listen(TCP_PORT, HOST, () => {
      console.log(`Server listening on ${HOST}:${TCP_PORT}`);
    });

    // Event listener for server errors
    server.on('error', (err) => {
      console.error(`Server error: ${err.message}`);
    });
  }
}

export function getGlobalSocketIOInstance(): Server {
  if (!io) {
    throw new Error('Socket.IO instance is not initialized!');
  }
  return io;
}
