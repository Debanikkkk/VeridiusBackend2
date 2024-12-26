import { Controller, Delete, Get, Path, Post, Put, Query, Route, Tags, UploadedFile } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Banners } from '../entity/Banner';
import { ResBanner } from '../models/res/ResBanner';
// import { ReqBanner } from '../models/req/ReqBanner';
import path from 'path';
import fs from 'fs';
@Tags('Banners')
@Route('/banners')
export class BannerController extends Controller {
  private bannerrepository = AppDataSource.getRepository(Banners);

  @Post()
  public async saveBanner(
    @UploadedFile() productImg: Express.Multer.File,
    @Query() priority: number,
    @Query() productDescription: string,
    // @Query() productDescription: string,
    // @Query() productImg: string,
    @Query() productLink: string,
    @Query() productName: string,
    @Query() productTag: string,
    @Query() rating: number,
  ): Promise<ResBanner> {
    // const {  } = req;
    const uploadDir = path.join(__dirname, '../../public/bannerUploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save the uploaded file
    // const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExtension = path.extname(productImg.originalname);
    const filePath = path.join(uploadDir, `${productName}${fileExtension}`);
    fs.writeFileSync(filePath, productImg.buffer);
    const bannerSaver: Banners = {
      priority: priority,
      product_description: productDescription,
      product_img: 'https://omni-backend.navigolabs.com/public/bannerUploads/' + productName + fileExtension,
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
  public async updateBanner(
    @UploadedFile() productImg: Express.Multer.File,
    @Query() priority: number,
    @Query() productDescription: string,
    // @Query() productDescription: string,
    // @Query() productImg: string,
    @Query() productLink: string,
    @Query() productName: string,
    @Query() productTag: string,
    @Query() rating: number,
    @Path() bannerId: number,
  ): Promise<ResBanner> {
    const banner = await this.bannerrepository.findOne({
      where: {
        id: bannerId,
      },
    });

    const fileExtension = path.extname(productImg.originalname);

    const uploadDir = path.join(__dirname, '../../public/bannerUploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    // const { priority, productDescription, productImg, productLink, productName, productTag, rating } = req;
    if (!banner) {
      return Promise.reject(new Error('BANNER NOT FOUND'));
    }

    // banner.created_at=createdAt,
    // banner.id=id,

    const filePath = path.join(uploadDir, `${productName}${fileExtension}`);
    fs.writeFileSync(filePath, productImg.buffer);

    (banner.priority = priority),
      (banner.product_description = productDescription),
      (banner.product_img = 'https://omni-backend.navigolabs.com/public/bannerUploads/' + productName + fileExtension),
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
