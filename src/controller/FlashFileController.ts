import { Controller, Post, Route, Tags, UploadedFile } from 'tsoa';
import { AppDataSource } from '../data-source';
import { ECUFlash } from '../entity/ECUFlash';
import path from 'path';
import fs from 'fs';
@Route('/ecuFlashFile')
@Tags('ECU Flash  File')
export class FlashFileController extends Controller {
  private flashfilerepository = AppDataSource.getRepository(ECUFlash);

  @Post()
  public async saveFlash(@UploadedFile() file: Express.Multer.File) {
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
    const uniqueFilename = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    // Move file to the upload directory
    fs.writeFileSync(filePath, file.buffer); // Use file buffer
    return { message: 'File uploaded successfully', filePath };
  }
}
