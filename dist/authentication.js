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
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAuthentication = void 0;
const jwt = __importStar(require("jsonwebtoken"));
// import { AuthorizationError, ResponseError } from './models/res/ResErrors';
const ResErrors_1 = require("./models/res/ResErrors");
// import { envs } from './utils/envVars';
const envVars_1 = require("./utils/envVars");
function expressAuthentication(request, securityName, scopes) {
    if (securityName === 'Api-Token') {
        const token = request.body.token || request.query.token || request.headers['x-api-key'];
        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new ResErrors_1.ResponseError(403, 'Authorization required'));
            }
            // eslint-disable-next-line
            jwt.verify(token, envVars_1.envs.JWT_SECRET_KEY, function (err, decoded) {
                if (err) {
                    reject(err);
                }
                else {
                    const td = decoded;
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
    return Promise.reject(new ResErrors_1.AuthorizationError('Invalid Authentication'));
}
exports.expressAuthentication = expressAuthentication;
// "monitor": "concurrently \"nodemon\" \"nodemon -x tsoa spec-and-routes\""
//# sourceMappingURL=authentication.js.map