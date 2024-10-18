import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Platform } from './entities/platform.entity';
import { PlatformsController } from './platforms.controller';
import { PlatformsService } from './platforms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Platform])],
  controllers: [PlatformsController],
  providers: [PlatformsService],
  exports: [PlatformsService],
})
export class PlatformsModule {}
