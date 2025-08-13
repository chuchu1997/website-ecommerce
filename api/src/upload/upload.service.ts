import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';
import { SkipThrottle } from '@nestjs/throttler';
import { NodeHttpHandler } from '@smithy/node-http-handler';
import { PassThrough, Readable } from 'stream';

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
      requestHandler: new NodeHttpHandler({ requestTimeout: 30000 }), // 30s
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
    const bucketName = process.env.AWS_S3_BUCKET_NAME;

    console.log('🔄 Bucket name:', bucketName);

    // Process all images in parallel instead of sequentially
    const uploadPromises = buffers.map(async (buffer, i) => {
      try {
        console.log(
          `\n📂 [${i + 1}/${buffers.length}] Đang xử lý file: ${originalFilenames[i]}`,
        );
        console.log(`   ➤ MIME type: ${mimetypes[i]}`);
        console.log(`   ➤ Kích thước buffer: ${buffer.length} bytes`);

        console.log('🔄 Bắt đầu chuyển đổi sang WebP...');

        // Optimize Sharp processing
        const sharpBuffer = await sharp(buffer, {
          // Limit memory usage
          limitInputPixels: 268402689, // ~16k x 16k pixels max
          sequentialRead: true,
        })
          .webp({
            quality: 80,
            effort: 4, // Reduce effort for faster processing (default is 4, max is 6)
            nearLossless: false,
            smartSubsample: true,
          })
          .toBuffer();

        console.log('✅ Đã chuyển đổi sang WebP thành công.');

        const fileKey = `${this.folderS3}/${uuidv4()}.webp`;
        console.log('☁️ Bắt đầu upload lên S3...');

        const command = new PutObjectCommand({
          Bucket: bucketName,
          Key: fileKey,
          Body: sharpBuffer,
          ContentType: 'image/webp',
          // Add performance optimizations
          ServerSideEncryption: 'AES256', // Optional: enable server-side encryption
          StorageClass: 'STANDARD_IA', // Optional: use cheaper storage class if appropriate
        });

        await this.s3.send(command);
        console.log('✅ Upload thành công lên S3.');

        const imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
        return { success: true, url: imageUrl, index: i };
      } catch (error) {
        console.error(
          `❌ Upload thất bại ở file ${originalFilenames[i]}`,
          error,
        );
        return {
          success: false,
          error,
          index: i,
          filename: originalFilenames[i],
        };
      }
    });

    // Wait for all uploads to complete
    const results = await Promise.allSettled(uploadPromises);

    // Process results with proper type handling
    const successfulUploads: string[] = [];
    const failedUploads: Array<{
      index: number;
      error: any;
      filename: string;
    }> = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        if (result.value.success) {
          successfulUploads.push(result.value.url ?? '');
        } else {
          failedUploads.push({
            index: result.value.index,
            error: result.value.error,
            filename: originalFilenames[result.value.index],
          });
        }
      } else {
        // Handle rejected promise
        failedUploads.push({
          index,
          error: result.reason,
          filename: originalFilenames[index],
        });
      }
    });

    // Log results summary
    console.log(
      `✅ Thành công: ${successfulUploads.length}/${buffers.length} files`,
    );
    if (failedUploads.length > 0) {
      console.log(
        `❌ Thất bại: ${failedUploads.length} files:`,
        failedUploads.map((f) => f.filename).join(', '),
      );
    }

    if (successfulUploads.length === 0) {
      throw new BadRequestException(
        '⚠️ Không có tệp nào được tải lên thành công ⚠️',
      );
    }

    return successfulUploads;
  }

  // Alternative version with concurrency limit to prevent overwhelming resources
  async uploadToS3WithConcurrencyLimit({
    buffers,
    mimetypes,
    originalFilenames,
    concurrencyLimit = 3, // Process max 3 images simultaneously
  }: {
    buffers: Buffer[];
    mimetypes: string[];
    originalFilenames: string[];
    concurrencyLimit?: number;
  }) {
    const imageUrls: string[] = [];
    const bucketName = process.env.AWS_S3_BUCKET_NAME;

    console.log('🔄 Bucket name:', bucketName);

    // Define return type for processImage function
    type ProcessResult =
      | { success: true; url: string }
      | { success: false; error: any };

    // Helper function to process a single image
    const processImage = async (
      buffer: Buffer,
      index: number,
    ): Promise<ProcessResult> => {
      try {
        console.log(
          `\n📂 [${index + 1}/${buffers.length}] Đang xử lý file: ${originalFilenames[index]}`,
        );

        // Optimize Sharp with streaming for large images
        const sharpBuffer = await sharp(buffer, {
          limitInputPixels: 268402689,
          sequentialRead: true,
        })
          .webp({
            quality: 80,
            effort: 3, // Slightly faster processing
          })
          .toBuffer();

        const fileKey = `${this.folderS3}/${uuidv4()}.webp`;

        const command = new PutObjectCommand({
          Bucket: bucketName,
          Key: fileKey,
          Body: sharpBuffer,
          ContentType: 'image/webp',
        });

        await this.s3.send(command);

        const imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
        return { success: true, url: imageUrl };
      } catch (error) {
        console.error(
          `❌ Upload thất bại ở file ${originalFilenames[index]}`,
          error,
        );
        return { success: false, error };
      }
    };

    // Process images with concurrency limit
    const results: PromiseSettledResult<ProcessResult>[] = [];
    for (let i = 0; i < buffers.length; i += concurrencyLimit) {
      const batch = buffers.slice(i, i + concurrencyLimit);
      const batchPromises = batch.map((buffer, batchIndex) =>
        processImage(buffer, i + batchIndex),
      );

      const batchResults = await Promise.allSettled(batchPromises);
      results.push(...batchResults);
    }

    // Collect successful uploads with proper type checking
    results.forEach((result) => {
      if (result.status === 'fulfilled' && result.value.success) {
        imageUrls.push(result.value.url);
      }
    });

    if (imageUrls.length === 0) {
      throw new BadRequestException(
        '⚠️ Không có tệp nào được tải lên thành công ⚠️',
      );
    }

    return imageUrls;
  }

  // Alternative version with concurrency limit to prevent overwhelming resources

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
