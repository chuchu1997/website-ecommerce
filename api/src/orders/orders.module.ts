import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma.service';
import { DiscordService } from 'src/utils/discord.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, DiscordService],
})
export class OrdersModule {}
