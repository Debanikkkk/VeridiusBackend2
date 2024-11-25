import { Controller, Get, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Banners } from '../entity/Banner';
import { ResBanner } from '../models/res/ResBanner';

@Tags('Banners')
@Route('/banners')
export class BannerController extends Controller {
  private bannerrepository = AppDataSource.getRepository(Banners);

  @Get()
  public async getAllBanners(): Promise<ResBanner[]> {
    const banners = await this.bannerrepository.find();

    if (!banners) {
      return Promise.reject(new Error('BANNERS NOT FOUND'));
    }

    const bannerArr: ResBanner[] = [];

    for (const banner of banners) {
      bannerArr.push({
        createdAt: banner.createdAt,
        id: banner.id,
        priority: banner.priority,
        product_description: banner.product_description,
        product_img: banner.product_img,
        product_link: banner.product_link,
        product_name: banner.product_name,
        product_tag: banner.product_tag,
        rating: banner.rating,
        updatedAt: banner.updatedAt,
      });
    }

    return bannerArr;
  }
}
