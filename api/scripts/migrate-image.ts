import { ImageMediaType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrateImageMedia() {
  // ✅ Step 1: Migrate Product.images
  console.log('🚀 Bắt đầu migrate hình ảnh vào bảng Image...');

  const productImages = await prisma.imageMedia.findMany({
    where: { productId: { not: null } },
    include: { product: true },
  });

  for (const media of productImages) {
    if (!media.type || !media.createdAt || !media.updatedAt) {
      await prisma.imageMedia.update({
        where: { id: media.id },
        data: {
          type: 'PRODUCT',
          createdAt: media.createdAt ?? media.product?.createdAt ?? new Date(),
          updatedAt: media.updatedAt ?? media.product?.updatedAt ?? new Date(),
        },
      });
      console.log(
        `✅ Updated ImageMedia ${media.id} (Product ${media.productId})`,
      );
    }
  }

  // ✅ Step 2: Migrate from legacy imageUrl fields
  const tables = [
    {
      name: 'banner',
      key: 'imageUrl',
      type: ImageMediaType.BANNER,
      fk: 'bannerId',
    },
    {
      name: 'category',
      key: 'imageUrl',
      type: ImageMediaType.CATEGORY,
      fk: 'categoryId',
    },
    {
      name: 'brand',
      key: 'imageUrl',
      type: ImageMediaType.BRAND,
      fk: 'brandId',
    },
    { name: 'news', key: 'imageUrl', type: ImageMediaType.NEWS, fk: 'newsId' },
    {
      name: 'service',
      key: 'imageUrl',
      type: ImageMediaType.SERVICE,
      fk: 'serviceId',
    },
    {
      name: 'project',
      key: 'imageUrl',
      type: ImageMediaType.PROJECT,
      fk: 'projectId',
    },
  ];

  const modelMap = {
    banner: prisma.banner,
    category: prisma.category,
    brand: prisma.brand,
    news: prisma.news,
    service: prisma.service,
    project: prisma.project,
  } as any;

  for (const table of tables) {
    const model = modelMap[table.name as keyof typeof modelMap];

    // ✅ Fixed: Get all records first, then filter in JavaScript
    const allRecords = await model.findMany();
    const records = allRecords.filter(
      (record: any) => record.imageUrl && record.imageUrl.trim() !== '',
    );

    console.log(
      `📋 Found ${records.length} records in ${table.name} table with imageUrl`,
    );

    for (const record of records) {
      // ✅ Check if ImageMedia already exists to avoid duplicates
      const existingMedia = await prisma.imageMedia.findFirst({
        where: {
          [table.fk]: record.id,
          type: table.type,
        },
      });

      if (!existingMedia) {
        await prisma.imageMedia.create({
          data: {
            url: record.imageUrl,
            type: table.type,
            [table.fk]: record.id,
            createdAt: record.createdAt || new Date(),
            updatedAt: record.updatedAt || new Date(),
          },
        });
        console.log(`✅ Created ImageMedia for ${table.name} ID: ${record.id}`);
      } else {
        console.log(
          `⏭️ Skipped ${table.name} ID: ${record.id} (ImageMedia already exists)`,
        );
      }
    }
  }

  console.log('🎉 Migration completed.');
}

migrateImageMedia()
  .catch((e) => {
    console.error('❌ Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
