import { Body, Controller, Path, Post, Put, Query, Route, Tags, UploadedFile } from 'tsoa';
import { AppDataSource } from '../data-source';
import { ECUFlash } from '../entity/ECUFlash';
import path from 'path';
import fs from 'fs';
import { ReqDevConStatus } from '../models/req/ReqDevConStatus';
@Route('/ecuFlashFile')
@Tags('ECU Flash  File')
export class FlashFileController extends Controller {
  private flashfilerepository = AppDataSource.getRepository(ECUFlash);

  @Post()
  public async saveFlash(@UploadedFile() file: Express.Multer.File, @Query() fileName: string) {
    if (!file) {
      this.setStatus(400); // Bad Request
      return { message: 'No file uploaded' };
    }

    // Define the upload directory
    const uploadDir = path.join(__dirname, '../../public/ecuUploads');

    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Create a unique filename and save the file
    // const uniqueFilename = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadDir, fileName);
    const flashFileToSave: ECUFlash = {
      flash_file_name: fileName,
      flash_file_path: uploadDir + '/' + fileName,
      // id,
      // status
    };

    // Move file to the upload directory
    fs.writeFileSync(filePath, file.buffer); // Use file buffer
    const flashFileSaver = Object.assign(new ECUFlash(), flashFileToSave);
    const savedFlashFile = await this.flashfilerepository.save(flashFileSaver);
    return savedFlashFile;
  }

  @Put('/{flashFileId}')
  public async flashFileStatusChange(@Path() flashFileId: number, @Body() req: ReqDevConStatus) {
    const oldFlash = await this.flashfilerepository.findOne({
      where: {
        id: flashFileId,
      },
    });
    const { devConnStatus } = req;
    if (!oldFlash) {
      return Promise.reject(new Error('THE FLASH FILE WAS NOT FOUND'));
    }

    oldFlash.status = devConnStatus;

    const newFlash = await this.flashfilerepository.save(oldFlash);

    return newFlash;
  }
}
