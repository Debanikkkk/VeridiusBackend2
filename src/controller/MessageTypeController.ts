import { Controller, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { MessageType } from '../entity/MessageType';
@Route('/message_type')
@Tags('Message Type')
export class MessageTypeController extends Controller {
  private messageTypeRepository = AppDataSource.getRepository(MessageType);

  @Post()
  public async saveMessageType() {}
}
