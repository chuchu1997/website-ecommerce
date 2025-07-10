import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectQueryFilterDto } from './dto/query-project.dto';
import { SkipThrottle } from '@nestjs/throttler';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
@SkipThrottle()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return {
      message: ' Đã tạo dự án thành công   ✅',
      project: await this.projectsService.create(createProjectDto),
    };
  }

  @Public()
  @Get()
  async findAll(@Query() query: ProjectQueryFilterDto) {
    return {
      message: ' Đã tìm thấy các dự án    ✅',
      projects: await this.projectsService.findAll(query),
      total: await this.projectsService.getTotalProjects(),
    };
  }
  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'Đã tìm thấy dự án qua ID ',
      project: await this.projectsService.findOne(id),
    };
  }
  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return {
      message: ' Đã cập nhật dự án thành công   ✅',
      project: await this.projectsService.update(id, updateProjectDto),
    };
  }
  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      message: ' Đã xóa dự án thành công   ✅',
      project: await this.projectsService.remove(id),
    };
  }
}
