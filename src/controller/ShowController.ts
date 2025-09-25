import { Body, Controller, Delete, Get, Path, Post, Put, Query, Request, Route, Security, Tags, UploadedFile } from 'tsoa';
import { AppDataSource } from '../data-source';
import { movieRating, Show, showType } from '../entity/Show';
import { Season } from '../entity/Season';
import { User } from '../entity/User';
import { ResSeasonDet, ResShow, ResShowDet, ResShowWithDetails } from '../models/res/ResShow';
import { ReqShow } from '../models/req/ReqShow';
import { ResSeason } from '../models/res/ResSeason';
import { ResEpisode } from '../models/res/ResEpisode';
import { JWTRequest } from '../models/req/JWTRequest';
import path from 'path';
import fs from 'fs'
// import { ResShow, ResShowWithDetails } from '../models/res/ResShow';
// import { ReqShow } from '../models/req/ReqShow';
function replaceSpacesWithUnderscore(str:string) {
  return str.replace(/ /g, "_");
}

@Tags('Shows')
@Route('/shows')
export class ShowController extends Controller {
  private showRepository = AppDataSource.getRepository(Show);
  private userRepository = AppDataSource.getRepository(User);
  private seasonRepository = AppDataSource.getRepository(Season);

  /**
   * Get all shows with pagination
   * @summary Get all shows
   */
  @Get('/getAllShows')
  public async getAllShows(
    @Query() page: number = 1,
    @Query() limit: number = 10,
    // @Query() showType?: string,
    // @Query() rating?: string
  ): Promise<{ items: ResShowDet[]; totalCount: number }> {
    const offset = (page - 1) * limit;
    
    const queryBuilder = this.showRepository.createQueryBuilder('show')
      .leftJoinAndSelect('show.publisher', 'publisher')
      .leftJoinAndSelect('show.seasons', 'seasons')
      .skip(offset)
      .take(limit);

    // if (showType) {
    //   queryBuilder.andWhere('show.show_type = :showType', { showType });
    // }

    // if (rating) {
    //   queryBuilder.andWhere('show.rating = :rating', { rating });
    // }

    const [shows, totalCount] = await queryBuilder.getManyAndCount();

    const resShows: ResShowDet[] = [];
    for (const show of shows) {

        const resSeasons: ResSeasonDet[]=[]


        const seasons=await show.seasons;
        (await seasons)?.map((d)=>{
            const resSeason={
                 id: d.id,
  title: d.title,
  season_no: d.season_no,
  season_desc: d.season_desc,
  date: d.date,
//   episodes_count:d.episodes_count,
            }
        resSeasons.push(resSeason)

        })
      const publisher = await show.publisher;
      resShows.push({
        id: show.id,
        title: show.title,
        tile_img: show.tile_img,
        desc_img: show.desc_img,
        description: show.description,
        date: show.date,
        rating: show.rating,
        show_type: show.show_type,
        publisher: publisher ? {
          id: publisher.id,
          name: publisher.name,
          email: publisher.email,
          address:publisher.address,
          password:publisher.password,
          phone_number:publisher.phone_number,
        //   role:publisher.r,
        //   shows_count:publisher.s,
          status:publisher.status
        } : undefined,
        seasons_count: show.seasons ? (await show.seasons).length : 0,
        seasons:resSeasons
      });
    }

    return {
      items: resShows,
      totalCount
    };
  }

  
  /**
   * Get all shows with pagination
   * @summary Get all shows
   */
  @Get('/getAllShowsFilter')
  public async getAllShowsFilter(
    @Query() page: number = 1,
    @Query() limit: number = 10,
    @Query() showType?: string,
    @Query() rating?: string
  ): Promise<{ items: ResShow[]; totalCount: number }> {
    const offset = (page - 1) * limit;
    
    const queryBuilder = this.showRepository.createQueryBuilder('show')
      .leftJoinAndSelect('show.publisher', 'publisher')
      .leftJoinAndSelect('show.seasons', 'seasons')
      .skip(offset)
      .take(limit);

    if (showType) {
      queryBuilder.andWhere('show.show_type = :showType', { showType });
    }

    if (rating) {
      queryBuilder.andWhere('show.rating = :rating', { rating });
    }

    const [shows, totalCount] = await queryBuilder.getManyAndCount();

    const resShows: ResShow[] = [];
    for (const show of shows) {
      const publisher = await show.publisher;
      resShows.push({
        id: show.id,
        title: show.title,
        tile_img: show.tile_img,
        desc_img: show.desc_img,
        description: show.description,
        date: show.date,
        rating: show.rating,
        show_type: show.show_type,
        publisher: publisher ? {
          id: publisher.id,
          name: publisher.name,
          email: publisher.email
        } : undefined,
        seasons_count: show.seasons ? (await show.seasons).length : 0
      });
    }

    return {
      items: resShows,
      totalCount
    };
  }


  /**
   * Get show by ID with details
   * @summary Get show details
   */
  @Get('/{showId}')
  public async getShowById(@Path() showId: number): Promise<ResShowWithDetails> {
    const show = await this.showRepository.findOne({
      where: { id: showId },
      relations: ['publisher', 'seasons']
    });

    if (!show) {
      return Promise.reject(new Error('SHOW NOT FOUND'));
    }

    const publisher = await show.publisher;
    const seasons = await show.seasons;

    return {
      id: show.id,
      title: show.title,
      tile_img: show.tile_img,
      desc_img: show.desc_img,
      description: show.description,
      date: show.date,
      seasons_count:(await show.seasons)?.length!,
      rating: show.rating,
      show_type: show.show_type,
      publisher: publisher ? {
        id: publisher.id,
        name: publisher.name,
        email: publisher.email
      } : undefined,
      seasons: seasons?.map(season => ({
        id: season.id,
        title: season.title,
        season_no: season.season_no,
        season_desc: season.season_desc,
        date: season.date
      }))!
    };
  }

  /**
   * Create a new show
   * @summary Create show
   */
  @Post('/')
  // @Security('Api-Token',[])
  public async createShow(
    // @Body() req: ReqShow,
    // @Request() req: JWTRequest,
    @Query() userid?: number,

    @Query() title?: string,
    @Query() description?: string,
    @Query() rating?: movieRating,
    @Query() show_type?: showType,
    // @Query() description?: string,
    // @Query() title?: string,
    @UploadedFile() tile_img?: Express.Multer.File,
    @UploadedFile() desc_img?: Express.Multer.File,

  
  ): Promise<ResShow> {
    // const { title, tile_img, desc_img, description, rating, show_type, publisher_id } = req;

    const publisher = await this.userRepository.findOne({
      where: { id: userid}
    });

    if (!publisher) {
      return Promise.reject(new Error('PUBLISHER NOT FOUND'));
    }



const uploadDir = path.join(__dirname, '../../public/tileImg/');

    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const uniqueFilename = `${Date.now()}-${tile_img?.originalname}`;
const validName=replaceSpacesWithUnderscore(title!+uniqueFilename)
    const filePath = path.join(uploadDir, validName);

    // const newFilePath='http://localhost:3000'

    fs.writeFileSync(filePath,tile_img?.buffer as Buffer);
    const newFilePath='http://localhost:3000/public/tileImg/'+validName
    

    ////////////////////////////////////

    const uploadDirDesc = path.join(__dirname, '../../public/descImg/');

    // Ensure directory exists
    if (!fs.existsSync(uploadDirDesc)) {
      fs.mkdirSync(uploadDirDesc);
    }
    const uniqueFilenameDesc = `${Date.now()}-${desc_img?.originalname}`;
    const validNameDesc=replaceSpacesWithUnderscore(title!+uniqueFilenameDesc)
    const filePathDesc = path.join(uploadDirDesc, validNameDesc);
    console.log("the path is", filePathDesc)
    // const newFilePathDesc=filePathDesc
    const newFilePathDesc='http://localhost:3000/public/descImg/'+validNameDesc


    fs.writeFileSync(filePathDesc,desc_img?.buffer as Buffer);
    
    ////////////////////////////////////

    const show: Show = {
      title,
      tile_img: newFilePath,
      desc_img:newFilePathDesc,
      description,
      rating,
      show_type,
      publisher: Promise.resolve(publisher),
      date: new Date()
    };

    const showSaver = Object.assign(new Show(), show);
    const savedShow = await this.showRepository.save(showSaver);

    const showPublisher = await savedShow.publisher;

    return {
      id: savedShow.id,
      title: savedShow.title,
      tile_img: savedShow.tile_img,
      desc_img: savedShow.desc_img,
      description: savedShow.description,
      date: savedShow.date,
      rating: savedShow.rating,
      show_type: savedShow.show_type,
      publisher: showPublisher ? {
        id: showPublisher.id,
        name: showPublisher.name,
        email: showPublisher.email
      } : undefined,
      seasons_count: 0
    };
  }

  /**
   * Update show
   * @summary Update show
   */
  @Put('/{showId}')
  public async updateShow(@Path() showId: number, @Body() req: Partial<ReqShow>): Promise<ResShow> {
    const show = await this.showRepository.findOne({
      where: { id: showId },
      relations: ['publisher']
    });

    if (!show) {
      return Promise.reject(new Error('SHOW NOT FOUND'));
    }

    if (req.publisher_id) {
      const publisher = await this.userRepository.findOne({
        where: { id: req.publisher_id }
      });
      if (publisher) {
        show.publisher = Promise.resolve(publisher);
      }
    }

    Object.assign(show, req);
    const updatedShow = await this.showRepository.save(show);

    const publisher = await updatedShow.publisher;

    return {
      id: updatedShow.id,
      title: updatedShow.title,
      tile_img: updatedShow.tile_img,
      desc_img: updatedShow.desc_img,
      description: updatedShow.description,
      date: updatedShow.date,
      rating: updatedShow.rating,
      show_type: updatedShow.show_type,
      publisher: publisher ? {
        id: publisher.id,
        name: publisher.name,
        email: publisher.email
      } : undefined,
      seasons_count: updatedShow.seasons ? (await updatedShow.seasons).length : 0
    };
  }

  /**
   * Delete show
   * @summary Delete show
   */
  @Delete('/{showId}')
  public async deleteShow(@Path() showId: number): Promise<{ result: string }> {
    const show = await this.showRepository.findOne({
      where: { id: showId }
    });

    if (!show) {
      return Promise.reject(new Error('SHOW NOT FOUND'));
    }

    await this.showRepository.remove(show);

    return { result: 'SHOW DELETED SUCCESSFULLY' };
  }


//   @Post('/getAllShows')
//   public async getAllShowsWithSeasonsWithEpisodes(){
//     const shows=await this.showRepository.find({
       
//     })



//     const resShows: ResShow[]=[]
//     shows.map(async(d)=>{
//         const seasons=await this.seasonRepository.find({
//             where:{
//                 show:{
//                     id:d.id
//                 }
//             }
//         });
        
//         const resSeason: ResSeason[]=[]
//         for( const season of seasons){
//             const resEpisodes: ResEpisode[]=[]
//             for(){

//             }

//             resSeason.push({
//                 episodes_count: (await season.episodes)?.length!,
//                 date: season.date,
//                 id: season.id,
//                 season_desc: season.season_desc,
//                 season_no: season.season_no,
//                 // show: season.show,
//                 title: season.title

//             })
//         }
//         const resShow: ResShow={

//         }
//     })
//     return resShows
//   }
}