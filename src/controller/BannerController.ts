import { Body, Controller, Delete, Get, Path, Post, Put, Route, Tags } from 'tsoa';
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

  @Put('/{bannerId}')
  public async updateBanner(@Body() req: ResBanner, @Path() bannerId: number): Promise<ResBanner> {
    const banner = await this.bannerrepository.findOne({
      where: {
        id: bannerId,
      },
    });

    const { priority, productDescription, productImg, productLink, productName, productTag, rating } = req;
    if (!banner) {
      return Promise.reject(new Error('BANNER NOT FOUND'));
    }

    // banner.created_at=createdAt,
    // banner.id=id,
    (banner.priority = priority),
      (banner.product_description = productDescription),
      (banner.product_img = productImg),
      (banner.product_link = productLink),
      (banner.product_name = productName),
      (banner.product_tag = productTag),
      (banner.rating = rating);
    // banner.updated_at=updatedAt,

    const newBanner = await this.bannerrepository.save(banner);
    const resBanner: ResBanner = {
      createdAt: newBanner.created_at,
      id: newBanner.id,
      priority: newBanner.priority,
      productDescription: newBanner.product_description,
      productImg: newBanner.product_img,
      productLink: newBanner.product_link,
      productName: newBanner.product_name,
      productTag: newBanner.product_tag,
      rating: newBanner.rating,
      updatedAt: newBanner.updated_at,
    };
    return resBanner;
  }
}
