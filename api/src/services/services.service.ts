import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { ServiceQueryFilterDto } from './dto/query.service.dto';

@Injectable()
export class ServicesService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}
  async create(createServiceDto: CreateServiceDto) {
    try {
      const { seo, ...data } = createServiceDto;
      return await this.prisma.service.create({
        data: {
          ...(seo !== undefined && {
            seo: seo as any, // Cast to 'any' or 'Prisma.InputJsonValue'
          }),
          ...data,
        },
      });
    } catch (err) {
      console.log('ERR', err);
    }
  }

  async findAll(query: ServiceQueryFilterDto) {
    const { limit = 9999, currentPage = 1, ...data } = query;
    try {
      return await this.prisma.service.findMany({
        where: {
          slug: data.slug ? data.slug : undefined,
          storeId: data.storeId,
        },
        take: limit,
        skip: (currentPage - 1) * limit,
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (err) {
      console.log('ERR', err);
    }
    return `This action returns all services`;
  }
  async getTotalServices() {
    return await this.prisma.service.count();
  }

  async findOne(slug: string) {
    return await this.prisma.service.findUnique({
      where: {
        slug,
      },
    });
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const { imageUrl, seo, ...data } = updateServiceDto;

    try {
      const existProject = await this.prisma.service.findUnique({
        where: { id },
        select: {
          imageUrl: true,
        },
      });
      const isImagesUpdated =
        imageUrl &&
        JSON.stringify(imageUrl) !== JSON.stringify(existProject?.imageUrl);
      if (isImagesUpdated) {
        await this.uploadService.deleteImagesFromS3(
          existProject?.imageUrl ?? '',
        );
      }

      return await this.prisma.service.update({
        where: {
          id,
          storeId: data.storeId,
        },
        data: {
          ...data,
          ...(seo !== undefined && {
            seo: seo as any, // Cast to 'any' or 'Prisma.InputJsonValue'
          }),
          imageUrl: imageUrl,
        },
      });
    } catch (err) {
      console.log('ERR', err);
    }
  }

  async remove(id: number) {
    const existProject = await this.prisma.service.findUnique({
      where: { id },
      select: {
        imageUrl: true,
      },
    });
    if (existProject?.imageUrl) {
      await this.uploadService.deleteImagesFromS3(existProject.imageUrl);
    }
    return await this.prisma.service.delete({
      where: { id },
    });
  }
}
