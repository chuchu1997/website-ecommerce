import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';
import { SkipThrottle } from '@nestjs/throttler';

@Injectable()
export class UploadService {
  private s3: S3Client;
  private bucketName: string;
  private folderS3: string;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    this.bucketName = process.env.AWS_BUCKET_NAME!;
    this.folderS3 = process.env.AWS_S3_FOLDER_SAVE!;
  }
  async uploadToS3({
    buffers,
    mimetypes,
    originalFilenames,
  }: {
    buffers: Buffer[];
    mimetypes: string[];
    originalFilenames: string[];
  }) {
    const imageUrls: string[] = [];

    for (let i = 0; i < buffers.length; i++) {
      try {
        // 👇 Convert ảnh sang .webp
        const webpBuffer = await sharp(buffers[i])
          .webp({ quality: 100 }) // bạn có thể điều chỉnh quality tại đây
          .toBuffer();

        // 👇 Random file name không dính original name
        const fileKey = `${this.folderS3}/${uuidv4()}.webp`;

        const command = new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: fileKey,
          Body: webpBuffer,
          ContentType: 'image/webp',
        });

        await this.s3.send(command);

        const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
        imageUrls.push(imageUrl);
      } catch (error) {
        console.error(
          `❌ Upload thất bại ở file ${originalFilenames[i]}`,
          error,
        );
        // Optional: tiếp tục hoặc dừng tuỳ bạn
      }
    }

    if (imageUrls.length === 0) {
      throw new BadRequestException(
        '⚠️ Không có tệp nào được tải lên thành công ⚠️',
      );
    }

    return imageUrls;
  }

  async deleteImagesFromS3(imageUrl: string) {
    try {
      const match = imageUrl.match(
        `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/(.*)`,
      );
      if (!match || !match[1]) {
        throw new BadRequestException(
          '⚠️⚠️⚠️ Không thể tách fileKey từ URL ⚠️⚠️⚠️',
        );
      }
      const fileKey = match[1];
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: fileKey,
      });
      console.log('GOI DELETE HINH ANH TREN S3 !!!');
      return await this.s3.send(command);
    } catch (err) {
      throw new BadRequestException(
        '⚠️⚠️⚠️ Không thể xóa hình ảnh từ S3 ⚠️⚠️⚠️',
      );
    }
  }
}
