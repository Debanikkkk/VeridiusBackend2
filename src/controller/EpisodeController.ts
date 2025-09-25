import { Body, Controller, Delete, FormField, Get, Path, Post, Put, Query, Route, Tags, UploadedFile } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Episode } from '../entity/Episode';
import { Season } from '../entity/Season';
import { ResEpisode } from '../models/res/ResEpisode';
import { ReqEpisode } from '../models/req/ReqEpisode';
import path from 'path';
import fs from 'fs'
@Tags('Episodes')
@Route('/episodes')
export class EpisodeController extends Controller {
  private episodeRepository = AppDataSource.getRepository(Episode);
  private seasonRepository = AppDataSource.getRepository(Season);

  /**
   * Get all episodes by season ID
   * @summary Get episodes by season
   */
  @Get('/season/{seasonId}')
  public async getEpisodesBySeason(
    @Path() seasonId: number,
    @Query() page: number = 1,
    @Query() limit: number = 10
  ): Promise<{ items: ResEpisode[]; totalCount: number }> {
    const offset = (page - 1) * limit;
    
    const [episodes, totalCount] = await this.episodeRepository.findAndCount({
      where: { season: { id: seasonId } },
      relations: ['season'],
      skip: offset,
      take: limit,
      order: { id: 'ASC' }
    });

    const resEpisodes: ResEpisode[] = [];
    for (const episode of episodes) {
      const season = await episode.season;
      
      resEpisodes.push({
        id: episode.id,
        title: episode.title,
        episode_desc: episode.episode_desc,
        file: episode.file,
        thumbnail: episode.thumbnail,
        season: season ? {
          id: season.id,
          title: season.title,
          season_no: season.season_no
        } : undefined
      });
    }

    return {
      items: resEpisodes,
      totalCount
    };
  }

  /**
   * Get episode by ID
   * @summary Get episode details
   */
  @Get('/{episodeId}')
  public async getEpisodeById(@Path() episodeId: number): Promise<ResEpisode> {
    const episode = await this.episodeRepository.findOne({
      where: { id: episodeId },
      relations: ['season']
    });

    if (!episode) {
      return Promise.reject(new Error('EPISODE NOT FOUND'));
    }

    const season = await episode.season;

    return {
      id: episode.id,
      title: episode.title,
      episode_desc: episode.episode_desc,
      file: episode.file,
      thumbnail: episode.thumbnail,
      season: season ? {
        id: season.id,
        title: season.title,
        season_no: season.season_no
      } : undefined
    };
  }

  /**
   * Create a new episode
   * @summary Create episode
   */
  @Post('/{seasonId}')
  public async createEpisode(
    // @Body() req: ReqEpisode
    @Path() seasonId:number,
    @FormField() title?: string,
    @FormField() episode_desc?: string,
    @FormField() thumbnail?: string,
    @UploadedFile() file?: Express.Multer.File
    // @FormField() title?: string,
): Promise<ResEpisode> {
    // const { title, episode_desc, file, thumbnail, season_id } = req;

    const season = await this.seasonRepository.findOne({
      where: { id: seasonId }
    });

    if (!season) {
      return Promise.reject(new Error('SEASON NOT FOUND'));
    }
    // Define the upload directory
    const uploadDir = path.join(__dirname, '../../public/uploads');

    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Create a unique filename and save the file
    // const uniqueFilename = ${Date.now()}-${file.originalname};
    const filePath = path.join(uploadDir, title!);
    // const flashFileToSave: ECUFlash = {
    //   flash_file_name: title!,
    //   flash_file_path: uploadDir + '/' + fileName,
    //   // id,
    //   // status
    // };

    // Move file to the upload directory
    const newFilePath=filePath+'.mp4'

    fs.writeFileSync(newFilePath,file?.buffer as Buffer); // Use file buffer
    // const flashFileSaver = Object.assign(new ECUFlash(), flashFileToSave);
    // const savedFlashFile = await this.flashfilerepository.save(flashFileSaver);
    // return savedFlashFile;
  
    console.log('this is the new file path', newFilePath)
    const episode: Episode = {
      title,
      episode_desc,
      file:newFilePath,
      thumbnail,
      season: Promise.resolve(season)
    };

    const episodeSaver = Object.assign(new Episode(), episode);
    const savedEpisode = await this.episodeRepository.save(episodeSaver);

    const episodeSeason = await savedEpisode.season;

    return {
      id: savedEpisode.id,
      title: savedEpisode.title,
      episode_desc: savedEpisode.episode_desc,
      file: savedEpisode.file,
      thumbnail: savedEpisode.thumbnail,
      season: episodeSeason ? {
        id: episodeSeason.id,
        title: episodeSeason.title,
        season_no: episodeSeason.season_no
      } : undefined
    };
  }

  /**
   * Update episode
   * @summary Update episode
   */
  @Put('/{episodeId}')
  public async updateEpisode(@Path() episodeId: number, @Body() req: Partial<ReqEpisode>): Promise<ResEpisode> {
    const episode = await this.episodeRepository.findOne({
      where: { id: episodeId },
      relations: ['season']
    });

    if (!episode) {
      return Promise.reject(new Error('EPISODE NOT FOUND'));
    }

    if (req.season_id) {
      const season = await this.seasonRepository.findOne({
        where: { id: req.season_id }
      });
      if (season) {
        episode.season = Promise.resolve(season);
      }
    }

    Object.assign(episode, req);
    const updatedEpisode = await this.episodeRepository.save(episode);

    const season = await updatedEpisode.season;

    return {
      id: updatedEpisode.id,
      title: updatedEpisode.title,
      episode_desc: updatedEpisode.episode_desc,
      file: updatedEpisode.file,
      thumbnail: updatedEpisode.thumbnail,
      season: season ? {
        id: season.id,
        title: season.title,
        season_no: season.season_no
      } : undefined
    };
  }

  /**
   * Delete episode
   * @summary Delete episode
   */
  @Delete('/{episodeId}')
  public async deleteEpisode(@Path() episodeId: number): Promise<{ result: string }> {
    const episode = await this.episodeRepository.findOne({
      where: { id: episodeId }
    });

    if (!episode) {
      return Promise.reject(new Error('EPISODE NOT FOUND'));
    }

    await this.episodeRepository.remove(episode);

    return { result: 'EPISODE DELETED SUCCESSFULLY' };
  }
}