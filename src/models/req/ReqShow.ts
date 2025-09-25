import { movieRating, showType } from "../../entity/Show";

export interface ReqShow {
  title?: string;
  tile_img?: string;
  desc_img?: string;
  description?: string;
  rating?: movieRating;
  show_type?: showType;
  publisher_id: number;
}