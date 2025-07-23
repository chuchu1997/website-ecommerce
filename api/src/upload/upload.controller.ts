import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { v4 as uuidv4 } from 'uuid';
import { SkipThrottle } from '@nestjs/throttler';
@SkipThrottle()
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('')
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
    }),
  )
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    console.log('UPLOAD TO S3 CALLED !!!');
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }
    try {
      const buffers = files.map((file) => file.buffer);
      const mimetypes = files.map((file) => file.mimetype);
      const originalFilenames = files.map((file) => file.originalname);
      const images = await this.uploadService.uploadToS3({
        buffers,
        mimetypes,
        originalFilenames,
      });

      return { message: 'Đã tải hình lên thành công !!', imageUrls: images };
    } catch (error) {
      throw new BadRequestException(`Upload failed: ${error.message}`);
    }
  }
  @Delete('')
  @Roles(Role.ADMIN)
  async deleteFiles(@Query() query: { imageUrl: string }) {
    await this.uploadService.deleteImagesFromS3(query.imageUrl);
    return {
      message: `✅✅ Hình ảnh đã được xóa thành công !!  ✅✅`,
    };
  }
}
