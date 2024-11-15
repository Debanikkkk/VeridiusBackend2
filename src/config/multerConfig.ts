// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// const uploadDir = path.join('./public/uploads');
// // const uploadDir = `${__dirname}`;
// console.log('Upload dir', uploadDir);
// // Ensure the uploads directory exists
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (_req, _file, cb) => {
//     console.log('dest: ', _file, cb);
//     cb(null, uploadDir);
//   },
//   filename: (_req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     console.log('uniquesufice: ', uniqueSuffix, file, cb);
//     cb(null, `${uniqueSuffix}-${file.originalname}`);
//   },
// });

// export function handleFile(request: any, response: any): Promise<any> {
//   const multerSingle = multer({ storage }).single('file');
//   return new Promise((resolve, reject) => {
//     multerSingle(request, response, async (error) => {
//       if (error) {
//         reject(error);
//       }
//       resolve(undefined);
//     });
//   });
// }
