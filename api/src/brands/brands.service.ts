import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { FilterBrandDto } from './dto/filter-dto';
import { ImageMediaType } from '@prisma/client';

@Injectable()
export class BrandsService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    const { position, ...data } = createBrandDto;
    return await this.prisma.$transaction([
      this.prisma.brand.updateMany({
        where: {
          position: {
            gte: position,
          },
        },
        data: {
          position: {
            increment: 1,
          },
        },
      }),
      this.prisma.brand.create({
        data: {
          ...data,
          position,
          image: {
            create: {
              url: data.imageUrl,
              type: ImageMediaType.BRAND,
            },
          },
        },
      }),
    ]);
  }

  async findAll(query: FilterBrandDto) {
    const { storeID, name, position } = query;
    return await this.prisma.brand.findMany({
      where: {
        storeId: storeID,
      },
      orderBy: {
        position: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.brand.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const { position, imageUrl, ...data } = updateBrandDto;

    try {
      const existBrand = await this.prisma.brand.findUnique({
        where: { id },
      });

      if (!existBrand) {
        throw new BadRequestException(
          `Thương hiệu với ID:${id} không tồn tại.`,
        );
      }

      const isImagesUpdated =
        imageUrl &&
        JSON.stringify(imageUrl) !== JSON.stringify(existBrand.imageUrl);

      if (isImagesUpdated) {
        await this.uploadService.deleteImagesFromS3(existBrand.imageUrl ?? '');
      }

      // Xử lý thay đổi vị trí
      if (position !== undefined && position !== existBrand.position) {
        if (position < existBrand.position) {
          await this.prisma.brand.updateMany({
            where: {
              position: {
                gte: position,
                lt: existBrand.position,
              },
            },
            data: {
              position: { increment: 1 },
            },
          });
        } else {
          await this.prisma.brand.updateMany({
            where: {
              position: {
                gt: existBrand.position,
                lte: position,
              },
            },
            data: {
              position: { decrement: 1 },
            },
          });
        }
      }

      // ✅ Thực hiện update bất kể position có thay đổi hay không
      return await this.prisma.brand.update({
        where: { id },
        data: {
          ...data,
          image: {
            update: {
              url: imageUrl,
            },
          },
          imageUrl: imageUrl ?? existBrand.imageUrl,
          position: position ?? existBrand.position,
        },
      });
    } catch (err) {
      console.log('ERR', err);
      throw new BadRequestException('Có lỗi xảy ra khi cập nhật thương hiệu');
    }
  }

  async remove(id: number) {
    const existBrand = await this.prisma.brand.findUnique({
      where: { id },
      select: {
        imageUrl: true,
        position: true,
        image: true,
      },
    });
    if (existBrand?.imageUrl) {
      await this.uploadService.deleteImagesFromS3(existBrand.imageUrl);
      await this.prisma.imageMedia.delete({
        where: {
          id: existBrand.image?.id,
        },
      });
    }
    await this.prisma.brand.delete({
      where: { id },
    });
    await this.prisma.brand.updateMany({
      where: {
        position: {
          gt: existBrand?.position,
        },
      },
      data: {
        position: { decrement: 1 },
      },
    });
    return;
  }
}
