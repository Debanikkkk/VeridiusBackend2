// import {
//   Controller,
//   Post,
//   Route,
//   Tags,
//   Request,
//   Response,
//   SuccessResponse,
//   FormField,
//   UploadedFile
// } from 'tsoa';
// import { Request as ExpressRequest } from 'express';
// import { Repository } from 'typeorm';
// import { AppDataSource } from '../data-source';
// // import { Episode } from '../entities/Episode';
// // import { Season } from '../entities/Season';
// // import { videoUpload } from '../app';
// import * as path from 'path';
// import * as fs from 'fs';
// import { Episode } from '../entity/Episode';
// import { Season } from '../entity/Season';
// import { videoUpload } from '..';

// interface ResEpisode {
//   id?: number;
//   title?: string;
//   episode_desc?: string;
//   file?: string;
//   thumbnail?: string;
//   season?: {
//     id?: number;
//     title?: string;
//     season_no?: number;
//   };
// }

// @Route('episodes')
// @Tags('Episodes')
// export class EpisodeController extends Controller {
//   private episodeRepository: Repository<Episode>;
//   private seasonRepository: Repository<Season>;

//   constructor() {
//     super();
//     this.episodeRepository = AppDataSource.getRepository(Episode);
//     this.seasonRepository = AppDataSource.getRepository(Season);
//   }

//   /**
//    * Create a new episode with video file upload
//    * @summary Create episode
//    */
//   @Post('/')
//   @Response(400, 'Bad Request')
//   @Response(404, 'Season Not Found')
//   @Response(500, 'Internal Server Error')
//   @SuccessResponse('201', 'Created')
//   public async createEpisode(
//     @Request() request: ExpressRequest,
//     @FormField() title: string,
//     @FormField() season_id: number,
//     @FormField() episode_desc?: string,
//     @FormField() thumbnail?: string,
//     @UploadedFile() file?: Express.Multer.File
//   ): Promise<ResEpisode> {
//     return new Promise((resolve, reject) => {
//       const uploadMiddleware = videoUpload.single('file');
      
//       uploadMiddleware(request, request.res!, async (err) => {
//         console.log('Upload middleware called');
//         console.log('Error:', err);
//         console.log('File:', (request as any).file);
//         console.log('Body:', request.body);
        
//         if (err) {
//           console.log('Error type:', err.constructor.name);
//           console.log('Error code:', (err as any).code);
//           if (err.message.includes('File too large') || err.message.includes('LIMIT_FILE_SIZE')) {
//             this.setStatus(400);
//             return reject(new Error('FILE_TOO_LARGE: File size cannot exceed 500MB'));
//           }
//           if (err.message.includes('Only video files')) {
//             this.setStatus(400);
//             return reject(new Error('INVALID_FILE_TYPE: Only video files are allowed'));
//           }
//           this.setStatus(400);
//           return reject(new Error(`UPLOAD_ERROR: ${err.message}`));
//         }

//         try {
//           const uploadedFile = (request as any).file || file;
//           const body = request.body;

//           const episodeData = {
//             title: body.title || title,
//             episode_desc: body.episode_desc || episode_desc,
//             thumbnail: body.thumbnail || thumbnail,
//             season_id: parseInt(body.season_id?.toString()) || season_id
//           };

//           if (!uploadedFile) {
//             this.setStatus(400);
//             return reject(new Error('VIDEO_FILE_REQUIRED: Video file is required'));
//           }

//           if (!episodeData.title || !episodeData.season_id) {
//             this.setStatus(400);
//             return reject(new Error('MISSING_FIELDS: Title and season_id are required'));
//           }

//           const season = await this.seasonRepository.findOne({
//             where: { id: episodeData.season_id }
//           });

//           if (!season) {
//             this.setStatus(404);
//             return reject(new Error('SEASON_NOT_FOUND: Season not found'));
//           }

//           const uploadDir = path.join(__dirname, '../../public/uploads');

//           if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir, { recursive: true });
//           }

//           const fileExtension = path.extname(uploadedFile.originalname);
//           const sanitizedTitle = episodeData.title.replace(/[^a-zA-Z0-9]/g, '_');
//           const uniqueFilename = `${Date.now()}-${sanitizedTitle}${fileExtension}`;
//           const filePath = path.join(uploadDir, uniqueFilename);

//           try {
//             fs.writeFileSync(filePath, uploadedFile.buffer);

//             const episode: Partial<Episode> = {
//               title: episodeData.title,
//               episode_desc: episodeData.episode_desc,
//               file: `public/uploads/${uniqueFilename}`,
//               thumbnail: episodeData.thumbnail,
//               season: Promise.resolve(season)
//             };

//             const episodeSaver = Object.assign(new Episode(), episode);
//             const savedEpisode = await this.episodeRepository.save(episodeSaver);

//             const episodeSeason = await savedEpisode.season;

//             const response: ResEpisode = {
//               id: savedEpisode.id,
//               title: savedEpisode.title,
//               episode_desc: savedEpisode.episode_desc,
//               file: savedEpisode.file,
//               thumbnail: savedEpisode.thumbnail,
//               season: episodeSeason ? {
//                 id: episodeSeason.id,
//                 title: episodeSeason.title,
//                 season_no: episodeSeason.season_no
//               } : undefined
//             };

//             this.setStatus(201);
//             resolve(response);

//           } catch (saveError: any) {
//             if (fs.existsSync(filePath)) {
//               fs.unlinkSync(filePath);
//             }
//             this.setStatus(500);
//             reject(new Error(`SAVE_ERROR: Failed to save episode: ${saveError.message}`));
//           }

//         } catch (error: any) {
//           this.setStatus(500);
//           reject(new Error(`INTERNAL_ERROR: ${error.message}`));
//         }
//       });
//     });
//   }
// }