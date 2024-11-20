import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { sockMap } from '../tcp-server';
interface SendCommandRequest {
  imei: string;
  cmd: string;
}
// @Route('/cmd')
@Route('/cmd')
@Tags('CMD_IMEI')
export class IMEICMDController extends Controller {
  @Post('/send')
  public async sendCommand(@Body() body: SendCommandRequest) {
    const { imei, cmd } = body;
    console.log('thijs is the socket map from the tcp-server here in the damn controller file', sockMap);
    const socketContainer = sockMap.get(imei);

    if (socketContainer) {
      console.log(`Sending command "${cmd}" to client with IMEI: ${imei}`);
      socketContainer.sendDataToDevice(cmd.toString());
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
    // return messageString;
  }
}
