import { Platform } from '../entities/platform.entity';

export class ReturnPlatformDto {
  id: number;
  name: string;

  constructor(platform: Platform) {
    this.id = platform.id;
    this.name = platform.name;
  }
}
