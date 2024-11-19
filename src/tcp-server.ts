import * as crc32 from 'crc-32';
import { ReqLoginPacket } from './models/req/ReqLoginPacket';
import { LoginPacketController } from './controller/LoginPacketController';
import { Server, Socket } from 'socket.io'; // Import the Socket.IO client
import net from 'net';
// import { log } from 'console';
const socketArr: Socket[] = [];
// const map = new Map<Socket[], string>();
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

// let socketArr: Socket[] = [];

export function initSocketIOFeatures() {
  // Event listener for connection to the Socket.IO server
  io.on('connect', (socket: Socket) => {
    console.log('A client connected to server using: ', socket.handshake.address);
    socketArr.push(socket);
    console.log('Total clients after addition: ', socketArr.length);
  });

  io.on('close', (socket: Socket) => {
    console.log('A Client gone: ', socket.handshake.address);
    // socketArr = socketArr.filter((item) => item !== socket);
    console.log('Total clients after remove: ', socketArr.length);
  });

  const HOST: string = '0.0.0.0';
  const PORT: number = 8083;
  const server = net.createServer((socket: net.Socket) => {
    console.log('Client connected:', socket.remoteAddress, socket.remotePort);

    // Event listener for incoming data
    socket.on('data', (data) => {
      console.log(`Data received: ${data.toString()}`);
      const strData = data.toString();
      const dataArr = splitStringToArrayStar(strData);
      console.log('star array', dataArr);
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
