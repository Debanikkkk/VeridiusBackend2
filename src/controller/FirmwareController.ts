// import { Controller, Delete, Get, Path, Post, Query, Request, Route, Security, Tags, UploadedFile } from 'tsoa';
// import { AppDataSource } from '../data-source';
// import { Firmware, firmware_management } from '../entity/Firmware';
// // import { ReqFirmware } from '../models/req/ReqFirmware';
// // import { ResFirmware } from '../models/res/ResFirmware';
// import { ResError } from '../models/res/Responses';
// import { ResFirmware } from '../models/res/ResFirmware';
// // import { ReqFirmware } from '../models/req/ReqFirmware';
// import { JWTRequest } from '../models/req/JWTRequest';
// import path from 'path';
// import fs from 'fs';
// import { User } from '../entity/User';

// @Tags('Firmware')
// @Route('/firmware')
// export class FirmwareController extends Controller {
//   private firmwareRepository = AppDataSource.getRepository(Firmware);
//   private userrepository = AppDataSource.getRepository(User);
//   @Get('/{firmwareId}')
//   public async getOneFirmware(@Path() firmwareId: number): Promise<ResFirmware | ResError> {
//     const firmware = await this.firmwareRepository
//       .findOne({
//         where: {
//           id: firmwareId,
//         },
//         relations: {
//           created_by: true,
//         },
//       })
//       .then((fw) => {
//         if (!fw) {
//           return Promise.reject(new Error('firmware not found'));
//         }

//         const user = fw.created_by;

//         const resFirmware: ResFirmware = {
//           createdAt: fw.created_at,
//           file: fw.file,
//           firmwareVersion: fw.firmware_version,
//           id: fw.id,
//           isActive: fw.is_active,
//           updatedAt: fw.updated_at,
//           uploadedBy: {
//             address: user?.address,
//             // device: user.,
//             email: user?.email,
//             id: user?.id,
//             // is_under: user.,
//             name: user?.name,
//             password: user?.password,
//             phone_number: user?.phone_number,
//             //  role: user.role,
//             //  service_ticket: user?.service_ticket
//           },
//           // vehicleId
//         };
//         return resFirmware;
//       });
//     return firmware;
//   }
//   @Get()
//   public async getAllFirmwares(): Promise<ResFirmware[] | ResError> {
//     const firmwares = await this.firmwareRepository.find({
//       relations: {
//         // uploaded_by: true,
//         created_by: true,
//       },
//     });

//     if (!firmwares) {
//       return { error: 'no firmwares found' };
//     }

//     const firmwareArr: ResFirmware[] = [];

//     for (const firmware of firmwares) {
//       const user = await firmware.created_by;
//       firmwareArr.push({
//         createdAt: firmware.created_at,
//         file: firmware.file,
//         firmwareVersion: firmware.firmware_type,
//         id: firmware.id,
//         isActive: firmware.is_active,
//         updatedAt: firmware.updated_at,
//         uploadedBy: {
//           address: user?.address,
//           // device: user?.,
//           email: user?.email,
//           id: user?.id,
//           // is_under: user?.,
//           name: user?.name,
//           password: user?.password,
//           phone_number: user?.phone_number,
//           // role: user?.,
//           // service_ticket: user?.
//         },
//         // uploadedBy: firmware.uploaded_by,
//         // vehicleId: firmware.ve,
//       });
//     }
//     return firmwareArr;
//   }

//   @Post()
//   @Security('Api-Token', [])
//   public async saveFirmware(
//     @UploadedFile() file: Express.Multer.File,
//     @Query() firmwareVersion: string,
//     @Query() firmwareType: firmware_management,
//     @Query() isActive: boolean,
//     @Query() fileName: string,

//     @Request() req: JWTRequest,
//   ): Promise<ResFirmware> {
//     const user = await this.userrepository.findOne({
//       where: {
//         id: req.user.id,
//       },
//     });
//     if (!user) {
//       return Promise.reject(new Error('THIS USER WAS NOT FOUND'));
//     }
//     const uploadDir = path.join(__dirname, '../../public/ecuUploads');

//     // Ensure directory exists
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }

//     // Create a unique filename and save the file
//     // const uniqueFilename = `${Date.now()}-${file.originalname}`;
//     const filePath = path.join(uploadDir, fileName);

//     const firmwareToSave: Firmware = {
//       // created_at,
//       // ecus,
//       file: filePath,
//       file_name: fileName,
//       firmware_type: firmwareType,
//       firmware_version: firmwareVersion,
//       // id,
//       is_active: isActive,
//       // updated_at,
//       created_by: user,
//     };

//     fs.writeFileSync(filePath, file.buffer);
//     const savedFirmware = await this.firmwareRepository.save(firmwareToSave);

//     return savedFirmware;
//   }

//   @Delete('/{firmwareId}')
//   public async deleteFirmware(@Path() firmwareId: number) {
//     const firmwareToDelete = await this.firmwareRepository.findOne({
//       where: {
//         id: firmwareId,
//       },
//     });
//     if (!firmwareToDelete) {
//       return Promise.reject(new Error('FIRMWARE TO DELETE NOT FOUND'));
//     }

//     await this.firmwareRepository.remove(firmwareToDelete);
//     return { result: 'FIRMWARE WAS DELETED SUCCESSFULLY' };
//   }
// }
