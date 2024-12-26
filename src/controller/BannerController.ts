import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Banners } from '../entity/Banner';
import { ResBanner } from '../models/res/ResBanner';
import { ReqBanner } from '../models/req/ReqBanner';

@Tags('Banners')
@Route('/banners')
export class BannerController extends Controller {
  private bannerrepository = AppDataSource.getRepository(Banners);

  @Post()
  public async saveBanner(@Body() req: ReqBanner): Promise<ResBanner> {
    const { priority, productDescription, productImg, productLink, productName, productTag, rating } = req;

    const bannerSaver: Banners = {
      priority: priority,
      product_description: productDescription,
      product_img: productImg,
      product_link: productLink,
      product_name: productName,
      product_tag: productTag,
      rating: rating,
    };

    const saveBanner = Object.assign(new Banners(), bannerSaver);
    const savedBanner = await this.bannerrepository.save(saveBanner);

    const resBanner: ResBanner = {
      createdAt: savedBanner.created_at,
      id: savedBanner.id,
      priority: savedBanner.priority,
      productDescription: savedBanner.product_description,
      productImg: savedBanner.product_img,
      productLink: savedBanner.product_link,
      productName: savedBanner.product_name,
      productTag: savedBanner.product_tag,
      rating: savedBanner.rating,
      updatedAt: savedBanner.updated_at,
    };

    return resBanner;
  }

  @Get()
  public async getAllBanners(): Promise<ResBanner[]> {
    const banners = await this.bannerrepository.find();

    if (!banners) {
      return Promise.reject(new Error('BANNERS NOT FOUND'));
    }

    const bannerArr: ResBanner[] = [];

    for (const banner of banners) {
      bannerArr.push({
        createdAt: banner.created_at,
        id: banner.id,
        priority: banner.priority,
        productDescription: banner.product_description,
        productImg: banner.product_img,
        productLink: banner.product_link,
        productName: banner.product_name,
        productTag: banner.product_tag,
        rating: banner.rating,
        updatedAt: banner.updated_at,
      });
    }

    return bannerArr;
  }

  @Get('/{bannerId}')
  public async getOneBanner(@Path() bannerId: number) {
    const banner = await this.bannerrepository.findOne({
      where: {
        id: bannerId,
      },
    });

    if (!banner) {
      return Promise.reject(new Error('BANNER NOT FOUND'));
    }

    const resBanner: ResBanner = {
      createdAt: banner.created_at,
      id: banner.id,
      priority: banner.priority,
      productDescription: banner.product_description,
      productImg: banner.product_img,
      productLink: banner.product_link,
      productName: banner.product_name,
      productTag: banner.product_tag,
      rating: banner.rating,
      updatedAt: banner.updated_at,
    };

    return resBanner;
  }

  @Delete('/{bannerId}')
  public async deleteBanner(@Path() bannerId: number) {
    const banner = await this.bannerrepository.findOne({
      where: {
        id: bannerId,
      },
    });

    if (!banner) {
      return Promise.reject(new Error('BANNER NOT FOUND'));
    }

    await this.bannerrepository.remove(banner);
    return { result: 'THE BANNER WAS DELETED SUCCESSFULLY' };
  }
}
