

export interface ResEpisodeN {
  id: number;
  title: string;
  episode_desc?: string;
  file?: string;
  thumbnail?: string;
}

export interface ResSeasonN {
  id?: number;
  title?: string;
  season_no?: number;
  season_desc?: string;
  date?: Date;
  episodes_count?: number;
  episodes?: ResEpisodeN[];
}

export interface ResSeason {
  id?: number;
  title?: string;
  season_no?: number;
  season_desc?: string;
  date?: Date;
  show?: {
    id?: number;
    title?: string;
  };
  episodes_count: number;
}

export interface ResSeasonWithDetails extends ResSeason {
  episodes: {
    id?: number;
    title?: string;
    episode_desc?: string;
    file?: string|null;
    thumbnail?: string;
  }[];
}