import * as crc32 from 'crc-32';
import { ReqLoginPacket } from './models/req/ReqLoginPacket';
import { LoginPacketController } from './controller/LoginPacketController';
import { Server, Socket } from 'socket.io'; // Import the Socket.IO client
import net from 'net';
// import { log } from 'console';
// const socketArr: net.Socket[] = [];
const sockMap = new Map<string, net.Socket>();
function splitStringToArrayStar(inputString: string): string[] {
  return inputString.split('*').map((item) => item.trim());
}

function splitStringToArrayComma(inputString: string): string[] {
  return inputString.split(',').map((item) => item.trim());
}

function stringToHexCRC32(data: string): string {
  const dataWithout = data.split('*')[0];
  const dataWithoutChecksum = dataWithout + '*';
  console.log('datawihoutcehcksum', dataWithoutChecksum);
  const checksum = crc32.str(dataWithoutChecksum);
  return checksum.toString(16).toUpperCase();
}

const io: Server = new Server(5001, {
  cors: {
    origin: '*', // Allow all origins for simplicity
  },
});

let socketArr: net.Socket[] = [];

export function initSocketIOFeatures() {
  // Event listener for connection to the Socket.IO server
  io.on('connect', (socket: Socket) => {
    console.log('A client connected to server using: ', socket.handshake.address);
    // socketArr.push(socket);
    // console.log('Total clients after addition: ', socketArr.length);
  });

  io.on('close', (socket: Socket) => {
    console.log('A Client gone: ', socket.handshake.address);
    socketArr = socketArr.filter((socket) => socket !== socket);
    console.log('Total clients after remove: ', socketArr.length);
  });

  const HOST: string = '0.0.0.0';
  const PORT: number = 8083;
  const server = net.createServer((socket: net.Socket) => {
    console.log('Client connected:', socket.remoteAddress, socket.remotePort);
    socketArr.push(socket);
    // for (const sock of socketArr) {
    //   console.log('the cleint is, ', sock.remoteAddress);
    // }
    // console.log(socketArr);
    // Event listener for incoming data
    socket.on('data', (data) => {
      console.log(`Data received: ${data.toString()}`);
      const strData = data.toString();
      const dataArr = splitStringToArrayStar(strData);
      const dataCommaArr = splitStringToArrayComma(strData);
      console.log('the data comma array is ', dataCommaArr);
      console.log('the data array is ', dataArr);
      const checksum = stringToHexCRC32(strData);
      console.log('checksum is', checksum);
      console.log('the received checksum is ', dataArr[1]);

      if (checksum === dataArr[1]) {
        console.log('checksum valid');

        const commaSep = splitStringToArrayComma(strData);
        console.log('comma separated', commaSep);
        if (commaSep[0] === '$LIN') {
          const loginPacketBody: ReqLoginPacket = {
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
          // if (commaSep[0] === '$TP') {}
          // ****************

          const loginPacketInstance = new LoginPacketController();
          const packetSave = loginPacketInstance.saveLoginPacket(loginPacketBody);
          console.log('this is the saved packet', packetSave);
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

          sockMap.set(loginPacketBody.imei, socket);
          for (const [imei, sock] of sockMap.entries()) {
            console.log(`the imei number is ${imei} addr is `, sock.remoteAddress, sock.remotePort);
          }
          // console.log('the socket map is now', sockMap);
          // Emit the loginPacketBody to the Socket.IO server
          io.emit('lpMessage', loginPacketBody);
        }

        return { '###REACHED THE END HERE***': 'ubefgoue' };
      } else {
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
