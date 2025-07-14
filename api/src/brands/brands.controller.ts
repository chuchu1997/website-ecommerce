import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { Public } from 'src/auth/decorators/public.decorator';
import { SkipThrottle } from '@nestjs/throttler';
import { FilterBrandDto } from './dto/filter-dto';

@SkipThrottle()
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createBrandDto: CreateBrandDto) {
    return {
      message: 'Tạo Brand thành công ✅',
      brand: await this.brandsService.create(createBrandDto),
    };
  }

  @Public()
  @Get()
  async findAll(@Query() query: FilterBrandDto) {
    const brands = await this.brandsService.findAll(query);
    return {
      message: ' Lấy tất cả Brands thành công ✅',
      brands,
    };
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      message: ' Lấy Brand qua ID thành công ✅',
      brand: await this.brandsService.findOne(id),
    };
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return {
      message: 'Đã cập nhật Brand thành công !! ✅',
      brand: await this.brandsService.update(id, updateBrandDto),
    };
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.brandsService.remove(id);
    return {
      message: ' Đã xóa Brand Thành công !! ✅',
    };
  }
}
