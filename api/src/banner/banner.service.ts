import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBannerDTO } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { PrismaService } from 'src/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { BannerFilterDto } from './dto/get-banner-filter.dto';
import { ImageMediaType } from '@prisma/client';

@Injectable()
export class BannerService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async create(createBannerDto: CreateBannerDTO) {
    const { position, ...data } = createBannerDto;
    return await this.prisma.$transaction([
      this.prisma.banner.updateMany({
        where: {
          position: {
            gte: position,
          },
        },
        data: {
          position: { increment: 1 },
        },
      }),
      this.prisma.banner.create({
        data: {
          ...data,
          cta: data.cta ? JSON.parse(JSON.stringify(data.cta)) : undefined,

          position,
          image: {
            create: {
              url: data.imageUrl,
              type: ImageMediaType.BANNER,
            },
          },
        },
      }),
    ]);
  }

  async findAll(query: BannerFilterDto) {
    const { storeID } = query;

    return await this.prisma.banner.findMany({
      where: {
        storeId: storeID,
        isActive: true,
      },
      orderBy: { position: 'asc' },
    });
  }

  async findOne(id: number) {
    return await this.prisma.banner.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateBannerDto: UpdateBannerDto) {
    const { imageUrl, position, ...data } = updateBannerDto;

    const existBanner = await this.prisma.banner.findUnique({
      where: { id },
    });
    if (!existBanner) {
      throw new BadRequestException(`Banner với ID:${id} không tồn tại `);
    }

    const isImagesUpdated =
      imageUrl &&
      JSON.stringify(imageUrl) !== JSON.stringify(existBanner?.imageUrl);
    if (isImagesUpdated) {
      await this.uploadService.deleteImagesFromS3(existBanner?.imageUrl ?? '');
    }

    if (position !== undefined && position !== existBanner.position) {
      // Determine which banners need position adjustments
      if (position < existBanner.position) {
        // Nếu position giảm, tăng position của các banner có position >= new position

        await this.prisma.banner.updateMany({
          where: {
            position: {
              gte: position,
              lt: existBanner.position,
            },
          },
          data: {
            position: { increment: 1 },
          },
        });
      } else {
        // When moving a banner to a later position:
        // Nếu position tăng, giảm position của các banner có position > new position

        await this.prisma.banner.updateMany({
          where: {
            position: {
              gt: existBanner.position,
              lte: position,
            },
          },
          data: {
            position: { decrement: 1 },
          },
        });
      }
    }

    // Update the banner with new data
    const updatedBanner = await this.prisma.banner.update({
      where: { id },
      data: {
        ...data,
        cta: data.cta ? JSON.parse(JSON.stringify(data.cta)) : undefined,
        image: {
          update: {
            url: imageUrl,
          },
        },
        imageUrl: imageUrl ?? existBanner.imageUrl, // Keep old imageUrl if not provided
        position: position ?? existBanner.position, // Keep old position if not provided
        updatedAt: new Date(),
      },
    });
    return updatedBanner;
  }

  async remove(id: number) {
    const existBanner = await this.prisma.banner.findUnique({
      where: { id },
      select: {
        imageUrl: true,
        image: true,
        position: true,
      },
    });
    if (existBanner?.imageUrl) {
      await this.uploadService.deleteImagesFromS3(existBanner.imageUrl);
      await this.prisma.imageMedia.delete({
        where: {
          id: existBanner.image?.id,
        },
      });
    }
    await this.prisma.banner.delete({
      where: { id },
    });
    await this.prisma.banner.updateMany({
      where: {
        position: {
          gt: existBanner?.position,
        },
      },
      data: {
        position: { decrement: 1 },
      },
    });
    return;
  }
}
