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
exports.encryptMessageFixedIV = encryptMessageFixedIV;
exports.decryptMessageFixedIV = decryptMessageFixedIV;
const crypto = __importStar(require("crypto"));
// export function encryptPassword(password: string, encryptionKey: string): string {
//     const iv = crypto.randomBytes(16); // Generate a random IV (Initialization Vector)
//     const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
//     let encryptedPassword = cipher.update(password, 'utf8', 'hex');
//     encryptedPassword += cipher.final('hex');
//     return encryptedPassword;
//   }
// Function to encrypt a message with a fixed IV
function encryptMessageFixedIV(message, encryptionKey, iv) {
    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
    let encryptedMessage = cipher.update(message, 'utf8', 'hex');
    encryptedMessage += cipher.final('hex');
    return encryptedMessage;
}
// Function to decrypt a message with a fixed IV
function decryptMessageFixedIV(encryptedMessage, encryptionKey, iv) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
    let decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf8');
    decryptedMessage += decipher.final('utf8');
    return decryptedMessage;
}
//# sourceMappingURL=encfunc.js.map