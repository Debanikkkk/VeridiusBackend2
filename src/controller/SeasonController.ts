import { Body, Controller, Delete, Get, Path, Post, Put, Query, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Season } from '../entity/Season';
import { Show } from '../entity/Show';
import { Episode } from '../entity/Episode';
import { ResSeason, ResSeasonN, ResSeasonWithDetails } from '../models/res/ResSeason';
import { ReqSeason } from '../models/req/ReqSeason';
import { Console } from 'console';
import { ResSeasonDet } from '../models/res/ResShow';
// import { ResSeason, ResSeasonWithDetails } from '../models/res/ResSeason';
// import { ReqSeason } from '../models/req/ReqSeason';

@Tags('Seasons')
@Route('/seasons')
export class SeasonController extends Controller {
  private seasonRepository = AppDataSource.getRepository(Season);
  private showRepository = AppDataSource.getRepository(Show);
  private episodeRepository = AppDataSource.getRepository(Episode);


  /**
   * Get season by ID with details
   * @summary Get season details
   */
  @Post('getSeasonDet/{seasonId}')
  public async getSeasonById(@Path() seasonId: number): Promise<ResSeasonWithDetails > {
    console.log("THE SEASON ID IS >>>>>",seasonId)
    const season = await this.seasonRepository.findOne({
      where: { id: seasonId },
    //   relations: {
    //     episodes: true
    //   }
    });


    console.log("THE CODE REACHED HERE")

    if (!season) {
      return Promise.reject(new Error('SEASON NOT FOUND'));
    }

    const show = await season.show;
    console.log("THE CODE REACHED HERE")

    const episodes = await this.episodeRepository.find({
        where:{
            season:{
                id: seasonId
            },
        }
    });//
    console.log("THE CODE REACHED HERE")

    return {
      id: season.id,
      title: season.title,
      season_no: season.season_no,
      season_desc: season.season_desc,
      date: season.date,
      episodes_count: episodes.length!,
      episodes: episodes?.map(episode => ({
        id: episode.id,
        title: episode.title,
        episode_desc: episode.episode_desc,
        file: episode.file,
        thumbnail: episode.thumbnail
      }))!
    };
  }
  /**
   * Get all seasons by show ID
   * @summary Get seasons by show
   */
  @Get('/showDet/{showId}')
  public async getSeasonsByShow(
    @Path() showId: number,
    // @Query() page: number = 1,
    // @Query() limit: number = 10
  )
//   : Promise<{ items: ResSeason[]; totalCount: number }> 
  {
    // const offset = (page - 1) * limit;
    // 
    // const [seasons, totalCount] = await this.seasonRepository.findAndCount({
    //   where: { show: { id: showId } },
    // //   relations: {
    // //     show: true
    // //   },
    //   skip: offset,
    //   take: limit,
    //   order: { season_no: 'ASC' }
    // });
    const db_seasons=await this.seasonRepository.find({
        where:{
            show:{
                id: showId
            }
        }

    })
    console.log("the found seasons are ", db_seasons)
    const seasonArr:ResSeasonN[]=[]
    for(const d of db_seasons){
// db_seasons.map(async(d)=>{
    const season=await this.getSeasonById(d.id!)
    console.log("the found seasons are IN THE MAP LOOP", season)

        const resSeason: ResSeasonN={
      id: season.id,
      title: season.title,
      season_no: season.season_no,
      season_desc: season.season_desc,
      date: season.date,
      episodes_count: season.episodes.length!,
      episodes: season.episodes?.map((episode: any)=> ({
        id: episode.id,
        title: episode.title,
        episode_desc: episode.episode_desc,
        file: episode.file,
        thumbnail: episode.thumbnail
      }))!
    };
        
        // }
        seasonArr.push(resSeason)
        console.log("the season array is now", seasonArr)
    }
        console.log("the season array is now coming out the loop > > > > > > > >", seasonArr)

    return seasonArr
  }

  /**
   * Create a new season
   * @summary Create season
   */
  @Post('/')
  public async createSeason(@Body() req: ReqSeason): Promise<ResSeason> {
    const { title, season_no, season_desc, show_id } = req;

    const show = await this.showRepository.findOne({
      where: { id: show_id }
    });

    if (!show) {
      return Promise.reject(new Error('SHOW NOT FOUND'));
    }

    const season: Season = {
      title,
      season_no,
      season_desc,
      show: Promise.resolve(show),
      date: new Date()
    };

    const seasonSaver = Object.assign(new Season(), season);
    const savedSeason = await this.seasonRepository.save(seasonSaver);

    const seasonShow = await savedSeason.show;

    return {
      id: savedSeason.id,
      title: savedSeason.title,
      season_no: savedSeason.season_no,
      season_desc: savedSeason.season_desc,
      date: savedSeason.date,
      show: seasonShow ? {
        id: seasonShow.id,
        title: seasonShow.title
      } : undefined,
      episodes_count: 0
    };
  }

  /**
   * Update season
   * @summary Update season
   */
  @Put('/{seasonId}')
  public async updateSeason(@Path() seasonId: number, @Body() req: Partial<ReqSeason>): Promise<ResSeason> {
    const season = await this.seasonRepository.findOne({
      where: { id: seasonId },
      relations: ['show', 'episodes']
    });

    if (!season) {
      return Promise.reject(new Error('SEASON NOT FOUND'));
    }

    if (req.show_id) {
      const show = await this.showRepository.findOne({
        where: { id: req.show_id }
      });
      if (show) {
        season.show = Promise.resolve(show);
      }
    }

    Object.assign(season, req);
    const updatedSeason = await this.seasonRepository.save(season);

    const show = await updatedSeason.show;
    const episodes = await updatedSeason.episodes;

    return {
      id: updatedSeason.id,
      title: updatedSeason.title,
      season_no: updatedSeason.season_no,
      season_desc: updatedSeason.season_desc,
      date: updatedSeason.date,
      show: show ? {
        id: show.id,
        title: show.title
      } : undefined,
      episodes_count: episodes?.length!
    };
  }

  /**
   * Delete season
   * @summary Delete season
   */
  @Delete('/{seasonId}')
  public async deleteSeason(@Path() seasonId: number): Promise<{ result: string }> {
    const season = await this.seasonRepository.findOne({
      where: { id: seasonId }
    });

    if (!season) {
      return Promise.reject(new Error('SEASON NOT FOUND'));
    }

    await this.seasonRepository.remove(season);

    return { result: 'SEASON DELETED SUCCESSFULLY' };
  }
}