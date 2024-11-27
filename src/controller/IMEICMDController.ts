import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { getGlobalSocketIOInstance, sockMap } from '../tcp-server';
// import http from 'http';
interface SendCommandRequest {
  imei: string;
  cmd: string;
}

@Route('/cmd')
@Tags('CMD_IMEI')
export class IMEICMDController extends Controller {
  @Post('/send')
  public async sendCommand(@Body() body: SendCommandRequest) {
    const { imei, cmd } = body;
    console.log('This is the socket map from the TCP server', sockMap);
    const socketContainer = sockMap.get(imei);
    // const app = express();
    // const httpServer: http.Server = http.createServer(app);
    if (socketContainer) {
      console.log(`Sending command "${cmd}" to client with IMEI: ${imei}`);
      socketContainer.sendDataToDevice(cmd.toString());

      // Emit the message via Socket.IO
      const mess = {
        imei: imei,
        packet: cmd.toString(),
        color: 'orange',
        date: new Date(),
      };
      const io = getGlobalSocketIOInstance();
      io.emit('sockMessage', mess); // Use the server instance to emit
      console.log(`Message emitted via Socket.IO:`, mess);

      const response = await socketContainer.dataEventHandler.receiveWithWait(10000).then(
        (data) => {
          console.log(`Response from IMEI ${imei}:`, data);
          return data;
        },
        (error) => {
          console.log('Error while waiting for data: ', error);
          return { error: 'Error waiting for response from IMEI ' };
        },
      );

      return { response };
    } else {
      return { message: `No client found for IMEI: ${imei}` };
    }
  }
}
