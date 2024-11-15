import { Request } from 'express';
import { JWTTokenData } from '../TokenModel';

export interface JWTRequest extends Request {
  user: JWTTokenData;
}
