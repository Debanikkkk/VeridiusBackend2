import * as express from 'express';
import * as jwt from 'jsonwebtoken';
// import { AuthorizationError, ResponseError } from 'models/res/ResErrors';
import { AuthorizationError, ResponseError } from './models/res/ResErrors';
// import { JWTTokenData } from 'models/TokenModel';
import { JWTTokenData } from './models/TokenModel';
// import { envs } from 'utils/envVars';
import { envs } from './utils/envVars';
export function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<JWTTokenData> {
  if (securityName === 'Api-Token') {
    const token = request.body.token || request.query.token || request.headers['x-api-key'];

    return new Promise<JWTTokenData>((resolve, reject) => {
      if (!token) {
        reject(new ResponseError(403, 'Authorization required'));
      }
      // eslint-disable-next-line
      jwt.verify(token, envs.JWT_SECRET_KEY, function (err: any, decoded: any) {
        if (err) {
          reject(err);
        } else {
          const td: JWTTokenData = decoded;
          // Check if JWT contains all required scopes
          for (const scope of scopes ? scopes : []) {
            if (!td.role.permissions.includes(scope)) {
              reject(new Error('JWT does not contain required scope.'));
            }
          }
          resolve(td);
        }
      });
    });
  }
  return Promise.reject(new AuthorizationError('Invalid Authentication'));
}

// "monitor": "concurrently \"nodemon\" \"nodemon -x tsoa spec-and-routes\""
