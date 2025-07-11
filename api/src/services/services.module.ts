import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { UploadService } from 'src/upload/upload.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, UploadService, PrismaService],
})
export class ServicesModule {}
