export interface ResEpisode {
  id?: number;
  title?: string;
  episode_desc?: string;
  file?: string | null;
  thumbnail?: string;
  season?: {
    id?: number;
    title?: string;
    season_no?: number;
  };
}