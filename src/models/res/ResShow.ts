import { ResUser } from "./ResUser";

export interface ResShow {
  id?: number;
  title?: string;
  tile_img?: string;
  desc_img?: string;
  description?: string;
  date?: Date;
  rating?: string;
  show_type?: string;
  publisher?: {
    id?: number;
    name?: string;
    email?: string;
  };
  seasons_count: number;
}
export interface ResShowDet {
  id?: number;
  title?: string;
  tile_img?: string;
  desc_img?: string;
  description?: string;
  date?: Date;
  rating?: string;
  show_type?: string;
  publisher?: ResUser;
  seasons_count?: number;
  seasons: ResSeasonDet[]
}

export interface ResSeasonDet{
     id?: number;
  title?: string;
  season_no?: number;
  season_desc?: string;
  date?: Date;
  episodes_count?: number;
}
export interface ResShowWithDetails extends ResShow {
  seasons: {
    id?: number;
    title?: string;
    season_no?: number;
    season_desc?: string;
    date?: Date;
  }[];
}