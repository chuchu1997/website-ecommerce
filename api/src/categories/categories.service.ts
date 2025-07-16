import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';
import { CategoryQueryFilterDto } from './dto/category-query-filter.dto';
import { ProductsService } from 'src/products/products.service';
import { UploadService } from 'src/upload/upload.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { seo, position, ...data } = createCategoryDto;
    try {
      const existingCategory = await this.prisma.category.findUnique({
        where: { slug: data.slug },
      });
      if (existingCategory) {
        throw new BadRequestException(
          '⚠️⚠️⚠️ Slug Category này đã tồn tại ⚠️⚠️⚠️',
        );
      }

      const isParentCategory =
        data.parentId === null || data.parentId === undefined;

      const transactionOps: Prisma.PrismaPromise<any>[] = [];

      if (isParentCategory) {
        transactionOps.push(
          this.prisma.category.updateMany({
            where: {
              position: {
                gte: position,
              },
              storeId: data.storeId,
              parentId: null, // ❗ chỉ áp dụng cho category cha
            },
            data: {
              position: {
                increment: 1,
              },
            },
          }),
        );
      }

      // ✅ Luôn thêm tạo mới category vào transaction
      transactionOps.push(
        this.prisma.category.create({
          data: {
            ...data,
            position,
            ...(seo !== undefined && { seo: seo as any }),
          },
        }),
      );

      // Chạy transaction
      const [, newCategory] = await this.prisma.$transaction(transactionOps);

      return newCategory;
    } catch (err) {
      console.log('ERROR', err);
    }

    // Kiểm tra xem slug đã tồn tại hay chưa
  }

  async findAll(query: CategoryQueryFilterDto) {
    //Chỉ lấy ra các categories cha !!!

    const {
      justGetParent = false,
      storeID,
      currentPage = 1,
      limit = 9999,
    } = query;

    const categories = await this.prisma.category.findMany({
      where: {
        storeId: storeID,
        parentId: justGetParent ? null : undefined,
        // parentId: justGetParent === 'true' ? null : undefined, // Lấy các category có parentId là null (các category cha)
      },
      include: {
        subCategories: true, // Lấy cấp con đầu tiên
      },
      orderBy: {
        position: 'asc',
      },
      skip: (currentPage - 1) * limit,
      take: limit,
      // orderBy: {
      //   createdAt: 'desc', // Sắp xếp theo thời gian tạo (có thể tùy chỉnh)
      // },
    });
    // Đệ quy lấy các cấp con của từng category
    for (const category of categories) {
      category.subCategories = await this.getNestedCategories(category.id);
    }

    return categories;
  }
  async getNestedCategories(parentId: number | null): Promise<any[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        parentId: parentId, // Lấy các category có parentId bằng tham số truyền vào
      },
      include: {
        subCategories: true, // Lấy cấp con đầu tiên
      },
      orderBy: {
        createdAt: 'asc', // Sắp xếp theo thời gian tạo (có thể tùy chỉnh)
      },
    });

    // Đệ quy lấy các cấp con của từng category
    for (const category of categories) {
      category.subCategories = await this.getNestedCategories(category.id);
    }

    return categories;
  }

  async findOne(slug: string, query: CategoryQueryFilterDto) {
    const { storeID, currentPage = 1, limit = 8 } = query;
    // First get the main category

    const mainCategory = await this.prisma.category.findUnique({
      where: {
        slug,
        storeId: storeID,
      },
    });

    if (!mainCategory) return null;
    // Recursive function to get all descendant category IDs
    const getAllDescendantCategoryIds = async (categoryId) => {
      const categoryIds = [categoryId];

      // Get direct subcategories
      const subCategories = await this.prisma.category.findMany({
        where: {
          parentId: categoryId,
          storeId: storeID,
        },
        select: { id: true },
      });

      // Recursively get subcategories of each subcategory
      for (const subCategory of subCategories) {
        const descendantIds = await getAllDescendantCategoryIds(subCategory.id);
        categoryIds.push(...descendantIds);
      }

      return categoryIds;
    };

    // Get all category IDs (main + all descendants)
    const allCategoryIds = await getAllDescendantCategoryIds(mainCategory.id);
    const totalCount = await this.prisma.product.count({
      where: {
        categoryId: {
          in: allCategoryIds,
        },
        storeId: storeID, // ✅
      },
    });

    // Get all products from all these categories
    const allProducts = await this.prisma.product.findMany({
      where: {
        categoryId: {
          in: allCategoryIds,
        },
        storeId: storeID, // ✅
      },
      include: {
        promotionProducts: {
          include: {
            promotion: true,
          },
        },
        giftProducts: {
          include: {
            gift: {
              include: {
                images: true,
              },
            },
          },
        },
        images: true,
        sizes: true,
        colors: true,
      },
      skip: (currentPage - 1) * limit,
      take: limit,
    });

    return {
      ...mainCategory,
      products: allProducts,
      totalProducts: totalCount,
    };
  }
  convertCategoryIdToNumber(categoryID: string): number {
    return parseInt(categoryID, 10);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const { seo, position, ...data } = updateCategoryDto;

    // Kiểm tra slug trùng
    const existingSlug = await this.prisma.category.findUnique({
      where: { slug: data.slug },
    });

    if (existingSlug && existingSlug.id !== id) {
      throw new BadRequestException('⚠️⚠️⚠️ Slug đã tồn tại ⚠️⚠️⚠️');
    }

    // Lấy thông tin category hiện tại
    const existCategory = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!existCategory) {
      throw new BadRequestException(`⚠️ Danh mục với ID:${id} không tồn tại`);
    }

    const isParentCategory = (data.parentId ?? existCategory.parentId) === null;

    // Nếu có thay đổi position & là category cha thì cập nhật lại position các category khác
    if (
      position !== undefined &&
      existCategory.position !== null &&
      position !== existCategory.position &&
      isParentCategory
    ) {
      if (position < existCategory.position) {
        // Đẩy lên trên: tăng position của các category nằm giữa [position, currentPosition)
        await this.prisma.category.updateMany({
          where: {
            position: {
              gte: position,
              lt: existCategory.position,
            },
            storeId: data.storeId ?? existCategory.storeId,
            parentId: null, // chỉ áp dụng cho category cha
          },
          data: {
            position: { increment: 1 },
          },
        });
      } else {
        // Đẩy xuống dưới: giảm position của các category nằm giữa (currentPosition, position]
        await this.prisma.category.updateMany({
          where: {
            position: {
              gt: existCategory.position,
              lte: position,
            },
            storeId: data.storeId ?? existCategory.storeId,
            parentId: null,
          },
          data: {
            position: { decrement: 1 },
          },
        });
      }
    }

    // Cập nhật category
    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: {
        ...(seo !== undefined && {
          seo: seo as any,
        }),
        ...data,
        parentId: data.parentId ?? null,
        position: position ?? existCategory.position,
      },
    });

    return updatedCategory;
  }

  async remove(id: number, storeID: number) {
    // Lấy thông tin category trước khi xoá
    const existCategory = await this.prisma.category.findUnique({
      where: { id },
      select: {
        position: true,
        parentId: true,
        storeId: true,
      },
    });

    if (!existCategory) {
      throw new BadRequestException(`❌ Danh mục với ID:${id} không tồn tại`);
    }

    // Xoá category
    await this.prisma.category.delete({
      where: {
        id,
        storeId: storeID,
      },
    });

    // Chỉ cập nhật lại position nếu là category cha
    if (existCategory.parentId === null && existCategory.position !== null) {
      await this.prisma.category.updateMany({
        where: {
          position: {
            gt: existCategory.position,
          },
          storeId: storeID,
          parentId: null, // chỉ cập nhật với các danh mục cha
        },
        data: {
          position: {
            decrement: 1,
          },
        },
      });
    }

    return {
      message: '✅ Xoá danh mục thành công và cập nhật lại position',
    };
  }
}
