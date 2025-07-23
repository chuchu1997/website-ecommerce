import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { Role, StoreUserRole } from '@prisma/client';
import { CreateSellerWithStoreDto } from './dto/create-seller.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StoresService {
  constructor(
    private uploadService: UploadService,
    private userService: UsersService,
    private prisma: PrismaService,
  ) {}

  async create(createStoreDto: CreateStoreDto) {
    const { userID, name, socials } = createStoreDto;

    return await this.prisma.store.create({
      data: {
        storeUsers: {
          create: {
            userId: userID,
            role: StoreUserRole.OWNER,
          },
        },
        name: name,
        socials:
          socials && socials.length > 0
            ? {
                createMany: {
                  data: socials.map((social) => ({
                    type: social.type,
                    url: social.url,
                  })),
                },
              }
            : undefined,
      },
    });
  }

  async createSellerWithStore(dto: CreateSellerWithStoreDto) {
    const { email, name, password, storeId } = dto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: Role.SELLER,
        storeUsers: {
          create: {
            storeId,
            role: 'STAFF', //
          },
        },
      },
    });

    return user;
  }

  findAll() {
    return `This action returns all stores`;
  }

  async findAllStoresWithUserID(userID: number) {
    return await this.prisma.store.findMany({
      where: {
        storeUsers: {
          some: {
            userId: userID,
          },
        },
      },
      include: {
        socials: true,
      },
    });
  }

  async findOne(id: number) {
    let store = await this.prisma.store.findUnique({
      where: {
        id,
      },
      include: {
        socials: true,
      },
    });

    return store;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    // Exclude userID from dataUpdate to avoid Prisma type errors
    const { logo, favicon, socials, userID, ...dataUpdate } = updateStoreDto;
    const storeUser = await this.prisma.storeUser.findFirst({
      where: {
        userId: userID,
        storeId: id,
      },
    });

    if (!storeUser || storeUser.role !== StoreUserRole.OWNER) {
      throw new ForbiddenException('Bạn không có quyền chỉnh sửa store này');
    }
    const existStore = await this.prisma.store.findUnique({
      where: {
        id,
      },
      select: {
        socials: true,
        logo: true,
        favicon: true,
      },
    });
    if (!existStore) {
      throw new NotFoundException(
        `⚠️⚠️⚠️Store với ID ${id} không tồn tại thao tác ⚠️⚠️⚠️ `,
      );
    }
    const isLogoUpdate = logo && logo !== existStore.logo;
    const isFavUpdate = favicon && favicon != existStore.favicon;

    if (isLogoUpdate && existStore.logo) {
      await this.uploadService.deleteImagesFromS3(existStore.logo);
    }
    if (isFavUpdate && existStore.favicon) {
      await this.uploadService.deleteImagesFromS3(existStore.favicon);
    }
    // const isSocialsUpdate =
    //   socials &&
    //   JSON.stringify(socials) !== JSON.stringify(existStore?.socials);

    return await this.prisma.store.update({
      where: {
        id,
      },
      data: {
        ...dataUpdate,
        ...(socials !== undefined && {
          socials: {
            deleteMany: {},
            createMany: {
              data: socials.map((social) => ({
                type: social.type,
                url: social.url,
              })),
            },
          },
        }),

        logo: logo,
        favicon: favicon,
        name: dataUpdate.name ?? '',

        description: dataUpdate.description ?? '',
        ...(dataUpdate.tags !== undefined && {
          tags: dataUpdate.tags as any, // Cast to 'any' or 'Prisma.InputJsonValue'
        }),
        ...(dataUpdate.seo !== undefined && {
          seo: dataUpdate.seo as any, // Cast to 'any' or 'Prisma.InputJsonValue'
        }),
      },
    });
  }

  async remove(id: number) {
    const existStore = await this.prisma.store.findUnique({
      where: {
        id,
      },
      select: {
        socials: true,
        logo: true,
        favicon: true,
      },
    });
    if (!existStore) {
      throw new NotFoundException(
        `⚠️⚠️⚠️Store với ID ${id} không tồn tại thao tác ⚠️⚠️⚠️ `,
      );
    }

    if (existStore.logo) {
      await this.uploadService.deleteImagesFromS3(existStore.logo);
    }
    if (existStore.favicon) {
      await this.uploadService.deleteImagesFromS3(existStore.favicon);
    }

    await this.prisma.store.update({
      where: { id },
      data: {
        socials: {
          deleteMany: {},
        },
      },
    });
    return await this.prisma.store.delete({
      where: { id },
    });
  }
}
