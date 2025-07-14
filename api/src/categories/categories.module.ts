import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/prisma.service';
import { UploadService } from 'src/upload/upload.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService, UploadService],
})
export class CategoriesModule {}
