import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { UploadService } from 'src/upload/upload.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, UploadService, PrismaService],
})
export class ProjectsModule {}
