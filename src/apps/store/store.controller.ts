import { Body, Controller, Post } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  async save(@Body() body) {
    return await this.storeService.save(body);
  }
}
