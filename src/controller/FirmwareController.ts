import { Body, Controller, Delete, Get, Path, Post, Put, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Firmware } from '../entity/Firmware';
// import { ReqFirmware } from '../models/req/ReqFirmware';
// import { ResFirmware } from '../models/res/ResFirmware';
import { ResSuccess, ResError } from '../models/res/Responses';
import { ResFirmware } from '../models/res/ResFirmware';
import { ReqFirmware } from '../models/req/ReqFirmware';

@Tags('Firmware')
@Route('/firmware')
export class FirmwareController extends Controller {
  private firmwareRepository = AppDataSource.getRepository(Firmware);

  @Get('/{firmwareId}')
  public async getOneFirmware(@Path() firmwareId: number): Promise<ResFirmware | ResError> {
    const firmware = await this.firmwareRepository.findOne({
      where: { id: firmwareId },
      relations: ['vehicle'],
    });

    if (!firmware) {
      return { error: 'firmware not found' };
    }

    return {
      id: firmware.id!,
      firmwareVersion: firmware.firmware_version,
      file: firmware.file,
      createdAt: firmware.created_at,
      updatedAt: firmware.updated_at,
      uploadedBy: firmware.uploaded_by,
      isActive: firmware.is_active,
      vehicleId: firmware.vehicle?.id,
    };
  }

  @Get()
  public async getAllFirmwares(): Promise<ResFirmware[] | ResError> {
    const firmwares = await this.firmwareRepository.find({ relations: ['vehicle'] });

    if (!firmwares) {
      return { error: 'no firmwares found' };
    }

    return firmwares.map((firmware) => ({
      id: firmware.id!,
      firmwareVersion: firmware.firmware_version,
      file: firmware.file,
      createdAt: firmware.created_at,
      updatedAt: firmware.updated_at,
      uploadedBy: firmware.uploaded_by,
      isActive: firmware.is_active,
      vehicleId: firmware.vehicle?.id,
    }));
  }

  @Post()
  public async saveFirmware(@Body() request: ReqFirmware): Promise<ResFirmware> {
    const firmware = this.firmwareRepository.create({
      firmware_version: request.firmwareVersion,
      file: request.file,
      uploaded_by: request.uploadedBy,
      is_active: request.isActive,
    });

    const savedFirmware = await this.firmwareRepository.save(firmware);

    return {
      id: savedFirmware.id!,
      firmwareVersion: savedFirmware.firmware_version,
      file: savedFirmware.file,
      createdAt: savedFirmware.created_at,
      updatedAt: savedFirmware.updated_at,
      uploadedBy: savedFirmware.uploaded_by,
      isActive: savedFirmware.is_active,
      vehicleId: savedFirmware.vehicle?.id,
    };
  }

  @Put('/{firmwareId}')
  public async updateFirmware(@Path() firmwareId: number, @Body() request: ReqFirmware): Promise<ResFirmware> {
    const firmware = await this.firmwareRepository.findOne({ where: { id: firmwareId } });

    if (!firmware) {
      throw new Error('firmware not found');
    }

    firmware.firmware_version = request.firmwareVersion;
    firmware.file = request.file;
    firmware.uploaded_by = request.uploadedBy;
    firmware.is_active = request.isActive;

    const updatedFirmware = await this.firmwareRepository.save(firmware);

    return {
      id: updatedFirmware.id!,
      firmwareVersion: updatedFirmware.firmware_version,
      file: updatedFirmware.file,
      createdAt: updatedFirmware.created_at,
      updatedAt: updatedFirmware.updated_at,
      uploadedBy: updatedFirmware.uploaded_by,
      isActive: updatedFirmware.is_active,
      vehicleId: updatedFirmware.vehicle?.id,
    };
  }

  @Delete('/{firmwareId}')
  public async deleteFirmware(@Path() firmwareId: number): Promise<ResSuccess> {
    const firmware = await this.firmwareRepository.findOne({ where: { id: firmwareId } });

    if (!firmware) {
      throw new Error('firmware not found');
    }

    await this.firmwareRepository.remove(firmware);
    return { result: 'firmware deleted successfully' };
  }
}
