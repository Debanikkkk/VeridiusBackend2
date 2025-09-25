// export interface ReqEpisode {
//   title?: string;
//   episode_desc?: string;
//   file?: string;
//   thumbnail?: string;
//   season_id: number;
// }

// Updated ReqEpisode interface - remove file field since it's handled by multer
export interface ReqEpisode {
  title?: string;
  episode_desc?: string;
  thumbnail?: string;
  season_id: number;
  // file field removed - now handled by multer upload
}