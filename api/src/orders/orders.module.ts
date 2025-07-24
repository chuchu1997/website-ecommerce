import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma.service';
import { DiscordService } from 'src/utils/discord.service';
import { ZaloOAService } from 'src/utils/zaloOA.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, DiscordService, ZaloOAService],
})
export class OrdersModule {}
