// import * as net from 'net';
// const net = require('net');
// Define the port and host the server will listen on
// import * as net from 'net'
import * as crc32 from 'crc-32';
import { ReqLoginPacket } from './models/req/ReqLoginPacket';
import { LoginPacketController } from './controller/LoginPacketController';
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
export function tcpServer(net: typeof import('net')) {
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
        const loginPacketBody: ReqLoginPacket = {
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
        const loginPacketInstance = new LoginPacketController();

        const packetSave = loginPacketInstance.saveLoginPacket(loginPacketBody);

        console.log(packetSave);

        return;
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
