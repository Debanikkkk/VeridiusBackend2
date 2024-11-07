import * as crypto from 'crypto';
// export function encryptPassword(password: string, encryptionKey: string): string {
//     const iv = crypto.randomBytes(16); // Generate a random IV (Initialization Vector)
//     const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
//     let encryptedPassword = cipher.update(password, 'utf8', 'hex');
//     encryptedPassword += cipher.final('hex');
//     return encryptedPassword;
//   }

// Function to encrypt a message with a fixed IV
export function encryptMessageFixedIV(message: string, encryptionKey: Buffer, iv: Buffer): string {
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  let encryptedMessage = cipher.update(message, 'utf8', 'hex');
  encryptedMessage += cipher.final('hex');
  return encryptedMessage;
}

// Function to decrypt a message with a fixed IV
export function decryptMessageFixedIV(encryptedMessage: string, encryptionKey: Buffer, iv: Buffer): string {
  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
  let decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf8');
  decryptedMessage += decipher.final('utf8');
  return decryptedMessage;
}
