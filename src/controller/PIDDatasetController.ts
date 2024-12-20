import { Controller } from 'tsoa';
import { AppDataSource } from '../data-source';
import { PIDDataset } from '../entity/PIDDataset';

export class PIDDatasetController extends Controller {
  private piddatasetcontroller = AppDataSource.getRepository(PIDDataset);
}
