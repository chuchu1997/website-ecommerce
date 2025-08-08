import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UploadService } from 'src/upload/upload.service';
import { PrismaService } from 'src/prisma.service';
import { ProjectQueryFilterDto } from './dto/query-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}
  async create(createProjectDto: CreateProjectDto) {
    try {
      const { seo, ...data } = createProjectDto;

      return await this.prisma.project.create({
        data: {
          ...(seo !== undefined && {
            seo: seo as any, // Cast to 'any' or 'Prisma.InputJsonValue'
          }),
          ...data,
          image: {
            create: {
              url: data.imageUrl,
            },
          },
        },
      });
    } catch (err) {
      console.log('ERR', err);
    }
  }

  async findAll(query: ProjectQueryFilterDto) {
    const { limit = 9999, currentPage = 1, ...data } = query;

    try {
      return await this.prisma.project.findMany({
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
  }
  async getTotalProjects() {
    return await this.prisma.project.count();
  }
  async findOne(slug: string) {
    return await this.prisma.project.findUnique({
      where: {
        slug: slug,
      },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const { imageUrl, seo, ...data } = updateProjectDto;

    try {
      const existProject = await this.prisma.project.findUnique({
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

      return await this.prisma.project.update({
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
          image: {
            update: {
              url: imageUrl,
            },
          },
        },
      });
    } catch (err) {
      console.log('ERR', err);
    }
  }

  async remove(id: number) {
    const existProject = await this.prisma.project.findUnique({
      where: { id },
      select: {
        imageUrl: true,
        image: true,
      },
    });
    if (existProject?.imageUrl) {
      await this.uploadService.deleteImagesFromS3(existProject.imageUrl);
      await this.prisma.imageMedia.delete({
        where: {
          id: existProject.image?.id,
        },
      });
    }
    return await this.prisma.project.delete({
      where: { id },
    });
  }
}
