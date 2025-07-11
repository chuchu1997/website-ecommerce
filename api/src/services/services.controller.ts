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
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { SkipThrottle } from '@nestjs/throttler';
import { Public } from 'src/auth/decorators/public.decorator';
import { ServiceQueryFilterDto } from './dto/query.service.dto';
@SkipThrottle()
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @HttpCode(200)
  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    return {
      message: ' Đã tạo dịch vụ thành công   ✅',
      service: await this.servicesService.create(createServiceDto),
    };
  }
  @Public()
  @Get()
  async findAll(@Query() query: ServiceQueryFilterDto) {
    return {
      message: ' Đã tìm thấy các dịch vụ ✅',
      services: await this.servicesService.findAll(query),
      total: await this.servicesService.getTotalServices(),
    };
  }
  @Public()
  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return {
      message: 'Đã tìm thấy dịch vụ qua ID ',
      service: await this.servicesService.findOne(slug),
    };
  }
  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return {
      message: ' Đã cập nhật dịch vụ thành công  ✅',
      service: await this.servicesService.update(id, updateServiceDto),
    };
  }
  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      message: ' Đã xóa dịch vụ thành công   ✅',
      service: await this.servicesService.remove(id),
    };
  }
}
